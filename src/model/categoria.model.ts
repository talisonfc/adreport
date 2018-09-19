export class CategoriaModel{
    key: string
    value: string
    subcategoria?: Array<CategoriaModel>

    constructor(){}

    initSubCategoria(){
        this.subcategoria = new Array<CategoriaModel>()
    }
}