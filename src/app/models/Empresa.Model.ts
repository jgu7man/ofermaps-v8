export class EmpresaModel {
  constructor(
    public idEmpresa: string,
    public idUsuario: string,
    public nNegocio: string,
    public nAvatar: string,
    public nCategoria: string,
    public nTelefono: string,
    public nCorreo: string,
    public nWebsite: string,
    public planActual: string,
    public keywords: string[]
  ) {}
}
