import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRendererComponent } from './form-renderer.component';
import { By } from '@angular/platform-browser';

// 1. 定义期望的配置结构（这是 TDD 驱动出来的接口）
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 【修改点】：独立组件必须放在 imports 里，而不是 declarations
      imports: [FormRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRendererComponent);
    component = fixture.componentInstance;
  });

  it('应该能接收 schema 输入并渲染对应的 DOM 结构', () => {
    // 使用 setInput，它会自动触发 ngOnChanges 生命周期
    fixture.componentRef.setInput('schema', MOCK_SCHEMA);

    // 触发变化检测
    fixture.detectChanges();

    // 【期望 2】：渲染层应该根据 schema 生成对应的 html 结构
    // 暂时断言它会生成一个带有特定 data-path 的 div 或者 input
    // 这里也会失败，因为 HTML 还是空的
    const inputContainer = fixture.debugElement.query(
      By.css('[data-path="email"]')
    );

    expect(inputContainer)
      .withContext('无法找到 path 为 email 的表单项，渲染失败')
      .toBeTruthy();
  });

  it('应该根据 ui.span 配置应用 Grid 布局样式', () => {
    // 1. 准备带有 Grid 配置的数据
    const GRID_SCHEMA = {
      properties: {
        firstName: {
          type: 'string',
          ui: { span: 6 }, // 期望占用 6/12 列
          title: '名',
        },
        lastName: {
          type: 'string',
          // 没有配置 span，默认为 12 (整行)
          title: '姓',
        },
      },
    };

    // 2. 输入数据
    fixture.componentRef.setInput('schema', GRID_SCHEMA);
    fixture.detectChanges();

    // 3. 断言
    const firstNameEl = fixture.debugElement.query(
      By.css('[data-path="firstName"]')
    );
    const lastNameEl = fixture.debugElement.query(
      By.css('[data-path="lastName"]')
    );

    // 检查是否应用了 grid-column 样式
    // 注意：Angular 可能会把 styles 转换格式，所以我们要灵活匹配
    // 期望 firstName 是 'span 6'
    expect(firstNameEl.nativeElement.style.gridColumn).toContain('span 6');

    // 期望 lastName 是默认的 'span 12' (或者 undefined，取决于将如何实现默认值，这里先定死要求它有默认值)
    expect(lastNameEl.nativeElement.style.gridColumn).toContain('span 12');
  });
});
