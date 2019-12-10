import glob from "glob";
import { Config } from "../index.d";

function loader(dirPath: string): Config[] {
  const dir = `${dirPath}/**/*.js`;
  const modules = glob.sync(dir).map((filename: string) => {
    const module = require(filename);
    const nameWithExt = filename
      .replace(`${dirPath}/`, "")
      .replace("/", ".")
      .split(".");
    const name = nameWithExt.slice(0, nameWithExt.length - 1).join(".");
    return { name, module };
  });
  return modules;
}

export default loader;
