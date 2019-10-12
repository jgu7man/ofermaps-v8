import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { trigger, transition, group, query, style, animate } from '@angular/animations';
import { UbicacionNegocioService } from '../../../services/Ubicacion.Negocio.Service';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css'],
  animations: [
    trigger('routeAnimation', [
        transition('1 => 2, 2 => 3, 3 => 4', [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(100%)' })),
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
            ]),
        ]),
        transition('4 => 3, 3 => 2, 2 => 1', [
            style({ height: '!' }),
            query(':enter', style({ transform: 'translateX(-100%)' })),
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
                ]),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
            ]),
        ]),
    ])
]
})
export class HomeSliderComponent implements OnInit {
  public slide:any;
  public zone: string
  constructor(
    private router: Router,
    private _ubicacion: UbicacionNegocioService
  ) {
    if (window.screen.width >= 700) { // 768px portrait
        router.navigate(['home'])
    }
   }

  ngOnInit() {
    this.href();
    this.getUbication()
  }

  mexico = `../../../assets/img/colima.png`
  uruguay = `../../../assets/img/montevideo2.png`
  

  getUbication() {
    navigator.geolocation.getCurrentPosition(geo => {
      var lat = geo.coords.latitude;
      var long = geo.coords.longitude;

      this._ubicacion.geoCoder(lat, long).subscribe(res => {
        var splitZone = res.plus_code.compound_code.split(',')
        var sliceZone = splitZone[splitZone.length - 1]
        var trimZone = sliceZone.trim()


        if (trimZone == 'México') {
          this.zone = this.mexico
        } else {
          this.zone = this.uruguay
        }
  
      },
        function error(msg) {
          alert('Por favor activa la Ubicación de tu navegador');
        });
    });
  }
  
  
  href() {
    var path = window.location.href;
    var pathSplit = path.split('/')
    var slideNum = pathSplit[pathSplit.length - 1]
    this.slide = parseInt(slideNum)
  }
  next() {
    this.href();
    
    switch (this.slide) {
      case 1:
        this.router.navigate(['/slider/2']);
        break;
      case 2:
        this.router.navigate(['/slider/3']);
        break;
      case 3:
        sessionStorage.setItem('omvisited', 'visited')
        this.router.navigate(['/']);
        break;
    
      default:
        break;
    }

      // if(this.slide.includes('1')) {
      //   this.router.navigate(['./slider/slide2']);
      // }
      // if (this.slide.includes('2')) {
      //   this.router.navigate(['./slider/slide3']);
      // }
      // if (this.slide.includes('3')) {
      //   sessionStorage.setItem('omvisited', 'visited')
      //   this.router.navigate(['/']);
      // } 
  }


  getPage(outlet){
    return outlet.activatedRouteData['page'];
  }

}
