import path from "path";
import router from "koa-router";

import loadService from "./loadService";
import loadConfig from "./loadConfig";
import log from './log';

import { App, Context } from "../index.d";
const KoaRouter = new router();

enum Methods {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}

const setRouters = (app: App) => {
  log.info("====================KOA-SCRIPTS-START=======================");
  const routers = require(path.resolve("src/router"))(app);
  log.info("开始读取 services...");
  const serviceMap = loadService();

  // mount config on app
  const config = loadConfig();
  app.config = config;
  app.log = log;

  log.info("开始注册路由...");
  Object.keys(routers).forEach(key => {
    const [method, path] = key.split(" ");
    const methodLowerCase = method.toLocaleLowerCase();
    try {
      KoaRouter[methodLowerCase as Methods](path, (ctx: Context) => {
        ctx.log = log;
        return routers[key](ctx, serviceMap, app)
      });
    } catch (e) {
      console.log(e)
      return {}
    }
  });

  log.info("路由注册完成");
  log.info("====================KOA-SCRIPTS-END=========================");
  return KoaRouter.routes();
};

export default setRouters;
