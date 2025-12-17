import { Component, computed, input, inject, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetRegistryService } from '../registry/widget-registry.service';

export interface FormSchema {
  properties: { [key: string]: any };
}

@Component({
  selector: 'ngx-schema-form-lite-form-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-renderer.component.html',
  // 直接在这里写简单的样式，方便演示
  styles: [
    `
      :host {
        display: grid;
        grid-template-columns: repeat(12, 1fr); /* 12列栅格 */
        gap: 16px; /* 间距 */
      }
      .sf-item {
        /* 默认样式 */
      }
    `,
  ],
})
export class FormRendererComponent {
  // 1. 注入注册表服务
  private registry = inject(WidgetRegistryService);

  schema = input<FormSchema | null>(null);

  renderItems = computed(() => {
    const s = this.schema();
    if (!s || !s.properties) return [];

    return Object.keys(s.properties).map((key) => {
      const prop = s.properties[key];
      const widgetName = prop.widget || 'string'; // 简单的默认值处理

      // 2. 尝试获取组件类
      // 这里的 try-catch 是为了防止测试中某些 widget 没注册导致整个页面崩溃
      let componentClass: Type<any> | null = null;
      try {
        componentClass = this.registry.getWidget(widgetName);
      } catch (e) {
        console.warn(`Widget type "${widgetName}" not found.`);
      }

      return {
        key,
        value: prop,
        gridSpan: `span ${prop.ui?.span || 12}`,
        component: componentClass, // <--- 3. 把组件类传递给模板
      };
    });
  });
}
