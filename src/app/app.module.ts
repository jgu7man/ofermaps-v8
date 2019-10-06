import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { routing, appRountingProviders } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { MaterializeModule } from "angular2-materialize";
import { CompareValidatorDirective } from "./directives/validator.directive";
import { PwdToggleDirective } from "./directives/pwd-toggle.directive";
import { TextMaskModule } from "angular2-text-mask";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ColorHueModule } from "ngx-color/hue";
import { ColorCompactModule } from "ngx-color/compact";
import { ColorAlphaModule } from "ngx-color/alpha";
import { ColorSwatchesModule } from "ngx-color/swatches";

import { FontPickerModule } from "ngx-font-picker";
import { FONT_PICKER_CONFIG } from "ngx-font-picker";
import { FontPickerConfigInterface } from "ngx-font-picker";
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import 'hammerjs';

// Google
// import { LoginModule } from "./log/login/login.module";
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AgmCoreModule } from "@agm/core";
const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  apiKey: "AIzaSyAkjYOLC5pOkozcStdWfDDDJJ8vtrlDhI8"
};
// import {  } from "@types/googlemaps";

import { PlanesServicio } from "./services/planes.service";
import { TarjetaService } from "./services/tarjeta.service";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";

// EMPRESA SECTION
import { LoginComponent } from "./components/empresa/login/login.component";
import { RegistroComponent } from "./components/empresa/regist-main/registro/registro.component";
import { EmpresaComponent } from "./components/empresa/empresa.component";
import { UbicacionComponent } from "./components/empresa/regist-main/ubicacion/ubicacion.component";
import { PersonalizarComponent } from "./components/empresa/regist-main/personalizar/personalizar.component";
import { MapaEmpresaComponent } from "./components/empresa/regist-main/mapa-empresa/mapa-empresa.component";

import { EDashboardComponent } from "./components/empresa/e-dashboard/e-dashboard.component";
import { ENavbarComponent } from "./components/empresa/e-navbar/e-navbar.component";
import { CrearOfertaComponent } from "./components/empresa/e-dashboard/crear-oferta/crear-oferta.component";
import { TusOfertasComponent } from "./components/empresa/e-dashboard/tus-ofertas/tus-ofertas.component";
import { CSesAlertComponent } from "./components/empresa/e-dashboard/c-ses-alert/c-ses-alert.component";

import { PlanesComponent } from "./components/empresa/planes/planes.component";
import { FormadepagoComponent } from "./components/empresa/pasarela/formadepago/formadepago.component";
import { RegTarjetaComponent } from "./components/empresa/pasarela/reg-tarjeta/reg-tarjeta.component";
import { PasarelaComponent } from "./components/empresa/pasarela/pasarela.component";
import { TicketComponent } from "./components/empresa/pasarela/ticket/ticket.component";

import { HomeSliderComponent } from "./components/home/home-slider/home-slider.component";
import { Slider1Component } from "./components/home/home-slider/slider1/slider1.component";
import { Slider2Component } from "./components/home/home-slider/slider2/slider2.component";
import { Slider3Component } from "./components/home/home-slider/slider3/slider3.component";
import { RegistMainComponent } from "./components/empresa/regist-main/regist-main.component";

import { EditorComponent } from "./components/empresa/editor/editor.component";
import { WindowComponent } from "./components/empresa/editor/window/window.component";
import { HerramientasComponent } from "./components/empresa/editor/herramientas/herramientas.component";
import { FigurasComponent } from "./components/empresa/editor/herramientas/figuras/figuras.component";
import { FondoComponent } from "./components/empresa/editor/herramientas/fondo/fondo.component";
import { TextoComponent } from "./components/empresa/editor/herramientas/texto/texto.component";
import { ImagenComponent } from "./components/empresa/editor/herramientas/imagen/imagen.component";
import { PlantillaComponent } from "./components/empresa/editor/herramientas/plantilla/plantilla.component";
import { PreviewComponent } from "./components/empresa/editor/herramientas/preview/preview.component";

