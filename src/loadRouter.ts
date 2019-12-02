import path from "path";
import router from "koa-router";

import loadService from "./loadService";
import loadConfig from "./loadConfig";
import log from './log';

import { App, Service, Context } from "./interfaces/App";
const KoaRouter = new router();
const services = loadService();

enum Methods {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}

const setRouters = (app: App) => {
  log.info("====================KOA-SCRIPTS-START=======================");
  const routers = require(path.resolve("src/router"))(app);
  const serviceMap: Service = {};
  log.info("开始读取 services...");
  services.forEach(service => {
    serviceMap[service.name] = service.module;
  });

  // mount config on app
  const config = loadConfig();
  app.config = config;
  app.log = log;

  log.info("开始注册路由...");
  Object.keys(routers).forEach(key => {
    const [method, path] = key.split(" ");
    const methodLowerCase = method.toLocaleLowerCase();
    KoaRouter[methodLowerCase as Methods](path, (ctx: Context) => {
      ctx.log = log;
      return routers[key](ctx, serviceMap, app)
    });
  });

  log.info("路由注册完成");
  log.info("====================KOA-SCRIPTS-END=========================");
  return KoaRouter.routes();
};

export default setRouters;
