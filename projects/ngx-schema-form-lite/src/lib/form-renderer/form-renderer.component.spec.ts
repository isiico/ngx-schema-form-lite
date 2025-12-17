import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRendererComponent } from './form-renderer.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { WidgetRegistryService } from '../registry/widget-registry.service'; // 确保路径正确

// --- 准备工作：定义假数据和假组件 ---

// 1. 定义一个用于测试的假组件
@Component({
  selector: 'mock-input',
  template: '<p>我是动态组件</p>',
  standalone: true,
})
class MockInputComponent {}

const MOCK_SCHEMA = {
  properties: {
    email: {
      type: 'string',
      widget: 'input',
      title: '邮箱地址',
    },
  },
};

describe('FormRendererComponent', () => {
  let component: FormRendererComponent;
  let fixture: ComponentFixture<FormRendererComponent>;
  let registry: WidgetRegistryService; // 新增：我们需要引用服务

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 独立组件放 imports
      imports: [FormRendererComponent, MockInputComponent],
      // 新增：为了测试动态加载，我们需要注入注册表服务
      providers: [WidgetRegistryService],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRendererComponent);
    component = fixture.componentInstance;

    // 获取服务实例，方便我们在测试用例里注册组件
    registry = TestBed.inject(WidgetRegistryService);
  });

  it('应该能接收 schema 输入并渲染对应的 DOM 结构', () => {
    fixture.componentRef.setInput('schema', MOCK_SCHEMA);
    fixture.detectChanges();
    const inputContainer = fixture.debugElement.query(
      By.css('[data-path="email"]')
    );
    expect(inputContainer)
      .withContext('无法找到 path 为 email 的表单项，渲染失败')
      .toBeTruthy();
  });

  it('应该根据 ui.span 配置应用 Grid 布局样式', () => {
    const GRID_SCHEMA = {
      properties: {
        firstName: { type: 'string', ui: { span: 6 }, title: '名' },
        lastName: { type: 'string', title: '姓' }, // 默认 12
      },
    };
    fixture.componentRef.setInput('schema', GRID_SCHEMA);
    fixture.detectChanges();

    const firstNameEl = fixture.debugElement.query(
      By.css('[data-path="firstName"]')
    );
    const lastNameEl = fixture.debugElement.query(
      By.css('[data-path="lastName"]')
    );

    expect(firstNameEl.nativeElement.style.gridColumn).toContain('span 6');
    expect(lastNameEl.nativeElement.style.gridColumn).toContain('span 12');
  });

  it('应该根据 widget 字段动态渲染对应的组件', async () => {
    // 1. 注册
    registry.register('test-widget', MockInputComponent);

    // 2. 准备数据
    const DYNAMIC_SCHEMA = {
      properties: {
        dynamicField: {
          type: 'string',
          widget: 'test-widget',
          title: '动态测试'
        }
      }
    };

    // 3. 触发渲染
    fixture.componentRef.setInput('schema', DYNAMIC_SCHEMA);
    fixture.detectChanges(); 
    
    // 等待动态组件加载完成
    await fixture.whenStable();
    fixture.detectChanges();

    // 4. 断言
    // 直接查找 <mock-input> 标签，这是最稳的
    const dynamicComponent = fixture.debugElement.query(By.css('mock-input'));
    
    expect(dynamicComponent)
      .withContext('渲染器未能根据配置生成动态组件')
      .toBeTruthy();
      
    // 验证内容
    expect(dynamicComponent.nativeElement.textContent).toContain('我是动态组件');
  });
});
