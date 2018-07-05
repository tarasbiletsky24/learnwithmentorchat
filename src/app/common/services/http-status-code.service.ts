import { Injectable } from '@angular/core';
import * as httpStatusCodes from 'http-status-codes';

@Injectable({
  providedIn: 'root'
})
export class HttpStatusCodeService {
  constructor() { }

  isOk(code: number) {
    return code === httpStatusCodes.OK;
  }

  isBadRequest(code: number) {
    return code === httpStatusCodes.BAD_REQUEST;
  }

  isUnauthoized(code: number) {
    return code === httpStatusCodes.UNAUTHORIZED;
  }

  isNoContent(code: number) {
    return code === httpStatusCodes.NO_CONTENT;
  }
}
