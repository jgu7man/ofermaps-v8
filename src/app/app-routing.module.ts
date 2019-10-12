import { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { HomeSliderComponent } from "./components/home/home-slider/home-slider.component";
import { Slider1Component } from "./components/home/home-slider/slider1/slider1.component";
import { Slider2Component } from "./components/home/home-slider/slider2/slider2.component";
import { Slider3Component } from "./components/home/home-slider/slider3/slider3.component";

import { RegistMainComponent } from "./components/empresa/regist-main/regist-main.component";
import { RegistroComponent } from "./components/empresa/regist-main/registro/registro.component";
import { UbicacionComponent } from "./components/empresa/regist-main/ubicacion/ubicacion.component";
import { PersonalizarComponent } from "./components/empresa/regist-main/personalizar/personalizar.component";
import { MapaEmpresaComponent } from "./components/empresa/regist-main/mapa-empresa/mapa-empresa.component";

import { EmpresaComponent } from "./components/empresa/empresa.component";
import { LoginComponent } from "./components/empresa/login/login.component";
import { EDashboardComponent } from "./components/empresa/e-dashboard/e-dashboard.component";

import { PlanesComponent } from "./components/empresa/planes/planes.component";
import { FormadepagoComponent } from "./components/empresa/pasarela/formadepago/formadepago.component";
import { RegTarjetaComponent } from "./components/empresa/pasarela/reg-tarjeta/reg-tarjeta.component";
import { PasarelaComponent } from "./components/empresa/pasarela/pasarela.component";
import { TicketComponent } from "./components/empresa/pasarela/ticket/ticket.component";

import { EditorComponent } from "./components/empresa/editor/editor.component";
import { HerramientasComponent } from "./components/empresa/editor/herramientas/herramientas.component";
import { FigurasComponent } from "./components/empresa/editor/herramientas/figuras/figuras.component";
import { FondoComponent } from "./components/empresa/editor/herramientas/fondo/fondo.component";
import { TextoComponent } from "./components/empresa/editor/herramientas/texto/texto.component";
import { ImagenComponent } from "./components/empresa/editor/herramientas/imagen/imagen.component";
import { PlantillaComponent } from "./components/empresa/editor/herramientas/plantilla/plantilla.component";

import { InicioComponent } from "./components/usuario/inicio/inicio.component";
import { UserDashboardComponent } from "./components/usuario/user-dashboard/user-dashboard.component";
import { CrearOfertaComponent } from './components/empresa/e-dashboard/crear-oferta/crear-oferta.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { VistaComponent } from './components/empresa/vista/vista.component';
import { VerCodeComponent } from './components/usuario/ver-code/ver-code.component';
import { EditarEmpresaComponent } from './components/empresa/editar-empresa/editar-empresa.component';
import { VerUbicacionComponent } from './components/empresa/e-dashboard/ver-ubicacion/ver-ubicacion.component';
import { PrevioComponent } from './components/empresa/oferta/previo/previo.component';
import { ResumenComponent } from './components/empresa/oferta/resumen/resumen.component';
import { EditarOfertaComponent } from './components/empresa/oferta/editar-oferta/editar-oferta.component';
import { PrevioEditComponent } from './components/empresa/oferta/previo-edit/previo-edit.component';
import { CuentaComponent } from './components/empresa/cuenta/cuenta.component';
import { ReadQrcodeComponent } from './components/empresa/e-dashboard/read-qrcode/read-qrcode.component';
import { QrcodeResultComponent } from './components/empresa/e-dashboard/qrcode-result/qrcode-result.component';
import { UploadingComponent } from './components/uploading/uploading.component';
import { PdpComponent } from './components/docs/pdp/pdp.component';
import { RegistEmpresaComponent } from './components/admin/pruebas/personalizar/personalizar.component';
import { RegistUbicacionComponent } from './components/admin/pruebas/ubicacion/ubicacion.component';
import { RegistMapaEmpresaComponent } from './components/admin/pruebas/mapa-empresa/mapa-empresa.component';
import { CrearOfertaPruebaComponent } from './components/admin/pruebas/crear-oferta/crear-oferta.component';
import { StepsComponent } from './components/tutorial/steps/steps.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { InicioTutorialComponent } from './components/tutorial/inicio-tutorial/inicio-tutorial.component';
import { StepComponent } from './components/tutorial/step/step.component';
import { DirectionMapComponent } from './components/usuario/direction-map/direction-map.component';

const routes: Routes = [
  { path: 'uploading', component: UploadingComponent},
  { path: "", component: HomeComponent, data: { page: 5 } },

  { path: "slider", component: HomeSliderComponent, data: { page: 4 }, children: [
    { path: "", redirectTo: '1', pathMatch: 'full' },
    { path: "1", component: Slider1Component, data: { page: 1 } },
    { path: "2", component: Slider2Component, data: { page: 2 } },
    { path: "3", component: Slider3Component, data: { page: 3 } }
  ]},
  
  { path: "registro", component: RegistMainComponent, children:[
    { path: "empresa", component: PersonalizarComponent },
    { path: "mapa-empresa", component: MapaEmpresaComponent },
    { path: "ubicacion", component: UbicacionComponent },
  ] },
  
  { path: "login", component: LoginComponent },
    
  // { path: "empresa", redirectTo: "/empresa/login", pathMatch: "full" },
  { path: "empresa", component: EmpresaComponent, children: [
    { path: "", component: EDashboardComponent, children: [
      { path: 'tutorial', component: TutorialComponent, children:[
        { path: '', component: InicioTutorialComponent },
        { path: 'step/:sec/:num', component: StepComponent}
      ] },
    ] },
    
    { path: 'editar/:id', component: EditarEmpresaComponent },
    { path: 'verubicacion/:idEmpresa', component: VerUbicacionComponent},
    
    { path: "crear-oferta/:idEmpresa", component: CrearOfertaComponent },
    { path: "previo", component: PrevioComponent },
    { path: 'oResumen/:id', component: ResumenComponent },
    { path: 'edit-of', component: EditarOfertaComponent },
    { path: 'previo-edit', component: PrevioEditComponent },
    { path: 'reader', component: ReadQrcodeComponent},
    { path: 'code-result/:code', component: QrcodeResultComponent },
    
    { path: "planes", component: PlanesComponent },
    { path: 'cuenta', component: CuentaComponent },
    { path: "pasarela", component: PasarelaComponent, children: [
        // { path: 'formadepago', component: FormadepagoComponent},
        { path: "formadepago/:id", component: FormadepagoComponent },
        { path: "regtarjeta", component: RegTarjetaComponent },
        { path: "ticket/:id", component: TicketComponent }
      ]},
    ]
  },
  
  { path: "editor", component: EditorComponent, children: [
      // { path: 'herramientas', component: HerramientasComponent, children: [
      { path: "", component: FondoComponent },
      { path: "figuras", component: FigurasComponent },
      { path: "fondo", component: FondoComponent },
      { path: "texto", component: TextoComponent },
      { path: "imagen", component: ImagenComponent },
      { path: "plantilla", component: PlantillaComponent }
      // ]}
  ]
  },
  
  { path: "oferta/:id", component: OfertaComponent, children: [
    { path: 'tutorial', component: TutorialComponent, children:[
      { path: '', component: InicioTutorialComponent },
      { path: 'step/:sec/:num', component: StepComponent}
    ] },
  ] },
  { path: 'direction/:id', component: DirectionMapComponent},
  { path: "vista/:id", component: VistaComponent },
  { path: "inicio", component: InicioComponent, children: [
    { path: 'tutorial', component: TutorialComponent, children:[
      { path: '', component: InicioTutorialComponent },
      { path: 'step/:sec/:num', component: StepComponent}
    ] },
  ] },
  { path: "usuario", component: UserDashboardComponent, children: [
      { path: 'tutorial', component: TutorialComponent, children:[
        { path: '', component: InicioTutorialComponent },
        { path: 'step/:sec/:num', component: StepComponent}
      ] },
    ] },

  { path: "code/:id", component: VerCodeComponent },
  { path: "pdp", component: PdpComponent },

  { path: 'admin/regist/empresa', component: RegistEmpresaComponent },
  { path: 'admin/regist/ubicacion', component: RegistUbicacionComponent },
  { path: 'admin/regist/mapa', component: RegistMapaEmpresaComponent },
  { path: 'admin/regist/oferta/:idEmpresa', component: CrearOfertaPruebaComponent }
  
];

export const appRountingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
