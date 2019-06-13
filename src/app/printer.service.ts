
import { Injectable } from '@angular/core';
import { from as fromPromise, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as qz from 'qz-tray';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  //npm install qz-tray js-sha256 rsvp --save
  constructor(private http: HttpClient) {
    qz.api.setSha256Type(data => sha256(data));
    qz.api.setPromiseType(resolver => new Promise(resolver));
  }

	async getPrivateKey() {
		return this.http.get("/certificates/cert.txt", { responseType: 'text' }).toPromise();
	}

	async getPrivatePem() {
		return this.http.get("/certificates/key.txt", { responseType: 'text' }).toPromise();
	}
	
	initQZ () {
		let privateKey = '';
		let privatePem = '';

		this.getPrivateKey().then((data) => privateKey = data);
		this.getPrivatePem().then((data) => privatePem = data);
		
		qz.security.setCertificatePromise(function(resolve, reject) {
			console.log('Set Certificate');
			resolve(privateKey);
		});
	
		qz.security.setSignaturePromise(function(toSign) {
			return function(resolve, reject) {
				try {
					var pk = KJUR.KEYUTIL.getKey(privatePem);
					var sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});
					sig.init(pk); 
					sig.updateString(toSign);
					var hex = sig.sign();
					resolve(KJUR.stob64(KJUR.hextorstr(hex)));
				} catch (err) {
					console.error(err);
					reject(err);
				}
			};
		});

		qz.websocket.connect();
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
    const config = qz.configs.create(printer,{scaleContent: false, rasterize: "false"});
    
    return fromPromise(qz.print(config, data))
    map((anything: any) => anything)
      , catchError(this.errorHandler);
  }

  printHTML(printerName, htmlData) {
		qz.printers.find(printerName).then(function(found) {
			console.log("Printer: " + found);
			var config = qz.configs.create(printerName,
       {
         units: 'mm', 
         size: {width: 105, height: 24},
         scaleContent: "false",
         rasterize: "false"
         }
       );
			
			qz.print(config, htmlData).then(function() {
				console.log("Sent data to printer");
			}).catch((err) => console.log(err));
		}).catch((err) => {console.log(err) });
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

  // Disconnect QZ Tray from the browser
	removePrinter(): void {
		qz.websocket.disconnect();
	}
}