import { FiltroComponent } from "./components/empresa/editor/herramientas/ajustes/filtro/filtro.component";
import { EditBoxComponent } from "./components/empresa/editor/herramientas/ajustes/edit-box/edit-box.component";
import { TextBoxComponent } from "./components/empresa/editor/herramientas/ajustes/text-box/text-box.component";
import { AjustarBgComponent } from "./components/empresa/editor/herramientas/ajustes/ajustar-bg/ajustar-bg.component";
import { OrdenarComponent } from "./components/empresa/editor/herramientas/ajustes/ordenar/ordenar.component";
import { MapaComponent } from "./components/usuario/mapa/mapa.component";
import { InicioComponent } from "./components/usuario/inicio/inicio.component";
import { TopAreaComponent } from "./components/usuario/inicio/top-area/top-area.component";
import { QueryOfertasComponent } from "./components/usuario/inicio/query-ofertas/query-ofertas.component";
import { UserDashboardComponent } from "./components/usuario/user-dashboard/user-dashboard.component";
import { UserMenuComponent } from "./components/usuario/user-dashboard/user-menu/user-menu.component";
import { NavbarComponent } from "./components/navbars/navbar/navbar.component";
import { OfertasComponent } from "./components/usuario/ofertas/ofertas.component";
import { OfertaComponent } from "./components/oferta/oferta.component";
import { OferNavbarComponent } from './components/oferta/ofer-navbar/ofer-navbar.component';
import { OferMenuComponent } from './components/oferta/ofer-menu/ofer-menu.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ListaComponent } from './components/usuario/inicio/lista/lista.component';
import { VistaComponent } from './components/empresa/vista/vista.component';
import { BackbarComponent } from './components/navbars/backbar/backbar.component';
import { VerCodeComponent } from './components/usuario/ver-code/ver-code.component';
import { SuscripcionesComponent } from "./components/usuario/suscripciones/suscripciones.component";
import { SearchComponent } from './components/usuario/search/search.component';
import { EditarEmpresaComponent } from './components/empresa/editar-empresa/editar-empresa.component';
import { VerUbicacionComponent } from './components/empresa/e-dashboard/ver-ubicacion/ver-ubicacion.component';
import { PrevioComponent } from './components/empresa/oferta/previo/previo.component';
import { ResumenComponent } from './components/empresa/oferta/resumen/resumen.component';
import { EditarComponent } from './components/empresa/oferta/editar/editar.component';
import { EditarOfertaComponent } from './components/empresa/oferta/editar-oferta/editar-oferta.component';
import { PrevioEditComponent } from './components/empresa/oferta/previo-edit/previo-edit.component';
import { CuentaComponent } from './components/empresa/cuenta/cuenta.component';
import { EmpresaMenuComponent } from './components/empresa/e-dashboard/empresa-menu/empresa-menu.component';
import { ReadQrcodeComponent } from './components/empresa/e-dashboard/read-qrcode/read-qrcode.component';
import { QrcodeResultComponent } from './components/empresa/e-dashboard/qrcode-result/qrcode-result.component';
import { AvisoComponent } from './components/home/aviso/aviso.component';
import { UploadingComponent } from './components/uploading/uploading.component';
import { PdpComponent } from './components/docs/pdp/pdp.component'

import { RegistMapaEmpresaComponent } from './components/admin/pruebas/mapa-empresa/mapa-empresa.component'
import { RegistEmpresaComponent } from './components/admin/pruebas/personalizar/personalizar.component'
import { RegistUbicacionComponent } from './components/admin/pruebas/ubicacion/ubicacion.component'
import { CrearOfertaPruebaComponent } from './components/admin/pruebas/crear-oferta/crear-oferta.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    CompareValidatorDirective,
    PwdToggleDirective,
    AppComponent,
    HomeComponent,
    EmpresaComponent,
    LoginComponent,
    RegistroComponent,
    UbicacionComponent,
    PersonalizarComponent,
    EDashboardComponent,
    ENavbarComponent,
    CrearOfertaComponent,
    TusOfertasComponent,
    CSesAlertComponent,
    PlanesComponent,
    FormadepagoComponent,
    RegTarjetaComponent,
    PasarelaComponent,
    TicketComponent,
    HomeSliderComponent,
    Slider1Component,
    Slider2Component,
    Slider3Component,
    RegistMainComponent,
    EditorComponent,
    WindowComponent,
    HerramientasComponent,
    FigurasComponent,
    FondoComponent,
    TextoComponent,
    ImagenComponent,
    FiltroComponent,
    PlantillaComponent,
    EditBoxComponent,
    TextBoxComponent,
    AjustarBgComponent,
    OrdenarComponent,
    PreviewComponent,
    MapaComponent,
    InicioComponent,
    TopAreaComponent,
    QueryOfertasComponent,
    UserDashboardComponent,
    UserMenuComponent,
    NavbarComponent,
    OfertasComponent,
    OfertaComponent,
    MapaEmpresaComponent,
    OferNavbarComponent,
    OferMenuComponent,
    LoadingComponent,
    ListaComponent,
    VistaComponent,
    BackbarComponent,
    VerCodeComponent,
    SuscripcionesComponent,
    SearchComponent,
    EditarEmpresaComponent,
    VerUbicacionComponent,
    PrevioComponent,
    ResumenComponent,
    EditarComponent,
    EditarOfertaComponent,
    PrevioEditComponent,
    CuentaComponent,
    EmpresaMenuComponent,
    ReadQrcodeComponent,
    QrcodeResultComponent,
    AvisoComponent,
    UploadingComponent,
    PdpComponent,
    RegistMapaEmpresaComponent,
    RegistEmpresaComponent,
    RegistUbicacionComponent,
    CrearOfertaPruebaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ofermaps'}),
    AppRoutingModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    // MaterializeModule,
    TextMaskModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ColorHueModule,
    ColorCompactModule,
    ColorAlphaModule,
    ColorSwatchesModule,
    FontPickerModule,
    // LoginModule,
    NgxQRCodeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCYi6ElC3jbxxSu8A2BXVjG79_1M7yXldQ"
    }),
    ZXingScannerModule,
    RoundProgressModule
  ],
  providers: [
    appRountingProviders,
    PlanesServicio,
    TarjetaService,
    Title,
    {
      provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
