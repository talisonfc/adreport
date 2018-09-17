import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { DespesaModel } from '../../model/despesa.model';
import { CategoriaConfig } from '../../configuracao/categoria.config';

@IonicPage()
@Component({
  selector: 'page-despesa',
  templateUrl: 'despesa.html',
})
export class DespesaPage implements OnInit{

  form: any
  despesa: DespesaModel
  categorias: any

  constructor(
    private categoriaConf: CategoriaConfig,
    private fb: FormBuilder,
    public view: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
      this.despesa = new DespesaModel()
  }

  ngOnInit(){
    this.categorias = this.navParams.get("categoria")

    this.form = this.fb.group({
      data: [this.getHoje()],
      valor: [''],
      descricao: [''],
      categoria: [''],
      autor: ['']
    })
  }

  submit(){
    this.despesa.data = this.form.value.data
    this.despesa.valor = this.form.value.valor
    this.despesa.descricao = this.form.value.descricao
    this.despesa.categoria = this.form.value.categoria
    this.despesa.autor = this.form.value.autor

    this.view.dismiss({payload: this.despesa})
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
