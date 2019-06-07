
import { Injectable } from '@angular/core';
import { from as fromPromise, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import * as qz from 'qz-tray';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  //npm install qz-tray js-sha256 rsvp --save
  constructor() {
    qz.api.setSha256Type(data => sha256(data));
    qz.api.setPromiseType(resolver => new Promise(resolver));
  }
  // Get the list of printers connected
  getPrinters(): Observable<string[]> {
    console.log('+++++++++PrinterService+++++');
    return fromPromise(
      qz.websocket.connect().then(() => qz.printers.find())
    )
    map((printers: string[]) => printers)
      , catchError(this.errorHandler);
  }

  // Get the SPECIFIC connected printer
  getPrinter(printerName: string): Observable<string> {
    return fromPromise(
      qz.websocket.connect()
        .then(() => qz.printers.find(printerName))
    )
    map((printer: string) => printer)
      , catchError(this.errorHandler);
  }

  // Print data to chosen printer
  printData(printer: string, data: any): Observable<any> {
    const config = qz.configs.create(printer);

    return fromPromise(qz.print(config, data))
    map((anything: any) => anything)
      , catchError(this.errorHandler);
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(error.error);
      console.log('An error occurred:', error.status);
      return throwError(error.error);
    } else {
      console.log('An error occurred:', error.status);
      console.log(error.error);
      return throwError(error.error);
    }
  };
}