export class listaUsuarioDTO{
    constructor(
        readonly ID:string,
        readonly LOGIN: string,
        readonly EMAIL: string,
        readonly NOME: string,
        readonly ENDERECO: string
    ){}
}