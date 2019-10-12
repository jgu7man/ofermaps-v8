import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-qrcode',
  templateUrl: './read-qrcode.component.html',
  styleUrls: ['./read-qrcode.component.css']
})
export class ReadQrcodeComponent implements OnInit {

  constructor(private router: Router) { }

  @ViewChild('scanner', {static:true})
  scanner: ZXingScannerComponent;
  cameras = []

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasPermission: boolean;
  qrResultString: string;
  tryHarder = false;

  public enabled: boolean = true
  public flash: boolean = false

  ngOnInit() {
  }

  onCodeResult(event) {
    this.router.navigate(['/empresa/code-result/'+event])
  }

  onHasPermission(event) {
    if (event == false) {
      alert('Activa los permisos de la cámara')
    }
  }

  onPause() {
    this.enabled = !this.enabled
  }

  onFlash() {
    this.flash = !this.flash
  }

  onChangeCamera(e) {
    this.cameras = e
  }

   /**
   * Some method.
   */
  doSomething(): void {
    this.scanner.device
  }
 
  /**
   * Returns the back camera for ya.
   */
  // getBackCamera() {
  //   return theBackCamera;
  // }

}
