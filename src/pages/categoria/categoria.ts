import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CategoriaModel } from '../../configuracao/categoria.model';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage({ name: "page-categoria" })
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage implements OnInit {

  categoriaEntrada: Array<CategoriaModel>
  categoriaSaida: Array<CategoriaModel>

  option: string = "entrada"

  constructor(
    private db: DatabaseProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.categoriaEntrada = new Array<CategoriaModel>()
    this.categoriaSaida = new Array<CategoriaModel>()

    this.db.getCategoria('entrada').then(res=>{
      this.categoriaEntrada = <Array<CategoriaModel>>res;
    })

    this.db.getCategoria('saida').then(res=>{
      this.categoriaSaida = <Array<CategoriaModel>>res;
    })
  }

  addCategoriaEntrada() {
    let alert = this.alertCtrl.create({ title: "Nome da categoria" })
    alert.addInput({
      name: "categoria",
      type: "text"
    })

    alert.addButton({
      text: "Cancelar"
    })

    alert.addButton({
      text: "Salvar",
      handler: data => {
        let key = this.createKey(data['categoria'])

        let temp = new CategoriaModel()
        temp.key = key
        temp.value = data['categoria']
        this.categoriaEntrada.push(temp)
        this.db.handleRelatorio().addCategoria(this.categoriaEntrada, "entrada")
      }
    })

    alert.present()
  }

  addCategoriaSaida() {
    let alert = this.alertCtrl.create({ title: "Nome da categoria" })
    alert.addInput({
      name: "categoria",
      type: "text"
    })

    alert.addButton({
      text: "Cancelar"
    })

    alert.addButton({
      text: "Salvar",
      handler: data => {
        let key = this.createKey(data['categoria'])

        let temp = new CategoriaModel()
        temp.key = key
        temp.value = data['categoria']
        this.categoriaSaida.push(temp)
        this.db.handleRelatorio().addCategoria(this.categoriaSaida, "saida")
      }
    })

    alert.present()
  }

  addSubcategoria(categoria: CategoriaModel, tipo: string){
    let alert = this.alertCtrl.create({ title: "Nome da subcategoria" })
    alert.addInput({
      name: "categoria",
      type: "text"
    })

    alert.addButton({
      text: "Cancelar"
    })

    alert.addButton({
      text: "Salvar",
      handler: data => {
        let key = this.createKey(data['categoria'])

        let temp = new CategoriaModel()
        temp.key = key
        temp.value = data['categoria']

        if(categoria.subcategoria == undefined) categoria.initSubCategoria()
        categoria.subcategoria.push(temp)
        this.update(tipo)
      }
    })

    alert.present()
  }

  createKey(str){
    let temp = this.trim(str)
    temp = this.removerAcentos(temp)
    return temp
  }

  trim(str){
    let temp = str.split(" ")
    let result = ""
    temp.forEach(element => {
      result += element
    });
    return result
  }

  /**
 * Remove acentos de caracteres
 * @param  {String} stringComAcento [string que contem os acentos]
 * @return {String}                 [string sem acentos]
 */
  removerAcentos(newStringComAcento) {
    var string = newStringComAcento;
    var mapaAcentosHex = {
      a: /[\xE0-\xE6]/g,
      A: /[\xC0-\xC6]/g,
      e: /[\xE8-\xEB]/g,
      E: /[\xC8-\xCB]/g,
      i: /[\xEC-\xEF]/g,
      I: /[\xCC-\xCF]/g,
      o: /[\xF2-\xF6]/g,
      O: /[\xD2-\xD6]/g,
      u: /[\xF9-\xFC]/g,
      U: /[\xD9-\xDC]/g,
      c: /\xE7/g,
      C: /\xC7/g,
      n: /\xF1/g,
      N: /\xD1/g,
    };

    for (var letra in mapaAcentosHex) {
      var expressaoRegular = mapaAcentosHex[letra];
      string = string.replace(expressaoRegular, letra);
    }

    return string;
  }

  remove(ar: Array<any>, index: number,tipo: string){
    ar = ar.splice(index,1)
    this.update(tipo)
    
  }

  edit(obj: CategoriaModel, tipo: string){
    let alert = this.alertCtrl.create({ title: "Editar" })
    alert.addInput({
      name: "categoria",
      type: "text",
      value: obj.value
    })

    alert.addButton({
      text: "Cancelar"
    })

    alert.addButton({
      text: "Salvar",
      handler: data => {
        let key = this.createKey(data['categoria'])

        let temp = new CategoriaModel()
        temp.key = key
        temp.value = data['categoria']

        obj.key = temp.key
        obj.value = temp.value

        this.update(tipo)
        
      }
    })

    alert.present()
  }

  update(tipo: string){
    if(tipo=="entrada"){
      this.db.handleRelatorio().addCategoria(this.categoriaEntrada, tipo)
    }
    else{
      this.db.handleRelatorio().addCategoria(this.categoriaSaida, tipo)
    }
  }
}
