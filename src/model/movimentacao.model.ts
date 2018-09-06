export class MovimentacaoModel{
    key?: string
    data: Date
    valor: number
    descricao: string
    categoria: string
    autor: string // descreve quem praticou a acao de movimentar

    constructor(){
        this.data = new Date()
        this.valor = 0;
        this.descricao = "";
        this.categoria = "";
        this.autor = "" 
    }
}