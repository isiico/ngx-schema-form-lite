import { Component, computed, input } from '@angular/core'; // <--- 引入 input, computed
import { CommonModule } from '@angular/common';

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
  // Angular 19 Signal Input
  // 以前是: @Input() schema: FormSchema | null = null;
  schema = input<FormSchema | null>(null);

  // 使用 computed 自动派生数据(以前需要用 ngOnChanges 手动更新)
  // 当 schema 变化时，这个 renderItems 信号会自动更新
  renderItems = computed(() => {
    const s = this.schema();
    if (!s || !s.properties) return [];

    return Object.keys(s.properties).map((key) => {
      const prop = s.properties[key];
      return {
        key,
        value: prop,
        // 预先计算好样式字符串，模板里直接用
        // 如果没有 ui.span，默认占满 12 列
        gridSpan: `span ${prop.ui?.span || 12}`,
      };
    });
  });
}
