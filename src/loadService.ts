import path from "path";
import _ from "lodash";

import loader from "./loader";
import { Service } from "../index.d";

function getService() {
  const servicesPath = path.resolve("src/services");
  return loader(servicesPath);
}

function loadService(): Service {
  const services = getService();
  const servicesMap = {};
  services.forEach(service => {
    _.set(servicesMap, service.name, service.module);
  });
  return servicesMap;
}

export default loadService;
