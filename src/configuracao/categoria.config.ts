import { Injectable } from '@angular/core';
import { CategoriaModel } from "../model/categoria.model";

@Injectable()
export class CategoriaConfig{
    receitas: Array<CategoriaModel>
    despesas: Array<CategoriaModel>
    autores: Array<CategoriaModel>

    constructor(){
        this.receitas = new Array<CategoriaModel>()
        this.despesas = new Array<CategoriaModel>()
        this.autores = new Array<CategoriaModel>()
        this.initDespesas()
        this.initReceitas()
        this.initAutores()
    }

    initReceitas(){
        this.receitas.push(<CategoriaModel>{key: "dizimo", value: "Dízimo"})
        this.receitas.push(<CategoriaModel>{key: "oferta", value: "Oferta"})
        this.receitas.push(<CategoriaModel>{key: "oferta_missionaria", value: "Oferta Missionária"})
    }

    initDespesas(){
        this.despesas.push(<CategoriaModel>{key: "imoveis", value: "Imoveis"})
        this.despesas.push(<CategoriaModel>{key: "administrativas", value: "Administrativas"})
        this.despesas.push(<CategoriaModel>{key: "saude", value: "Saúde"})
    }

    initAutores(){
        this.autores.push(<CategoriaModel>{key: "sede", value: "Sede"})
        this.autores.push(<CategoriaModel>{key: "congregacao", value: "Congregação"})
    }
}