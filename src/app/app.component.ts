import { Component,ViewChild,ElementRef, AfterViewInit, OnInit } from '@angular/core';
import {PrinterService} from './printer.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit,OnInit {
  printData = [1];
  @ViewChild('set')set: ElementRef;
  @ViewChild('code')code: ElementRef;
  @ViewChild('des')des: ElementRef;
  @ViewChild('uom')uom: ElementRef;
  @ViewChild('qty')qty: ElementRef;

  constructor(private printerService: PrinterService) {}

ngOnInit() {
  console.log('AppComponent____________');

    
}

  ngAfterViewInit() {
   
  }

  getPrinters() {
    this.printerService.getPrinters().subscribe((data) => {
      console.log(data);
    })
  }

 print(pdata) {
   let printContent = `
   <html>

<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<style>
  html, body {
    padding: 0;
    margin: 0;
  }
      @media print{
         .pagebreak {
        clear: both;
        page-break-after: always;
    }
        body {
           margin-top:0 !important;
           margin-right: 1mm !important;
           margin-left: 1mm !important;
           margin-bottom: 0;
           padding: 0;
           }
      @page {
        margin: 0;
      }
      }
      .page-break {
        page-break-after:always;
      }
      @page:last {}
      .container {
        margin-top: 1mm;
        margin-bottom: 1mm;
        margin-left: 0 !important;
        padding: 0;
      }
	</style>
  <script>
  
  </script>
</head>

<body>
<div>
${this.printData.map((item, i) => ` 
      <div class="container" style="height: 22mm;width: 47mm; float: ${(i + 1) % 2 !== 0 ? 'left' : 'right'}">


        <div id="label1" style="display:${(i + 1) % 2 !== 0 ? '' : 'none'};margin-top: 1mm;margin-bottom: 1mm;margin-right: 1mm;margin-left: 4mm;
        height: 20mm;width: 42mm;">
           <div id="table1" style="display: table;height: 20mm;width: 154px;border-spacing: 4px;">
             <div style="display: table-row;height: 20mm;width: 150px;">
               <div style="display: table-cell;width: 70px;max-width: 70px;vertical-align: middle;">
                <div>
                  <img src="${"https://chart.googleapis.com/chart?cht=qr&chl=" + (pdata.itemCode  + '%09' + pdata.description + '%09' + pdata.baseUoMCode + '%09' + pdata.baseQuantity) + "&chs=67x62&chld=L|0"}">
                </div>
                <div style="width: 70px;max-width: 70px;overflow: hidden;font-family: Impact;font-size: 12px;text-align: center">${pdata.itemCode}</div>
               </div>
                
                <div style="display: table-cell;width: 80px;max-width: 80px;height: 20mm">
                  <div style="display: inline-block;font-family: Impact;font-size:10px;width: 80px;max-width: 80px;overflow: hidden;height: 17mm;max-height: 17mm">
                      <div>Chrysanthemum Deco</div>
                      <div>Snowdown Zembia</div>
                      <div>Yellow With Green 70cm</div>
                  </div>
                  <div style="font-family: Calibri;font-size: 10px;font-weight: bold;height: 3mm;max-height: 3mm;display: flex;align-item: center">
                    <span>ULGKS@99</span>
                  </div>
               </div>
             </div>
           </div>
        </div>
         
          <div id="labe2" style="display:${(i + 1) % 2 !== 0 ? 'none' : ''};margin-top: 1mm;margin-bottom: 1mm;margin-right: 1mm;margin-left: 1mm;
                 height: 20mm;width: 45mm;">
           <div id="table1" style="display: table;height: 20mm;width: 154px;border-spacing: 4px;">
             <div style="display: table-row;height: 20mm;width: 150px;">
               <div style="display: table-cell;width: 70px;max-width: 70px;vertical-align: middle;">
                <div>
                  <img src="${"https://chart.googleapis.com/chart?cht=qr&chl=" + (pdata.itemCode  + '%09' + pdata.description + '%09' + pdata.baseUoMCode + '%09' + pdata.baseQuantity) + "&chs=67x62&chld=L|0"}">
                </div>
                <div style="width: 70px;max-width: 70px;overflow: hidden;font-family: Impact;font-size: 12px;text-align: center">${pdata.itemCode}</div>
               </div>
                
                <div style="display: table-cell;width: 80px;max-width: 80px;height: 20mm">
                  <div style="display: inline-block;font-family: Impact;font-size:10px;width: 80px;max-width: 80px;overflow: hidden;height: 17mm;max-height: 17mm">
                      <div>Chrysanthemum Deco</div>
                      <div>Snowdown Zembia</div>
                      <div>Yellow With Green 70cm</div>
                  </div>
                  <div style="font-family: Calibri;font-size: 10px;font-weight: bold;height: 3mm;max-height: 3mm;display: flex;align-item: center">
                     <span>ULGKS@99</span>
                  </div>
               </div>
             </div>
           </div>
        </div>

      </div>
  `.trim()).join('')}
</div>
</body>
</html
 \n`;
var data = [{
      type: 'html',
      format: 'plain',
      data: printContent
    }]
var data1 = [{ 
   type: 'raw', format: 'pdf', flavor: 'base64',
   data: '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YmoKMjIgMCBvYmoKPDwgL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL0NJREZvbnRUeXBlMgovQmFzZUZvbnQgL0ltcGFjdFJlZ3VsYXIKL0NJRFN5c3RlbUluZm8gPDwgL1JlZ2lzdHJ5IChBZG9iZSkgL09yZGVyaW5nIChJZGVudGl0eSkgL1N1cHBsZW1lbnQgMCA+PgovRm9udERlc2NyaXB0b3IgMjAgMCBSCi9DSURUb0dJRE1hcCAvSWRlbnRpdHkKL1cgWzAgWzYxMCAyMzUgNDIyIDM4MyA0NTAgNDI2IDI5MSAzNjUgNDEwIDQyNSAyNDggNDE2IDYyNyA0MjUgNDUwIDQwMiA0MTYgNDIwIDU0NCAxNDMgMzIzIDQyMiAyMjMgMzg1IDIyMyA2NjIgNDQ5IDMxOCA0MzYgXQpdCj4+CmVuZG9iagoyMyAwIG9iago8PCAvTGVuZ3RoIDU2MCA+PgpzdHJlYW0KL0NJREluaXQgL1Byb2NTZXQgZmluZHJlc291cmNlIGJlZ2luCjEyIGRpY3QgYmVnaW4KYmVnaW5jbWFwCi9DSURTeXN0ZW1JbmZvIDw8IC9SZWdpc3RyeSAoQWRvYmUpIC9PcmRlcmluZyAoVUNTKSAvU3VwcGxlbWVudCAwID4+IGRlZgovQ01hcE5hbWUgL0Fkb2JlLUlkZW50aXR5LVVDUyBkZWYKL0NNYXBUeXBlIDIgZGVmCjEgYmVnaW5jb2Rlc3BhY2VyYW5nZQo8MDAwMD4gPEZGRkY+CmVuZGNvZGVzcGFjZXJhbmdlCjIgYmVnaW5iZnJhbmdlCjwwMDAwPiA8MDAwMD4gPDAwMDA+CjwwMDAxPiA8MDAxQz4gWzwwMDY2PiA8MDA2ND4gPDAwNzM+IDwwMDQzPiA8MDA2OD4gPDAwNzI+IDwwMDc5PiA8MDA2MT4gPDAwNkU+IDwwMDc0PiA8MDA2NT4gPDAwNkQ+IDwwMDc1PiA8MDA0ND4gPDAwNjM+IDwwMDZGPiA8MDA1Mz4gPDAwNzc+IDwwMDIwPiA8MDA1QT4gPDAwNjI+IDwwMDY5PiA8MDA1OT4gPDAwNkM+IDwwMDU3PiA8MDA0Nz4gPDAwMzc+IDwwMDMwPiBdCmVuZGJmcmFuZ2UKZW5kY21hcApDTWFwTmFtZSBjdXJyZW50ZGljdCAvQ01hcCBkZWZpbmVyZXNvdXJjZSBwb3AKZW5kCmVuZAoKZW5kc3RyZWFtCmVuZG9iago4IDAgb2JqCjw8IC9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMAovQmFzZUZvbnQgL0ltcGFjdFJlZ3VsYXIKL0VuY29kaW5nIC9JZGVudGl0eS1ICi9EZXNjZW5kYW50Rm9udHMgWzIyIDAgUl0KL1RvVW5pY29kZSAyMyAwIFI+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgClsKNSAwIFIKXQovQ291bnQgMQovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUNdCj4+CmVuZG9iagp4cmVmCjAgMjUKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMTM2ODMgMDAwMDAgbiAKMDAwMDAwMDIzOSAwMDAwMCBuIAowMDAwMDAwMzM0IDAwMDAwIG4gCjAwMDAwMDA4OTAgMDAwMDAgbiAKMDAwMDAwMDM3MSAwMDAwMCBuIAowMDAwMDAwODIxIDAwMDAwIG4gCjAwMDAwMTM1NDQgMDAwMDAgbiAKMDAwMDAwNzU1OSAwMDAwMCBuIAowMDAwMDAwODQwIDAwMDAwIG4gCjAwMDAwMDEyMTggMDAwMDAgbiAKMDAwMDAwMjkyMCAwMDAwMCBuIAowMDAwMDAxMDExIDAwMDAwIG4gCjAwMDAwMDExOTggMDAwMDAgbiAKMDAwMDAwMjk0MSAwMDAwMCBuIAowMDAwMDAzMTkzIDAwMDAwIG4gCjAwMDAwMDY4NTEgMDAwMDAgbiAKMDAwMDAwNzA5NCAwMDAwMCBuIAowMDAwMDA2ODMwIDAwMDAwIG4gCjAwMDAwMDc2OTYgMDAwMDAgbiAKMDAwMDAwNzk1MCAwMDAwMCBuIAowMDAwMDEyNjAzIDAwMDAwIG4gCjAwMDAwMTI5MzIgMDAwMDAgbiAKMDAwMDAxMjU4MiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDI1Ci9JbmZvIDEgMCBSCi9Sb290IDEwIDAgUgo+PgpzdGFydHhyZWYKMTM3ODEKJSVFT0YK' 
}];


    // data[0].data = printContent;
    this.onPrint(data);
 }

 onPrint(data) {
  
     this.printerService.printHTML('Microsoft Print to PDF', data);
   
    // this.printerService.printData('Honeywell PC42t (203 dpi) - ESim', data).subscribe(() => {});
    
    //     var myWindow = window.open("", "BarCode Print");
    // myWindow.document.write(data[0].data);
    
  
    this.printData = [1];

    let html = data[0].data;
  // this.pdfRocket(html, this.savePdf)

 }

 savePdf() {}

     pdfRocket(html, savePdf) {
     console.log('works')
       var self = this;
       
       self.save = savePdf;
       self.req = new XMLHttpRequest();
  
       var url = "https://api.html2pdfrocket.com/pdf";
       var apiKey = "7d09eb97-bc0c-4309-b908-4730e7ec6d32";
 
       // Additional parameters can be added here
       var data = "apikey=" + apiKey + "&value=" + encodeURIComponent(html);
  
       self.req.onload = function(event) {
              self.reader = new FileReader();
              
              self.reader.addEventListener("loadend", function() {
 
                     // Open in new tab
                     window.open(self.reader.result, "_blank");
                     
                     // return data URI
                     return self.reader.result;
              });
              
              self.reader.readAsDataURL(self.req.response);
       };
  
       self.req.open("POST", url, true);
       self.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
       self.req.responseType = "blob";
  
       self.req.send(data);
}

 submit() {
   const comp = {itemCode: this.code.nativeElement.value, description: this.des.nativeElement.value, baseUoMCode: this.uom.nativeElement.value, baseQuantity: this.qty.nativeElement.value};
   const loop = this.set.nativeElement.value;
   if(loop && loop > 1) {
     for(var i = 0; i <= loop; i++) {
       this.printData.push(i);
     }
   }
   this.print(comp);
 }

 removePrinter() {
   this.printerService.removePrinter();
 }
}
