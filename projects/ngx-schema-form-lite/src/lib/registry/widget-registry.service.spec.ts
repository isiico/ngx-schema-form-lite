import { TestBed } from '@angular/core/testing';
import { WidgetRegistryService } from './widget-registry.service';
import { Component } from '@angular/core';

// 1. 定义一个假的组件类用于测试
@Component({ template: '' })
class MockInputComponent {}

describe('WidgetRegistryService', () => {
  let service: WidgetRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetRegistryService);
  });

  it('应该能注册并检索组件', () => {
    // 动作：注册
    // 期望有一个 register 方法
    // 参数1: key (json里的 widget 名字)
    // 参数2: component class
    service.register('input', MockInputComponent);

    // 动作：检索
    // 期望有一个 getWidget 方法
    const retrieved = service.getWidget('input');

    // 断言：拿出来的就是我们存进去的
    expect(retrieved).toBe(MockInputComponent);
  });

  it('当请求未注册的组件时应该抛出错误', () => {
    // 断言：获取不存在的 key 时报错，提醒开发者
    expect(() => {
      service.getWidget('unknown-widget');
    }).toThrowError(/not found/i); 
  });
});