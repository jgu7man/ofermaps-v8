export class OfertaModel {
  constructor(
    public idEmpresa: string,
    public idOferta: string,
    public oNombre: string,
    public oTipo: string,
    public oCantidad: any,
    public oCantAux: any,
    public oProdserv: string,
    public keywords: string[],
    public oPublicado: Date,
    public oCaducidad: Date,
    public oCondiciones: Array<string>,
    public oLimite: number,
    public oCodes: number,
    public oCanjes: number,
    public oImagen: string,
    public visible: boolean
  ) {}
}
