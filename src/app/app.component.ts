import { Component,ViewChild,ElementRef, AfterViewInit, OnInit } from '@angular/core';
import {PrinterService} from './printer.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit,OnInit {
  printData = [];
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
        size: 102.6mm 25mm;
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
 `;
var data = [{
      type: 'html',
      format: 'plain',
      data: printContent
    }]
    this.onPrint(data);
 }

 onPrint(data) {
    this.printerService.printData('Honeywell PC42t (203 dpi) - ESim', data).subscribe(
      data => {
        console.log('ok print');
      },
      err => {
        console.log(err);
      }
    );
 }

 submit() {
   const comp = {itemCode: this.code.nativeElement.value, description: this.des.nativeElement.value, baseUoMCode: this.uom.nativeElement.value, baseQuantity: this.qty.nativeElement.value};
   const loop = this.set.nativeElement.value;
   if(loop && loop > 1) {
     for(var i = 0; i <= loop; i++) {
       this.printData.push(i);
     }
   }
   console.log(this.printData);
   this.print(comp);
 }
}
