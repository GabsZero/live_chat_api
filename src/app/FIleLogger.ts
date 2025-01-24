import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import { DateTime } from "luxon";

export class FileLogger extends Logger {
  error(message: string, trace?: string) {

    const date = DateTime.local();
    fs.appendFileSync("./app-log.txt", date.toLocaleString(DateTime.DATETIME_FULL) + " " + message + "\r\n")
    if(trace){
        fs.appendFileSync("./app-log.txt", date.toLocaleString(DateTime.DATETIME_FULL) + " " + trace + "\r\n")
    }
      
    super.error(message, trace);
  }
}