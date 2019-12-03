import fs from "fs";
import { Config } from "../index.d";

function loader(dirPath: string): Config[] {
  const dir = fs.readdirSync(dirPath);
  return dir.map((filename: string) => {
    const module = require(`${dirPath}/${filename}`);
    const nameWithExt = filename.split(".");
    const name = nameWithExt.slice(0, nameWithExt.length - 1).join('.');
    return { name, module };
  });
}

export default loader;
