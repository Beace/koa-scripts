import path from "path";
import loader from "./loader";

function loadService() {
  const servicesPath = path.resolve("src/services");
  return loader(servicesPath);
}

export default loadService;
