import path from "path";
import loader from "./loader";
import { App } from "./interfaces/App";

function loadController() {
  const controllerPath = path.resolve('src/controller');
  return loader(controllerPath);
}

function bindControllers2KOAPrototype(koa: App) {
  const controllers = loadController();
  koa.prototype["controller"] = {};
  controllers.forEach(ctrl => {
    koa.prototype.controller[ctrl.name] = ctrl.module;
  });
}

export default bindControllers2KOAPrototype;
