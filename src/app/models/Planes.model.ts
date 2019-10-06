export class PlanModel {

    constructor(
        public id: number,
        public nombre: string,
        public precio: string,
        public periodo: string,
        public beneficios: any[],
        public codigos: number,
        public publicaciones: number,
        public vistas: number,
        public vence: any
    ){}

}