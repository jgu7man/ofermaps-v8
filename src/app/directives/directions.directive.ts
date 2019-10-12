import {Directive, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GoogleMapsAPIWrapper} from '@agm/core';

export interface ILatLng {
  latitude: number;
  longitude: number;
}

declare var google: any;

@Directive({
  selector: '[appDirectionsMap]'
})
export class DirectionsMapDirective implements OnInit, OnChanges {
  @Input() origin: ILatLng;
  @Input() destination: ILatLng;
  @Input() showDirection: boolean;

  private directionsRenderer: any;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {
    this.drawDirectionsRoute();
  }

  drawDirectionsRoute() {
      this.gmapsApi.getNativeMap().then(map => {
        if (!this.directionsRenderer) {
            this.directionsRenderer = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: '#C1272D'
                }
            });
        }
        const directionsRenderer = this.directionsRenderer;

        if ( this.showDirection && this.destination ) {
            const directionsService = new google.maps.DirectionsService;
            directionsRenderer.setMap(map);
            directionsService.route({
                origin: {lat: this.origin.latitude, lng: this.origin.longitude},
                destination: {lat: this.destination.latitude, lng: this.destination.longitude},
                waypoints: [],
                optimizeWaypoints: true,
                travelMode: 'DRIVING'
            }, (response, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(response);
                } else {
                    console.log('Directions request failed due to ' + status);
                }
            });
        }

      });
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes.destination || changes.showDirection) {
          if (changes.showDirection && !changes.showDirection.currentValue) {
              if (this.directionsRenderer !== undefined) { // check this value is not undefined
                  this.directionsRenderer.setDirections({routes: []});
                  return;
              }
          } else {
              this.drawDirectionsRoute();
          }
      }
  }

}
