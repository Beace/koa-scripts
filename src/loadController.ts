import path from "path";
import _ from "lodash";

import loader from "./loader";
import { App } from "../index.d";

function loadController() {
  const controllerPath = path.resolve('src/controller');
  return loader(controllerPath);
}

function bindControllers2KOAPrototype(koa: App) {
  const controllers = loadController();
  const controller = {};
  controllers.forEach(ctrl => _.set(controller, ctrl.name, ctrl.module));
  koa.prototype.controller = controller;
}

export default bindControllers2KOAPrototype;
