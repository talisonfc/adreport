import { CategoriaModel } from "./categoria.model";

export class MovimentacaoModel{
    key?: string
    data: Date
    valor: number
    descricao: string
    categoria: CategoriaModel
    autor: string // descreve quem praticou a acao de movimentar

    constructor(){
        this.data = new Date()
        this.valor = 0;
        this.descricao = "";
        this.categoria = new CategoriaModel();
        this.autor = "" 
    }
}