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
      <div style="padding: 0;margin-left: 0 !important;margin-top: 1mm;margin-bottom: 1mm;height: 22mm;width: 47mm; float: ${(i + 1) % 2 !== 0 ? 'left' : 'right'}">


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
    }];
    // data[0].data = printContent;
    this.onPrint(data);
 }

 onPrint(data) {

   
  
    //  this.printerService.printHTML('Honeywell PC42t (203 dpi) - ESim', data);
   
    // this.printerService.printData('Honeywell PC42t (203 dpi) - ESim', data).subscribe(() => {});
    
   var myWindow = window.open("", "BarCode Print");
    myWindow.document.write(data[0].data);
    
  
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
   var arr = [];
   if(loop && loop > 1) {
     for(var i = 0; i <= (loop - 1); i++) {
       arr.push(i);
     }
     this.printData = arr;
   }
   this.print(comp);
 }

 removePrinter() {
   this.printerService.removePrinter();
 }
}
