import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { DespesaModel } from '../../model/despesa.model';
import { CategoriaModel } from '../../model/categoria.model';

@IonicPage()
@Component({
  selector: 'page-despesa',
  templateUrl: 'despesa.html',
})
export class DespesaPage implements OnInit{

  form: any
  despesa: DespesaModel
  categoria: any

  constructor(
    private fb: FormBuilder,
    public view: ViewController,
    public alert: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
      this.despesa = new DespesaModel()
  }

  ngOnInit(){
    this.categoria = this.navParams.get("categoria")
    this.despesa = this.navParams.get("payload")

    if(this.despesa == undefined){
      this.despesa = new DespesaModel()

      this.form = this.fb.group({
        data: [''],
        valor: [''],
        descricao: [''],
        categoria: [''],
        autor: ['']
      })
    }
    else{
      this.form = this.fb.group({
        data: [this.despesa.data],
        valor: [this.despesa.valor],
        descricao: [this.despesa.descricao],
        categoria: [''],
        autor: [this.despesa.autor]
      })
    }
    
  }

  submit(){
    this.despesa.data = this.form.value.data
    this.despesa.valor = this.form.value.valor
    this.despesa.descricao = this.form.value.descricao
    // this.despesa.categoria = this.form.value.categoria
    this.despesa.autor = this.form.value.autor

    // this.view.dismiss({payload: this.despesa})
  }

  close(){
    this.view.dismiss()
  }

  save(){
    this.view.dismiss({payload: this.despesa})
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

  setCategoria(){
    let alt = this.alert.create({
      title: "Categoria",
      buttons: [
        {
          text: "Cancelar"
        },
        {
          text: "Salvar"
        }
      ]
    })

    this.categoria.saida.forEach(cat => {
      alt.addInput({
        type: "radio",
        value: cat.key,
        label: cat.value,
        handler: data=>{
          // console.log(data)
          this.despesa.categoria.key = data.value
          this.despesa.categoria.value = data.label
          this.setSubcategoria(data.value)
          alt.dismiss()
        }
      })      
    });


    alt.present()
  }

  setSubcategoria(categoriaKey){
    this.categoria.saida.forEach(cat=>{
      if(cat.key==categoriaKey){
        let alt = this.alert.create({
          title: "Subcategoria",
          buttons: [
            {
              text: "Cancelar"
            },
            {
              text: "Salvar"
            }
          ]
        })
        cat.subcategoria.forEach(sub=>{
          alt.addInput({
            type: "radio",
            value: sub.key,
            label: sub.value,
            handler: data=>{
              // console.log(data)
              if(this.despesa.categoria.subcategoria == undefined){
                this.despesa.categoria.subcategoria = new Array<CategoriaModel>()
                let subcat = new CategoriaModel()
                subcat.key = data.value
                subcat.value = data.label
                this.despesa.categoria.subcategoria.push(subcat)
              }
              else{
                let subcat = new CategoriaModel()
                subcat.key = data.value
                subcat.value = data.label
                this.despesa.categoria.subcategoria[0] = subcat
              }
              
              alt.dismiss()
            }
          })
        })
        alt.present()
        return;
      }
    })
  }
}
