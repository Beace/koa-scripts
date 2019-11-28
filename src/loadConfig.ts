import path from 'path';
import loader from './loader';
import { Config } from './interfaces/App';
import log from './log';

function loadConfig() {
  const configPath = path.resolve('src/config');
  const configs = loader(configPath);
  return mergeConfig(configs)
}


function mergeConfig(configs: Config[]) {
  log.info("开始读取配置文件...")
  const NODE_ENV = process.env.NODE_ENV || 'production';
  log.info("NODE_ENV", NODE_ENV);
  const __DEV__ = NODE_ENV === 'development';
  let defaultConfig;
  const d = configs.find(config => config.name === 'config.default');
  if (d) {
    defaultConfig = d.module
  } else {
    log.error("找不到相应配置");
  }

  if (__DEV__) {
    return defaultConfig;
  }

  let envConfig;
  const env = configs.find(config => config.name === `config.${NODE_ENV}`)

  if (env) {
    envConfig = env.module;
  } else {
    envConfig = {};
    log.warn(`当前环境${NODE_ENV}，未找到匹配当前环境的配置文件，采用默认配置！！！`);
  }

  log.info("配置文件完成挂载")
  return {
    ...defaultConfig,
    ...envConfig,
  }
}

export default loadConfig;
