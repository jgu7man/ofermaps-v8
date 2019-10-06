export class Tarjeta {

    constructor(
        public tBanco: string,
        public tNombre: string,
        public tNumero: string,
        public tMes: string,
        public tYear: string,
        public tCVC: string,
        public tEmisor: string,
        
        public facEmail: string,
        public facTel: string,
        public facRFC: string,
    ){

    }
}