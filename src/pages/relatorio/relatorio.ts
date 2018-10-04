import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { RelatorioModel } from '../../model/relatorio.model';
import { RelatorioEditPage } from '../relatorio-edit/relatorio-edit';

import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { CategoriaPage } from '../categoria/categoria';

@Component({
  selector: 'relatorio-page',
  templateUrl: 'relatorio.html'
})
export class RelatorioPage implements OnInit {

  relatorios: Array<RelatorioModel>

  constructor(
    private db: DatabaseProvider,
    public modal: ModalController,
    public alert: AlertController,
    public navCtrl: NavController) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
  }

  ngOnInit() {
    this.relatorios = this.db.handleRelatorio().list()
    // console.log(this.relatorios)
  }

  add() {
    let md = this.modal.create('relatorio-crud')
    md.present()
    md.onWillDismiss(data => {
      if (data != undefined) {
        this.db.handleRelatorio().add(data.payload)
      }
    })
  }

  async copyReport(relatorio: RelatorioModel, root: RelatorioModel){
    // console.log(relatorio.dataInicio)
    await relatorio.copyForRoot(relatorio, root)
    this.db.handleRelatorio().update(root)
  }

  // setFilterAno() {
  //   this.getAnos(this.relatorios)
  //   let alert = this.alert.create({
  //     title: "Ano",
  //     buttons: [
  //       {
  //         text: "Cancelar"
  //       }
  //     ]
  //   })

  //   this.anos.forEach(ano => {
  //     alert.addInput({
  //       type: "radio",
  //       value: "" + ano,
  //       label: "" + ano,
  //       handler: data => {
  //         console.log()
  //         alert.dismiss()
  //       }
  //     })
  //   })

  //   alert.present()
  // }

  // getAnos(relatorios: Array<RelatorioModel>) {
  //   this.anos = new Array<number>()
  //   relatorios.forEach(relatorio => {
  //     // if(this.have(relatorio.competencia.ano, this.anos)==false){
  //     //   this.anos.push(relatorio.competencia.ano)
  //     // }
  //     this.have(relatorio.competencia.ano, this.anos).then(res => {
  //       this.anos.push(relatorio.competencia.ano)
  //     }).catch(() => { })
  //   })
  //   console.log(this.anos)
  // }

  getItems(value) {

  }

  config(){
    this.navCtrl.push(CategoriaPage)
  }
}

