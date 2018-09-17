import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { ReceitaModel } from '../../model/receita.model';
import { CategoriaConfig } from '../../configuracao/categoria.config';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-receita',
  templateUrl: 'receita.html',
})
export class ReceitaPage implements OnInit{

  form = this.fb.group({
    data: [this.getHoje()],
    valor: [''],
    descricao: [''],
    categoria: [''],
    autor: ['']
  })

  receita: ReceitaModel
  categorias: any

  constructor(
    private categoriaConf: CategoriaConfig,
    private fb: FormBuilder,
    private db: DatabaseProvider,
    public view: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
      
  }

  ngOnInit(){
    this.receita = this.navParams.get("payload")
    this.categorias = this.navParams.get("categoria")
    console.log(this.categorias)
    if(this.receita == undefined){
      this.receita = new ReceitaModel()
    }
    else{
      this.form = this.fb.group({
        data: [this.getHoje()],
        valor: [this.receita.valor],
        descricao: [this.receita.descricao],
        categoria: [this.receita.categoria],
        autor: [this.receita.autor]
      })
    }
  }

  submit(){
    // console.log(this.form.value)
    this.receita.data = this.form.value.data
    this.receita.valor = this.form.value.valor
    this.receita.descricao = this.form.value.descricao
    this.receita.categoria = this.form.value.categoria
    this.receita.autor = this.form.value.autor

    this.view.dismiss({payload: this.receita})
  }

  close(){
    this.view.dismiss()
  }

  getHoje():string{
    let hoje = ""
    let temp = new Date()
    hoje = ""+temp.getFullYear()
    if(temp.getMonth()<10){
      hoje += "-0"+temp.getMonth()
    }
    else{
      hoje += "-"+temp.getMonth()
    }

    if(temp.getDate()<10){
      hoje += "-0"+temp.getDate()
    }
    else{
      hoje += "-"+temp.getDate()
    }

    return hoje
  }
}
