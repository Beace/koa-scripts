import Application from "koa";

export interface App extends Application {
  [x: string]: any;
  config?: any;
  controller(name: string): any;
}

export interface ConfigDetail {
  [key: string]: any
}


export interface Module {
  [key: string]: any;
}

export interface Config {
  name: string;
  module: Module;
}

export interface Service {
  [x: string]: Module;
}

export interface Context extends Application.Context {
  log?: any
}