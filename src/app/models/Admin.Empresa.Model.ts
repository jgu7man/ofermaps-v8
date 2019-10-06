export class AdminEmpresa {
 
    constructor(
        public email: string,
        public confEmail: string,
        public contrasena: string,
        public confContrasena: string,
        public tyc: boolean,
        public pdp: boolean
    ){}

}

export class PostAdmin {

    constructor(
        public email: string,
        public password: string
    ) {}
}