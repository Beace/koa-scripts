# KOA-SCRIPTS

KOA-SCRIPTS 主要实现了启动时动态挂载 Controller，Service，Config。

## 结构

```
.
├── index.ts
├── interfaces
│   └── App.ts
├── loadConfig.ts
├── loadController.ts
├── loadRouter.ts
├── loadService.ts
└── loader.ts
```

## Feature

- 启动时检查
- 规范化路由与业务逻辑
- 灵活的配置


## 原理
将 Controller 中的业务逻辑函数动态挂载到 KOA 原型上，
将 Service 通过参数的方式传递给每个 Controller 方法，
Config 则直接在 KOA 实例中 app 挂载，
在动态加载的 Router 中将 KOA 实例化的 app 传入 Router，
此时直接调用 Controller 中的方法即可。

启动时即挂载，不会对性能有任何损耗。

## router
在 `router.js` 中定义，为了加以区分，原则上请求方法需要大写`GET POST PUT DELETE`，后面跟上 path。（ps: 小写其实也不会出错）。


### 示例
```js
module.exports = app => {
  return {
    "POST /ccapi/highlight_cut/create": app.controller.highlight.create,
    "GET /ccapi/highlight_cut/result/:tid": app.controller.highlight.getResult,
  };
};
```

## Controller
controller 即暴露出的 API，需要在 controller 目录下定义。模块对应的文件名即 router 中使用的对象作用域。例如 `controller/highlight.js`
```js
{
  "POST /ccapi/highlight_cut/create": app.controller.highlight.create,
}
```

## Service
service 是 controller 中每个处理函数的第二个参数。在 services 文件中定义的任何 services 都可以在 controller 的第二个参数中获取。
```js
async create(ctx, services, app) {
  const { metricsEvent } = app.config;
  const { metrics } = services;
  await metrics.emitCounter(xxx);
},
```

## config

### 规则
默认在 NODE_ENV=development 环境下只会使用 config.default.js 文件，除 development 环境外，可自定义其他环。

例如 `production`，需要新建 `config.production.js` 文件，并启动时指明 `NODE_ENV=production`, 服务在启动时会自动 `config.production.js` 中的配置会自动合并并覆盖 `config.default.js` 中的配置，**注意：没有去做 friendly merge，制作了第一层对象的覆盖**。

### 示例
```js
async create(ctx, services, app) {
  const { metricsEvent } = app.config;
},
```

## 缺点
函数式编程并不是一个缺点，但是在该项目中有些捉襟见肘。虽然已经制约的很好了，但是每次新增一个扩展，我都要考虑是放在 app 实例下还是放在函数的参数中。如果在参数中，就必须去不停地给 controller 中的函数增加参数，扩展性很差，所以之后考虑的话会采用面向对象的方式，直接继承 KOA，这种方式，业界也早有人实现过。具体可以参考 [Egg.js](https://github.com/eggjs/egg-core/blob/40250e0baf746f6a3a6216884848d70b2982fca9/lib/egg.js#L21) 的实现。


## TODO
- ~~全局 logger~~
- 增加 DAL
- extend koa
- 单元测试