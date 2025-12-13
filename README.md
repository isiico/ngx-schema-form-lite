# NgxSchemaFormLite

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## 🤝 提交规范 (Commit Convention)

本项目严格遵守 [Angular Commit Guidelines](https://github.com/angular/angular.git/CONTRIBUTING.md#-commit-message-guidelines)。

### 格式说明
`type(scope?): subject`

* **type**: 提交类别
* **scope**: 影响范围（可选，如 `input`, `core`, `deps`）
* **subject**: 简短描述（注意：冒号后必须有一个空格）

### 常用 Type 列表

| Type | 含义 | 示例 |
| :--- | :--- | :--- |
| ✨ **feat** | 新增功能 (Feature) | `feat: 增加 Input 组件` |
| 🐛 **fix** | 修复 Bug | `fix: 解决日期选择器时区问题` |
| 🧹 **chore** | 杂项 (构建过程或辅助工具变动) | `chore: 配置 husky 和 commitlint` |
| 📚 **docs** | 文档变更 | `docs: 更新 README 使用说明` |
| 💎 **style** | 代码格式 (不影响代码运行) | `style: 删除多余空行` |
| 📦 **refactor** | 代码重构 (不修 Bug 也不加功能) | `refactor: 优化表单渲染逻辑` |
| 🚀 **perf** | 性能优化 | `perf: 优化列表滚动性能` |
| 🚨 **test** | 测试相关 | `test: 补充 Input 单元测试` |
| 🛠 **build** | 构建系统或外部依赖影响 | `build: 升级 Angular 至 v19` |
| ⏪ **revert** | 回退代码 | `revert: 撤销上一次提交` |

### 示例
```bash
git commit -m "feat(core): 完成动态组件加载逻辑"
git commit -m "fix: 修复某些情况下校验失效的问题"