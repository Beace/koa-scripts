import colors from 'colors';

enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}
class Log {
  prefix: string;
  constructor() {
    this.prefix = 'KS';
  }
  private getDateTime(): string {
    return new Date().toLocaleString("ca", {
      timeZone: "Asia/Shanghai",
      hour12: false,
    });
  }

  getFullPrefix(level: LogLevel) {
    return `[${this.prefix} ${level}] ${this.getDateTime()}:`;
  }

  info(...args: any) {
    console.info(colors.green(this.getFullPrefix(LogLevel.INFO)), ...args);
  }

  warn(...args: any) {
    console.warn(colors.yellow(this.getFullPrefix(LogLevel.WARN)), ...args);
  }

  error(...args: any) {
    console.error(colors.red(this.getFullPrefix(LogLevel.ERROR)), ...args);
  }
}

export default new Log();
