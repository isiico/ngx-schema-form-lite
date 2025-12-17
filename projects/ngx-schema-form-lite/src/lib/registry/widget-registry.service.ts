import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetRegistryService {
  // 1. 使用 Map 来存储注册表
  // key 是字符串 (如 'input'), value 是 Angular 组件类 (Type<any>)
  private widgets = new Map<string, Type<any>>();

  constructor() { }

  // 2. 注册方法
  register(key: string, component: Type<any>): void {
    this.widgets.set(key, component);
  }

  // 3. 获取方法
  getWidget(key: string): Type<any> {
    if (this.widgets.has(key)) {
      return this.widgets.get(key)!;
    }
    
    // 4. 如果找不到，抛出错误 (满足测试要求)
    throw new Error(`Widget type '${key}' not found in registry.`);
  }
}