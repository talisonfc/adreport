import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RelatorioModel } from '../../model/relatorio.model';
import { ReceitaPage } from '../receita/receita';
import { DespesaPage } from '../despesa/despesa';
import { DatabaseProvider } from '../../providers/database/database';
import { Categoria } from '../../configuracao/categoria';

@IonicPage()
@Component({
  selector: 'page-relatorio-edit',
  templateUrl: 'relatorio-edit.html',
})
export class RelatorioEditPage implements OnInit {

  title: number = 0
  relatorio: RelatorioModel
  option: string = "receita"
  categoria: any

  constructor(
    private db: DatabaseProvider,
    public modal: ModalController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.categoria = Categoria
    this.relatorio = this.navParams.get('payload')
    this.title = this.relatorio.competencia.mes

    console.log(this.categoria)
  }

  addReceita() {
    let md = this.modal.create(ReceitaPage, {categoria: this.categoria})
    md.present()
    md.onWillDismiss(data => {
      if (data != undefined) {
        this.relatorio.addReceita(data.payload)
        this.db.handleRelatorio().update(this.relatorio)
      }
    })
  }

  removeReceita(index: number){
    this.relatorio.receitas.splice(index,1)
    this.db.handleRelatorio().update(this.relatorio)
  }

  editReceita(receita){
    let md = this.modal.create(ReceitaPage, {payload: receita, categoria: this.categoria})
    md.present()
    md.onWillDismiss(data => {
      this.db.handleRelatorio().update(this.relatorio)
    })
  }

  addDespesa() {
    let md = this.modal.create(DespesaPage, {categoria: this.categoria})
    md.present()
    md.onWillDismiss(data => {
      if (data != undefined) {
        // console.log(data)
        this.relatorio.addDespesa(data.payload)
        this.db.handleRelatorio().update(this.relatorio)
      }
    })
  }

  removeDespesa(index: number){
    this.relatorio.despesas.splice(index,1)
    this.db.handleRelatorio().update(this.relatorio)
  }

  editDespesa(despesa){
    let md = this.modal.create(DespesaPage, {payload: despesa, categoria: this.categoria})
    md.present()
    md.onWillDismiss(data => {
      this.db.handleRelatorio().update(this.relatorio)
    })
  }

  getItems(event){

  }
}
