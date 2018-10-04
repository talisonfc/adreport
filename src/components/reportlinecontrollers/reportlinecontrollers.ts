import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { ModalController, AlertController, NavController } from 'ionic-angular';

import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { RelatorioModel } from '../../model/relatorio.model';
import { RelatorioEditPage } from '../../pages/relatorio-edit/relatorio-edit';
import { Categoria } from '../../configuracao/categoria';
import { ReceitaModel } from '../../model/receita.model';

@Component({
  selector: 'reportlinecontrollers',
  templateUrl: 'reportlinecontrollers.html'
})
export class ReportlinecontrollersComponent implements OnInit {

  @Input() relatorio: RelatorioModel
  @Input() root: RelatorioModel
  @Output() onCopyReport = new EventEmitter<{}>()
  categoria: any

  constructor(
    private db: DatabaseProvider,
    public modal: ModalController,
    public alert: AlertController,
    public navCtrl: NavController) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
  }

  ngOnInit() {
    this.categoria = Categoria
  }

  edit(relatorio: RelatorioModel) {
    let md = this.modal.create('relatorio-crud', { payload: relatorio })
    md.onWillDismiss(data => {
      if (data != undefined) {
        // this.db.handleRelatorio().update(data.payload)
        this.update()
      }
    })
    md.present()
  }

  async remove(relatorio: RelatorioModel, index: number) {
    var filename = `adreport-${relatorio.competencia.mes}-${relatorio.competencia.ano}.rp`
    if(this.root!=undefined){
      await this.root.copias.forEach((rep,k)=>{
        if(rep.key==relatorio.key){
          this.root.copias.splice(k,1)
          this.update()
          return
        }
      })
    }
    else{
      this.db.handleRelatorio().remove(filename).subscribe(res => {
        this.removeByIndex(index)
      })
    }
  }

  removeByIndex(index: number) {
    this.db.handleRelatorio().removeByIndex(index)
  }

  closeReport(relatorio) {
    relatorio.done = true;
    // this.db.handleRelatorio().update(relatorio)
    this.update()
  }

  copyReport(relatorio: RelatorioModel) {
    this.onCopyReport.emit({})
  }

  open(relatorio: RelatorioModel) {
    this.navCtrl.push(RelatorioEditPage, { payload: relatorio, root: this.root })
  }

  have(ano: number, anos: Array<number>) {
    return new Promise((resolve, reject) => {
      anos.forEach(anot => {
        if (anot === ano) {
          resolve()
        }
      })
      reject({})
    })
  }

  update(){
    if(this.root){
      this.db.handleRelatorio().update(this.root)  
    }
    else{
      this.db.handleRelatorio().update(this.relatorio)
    }
  }

  generateFullReport(relatorio: RelatorioModel) {
    var body = {
      styles: {
        h1: {
          fontSize: 18,
          marginLeft: 5,
          marginTop: 10,
          alignment: 'center'
        },
        h2: {
          fontSize: 16,
          marginLeft: 5,
          marginTop: 10,
          alignment: 'center'
        },
        h3: {
          fontSize: 14,
          margin: 5
        },
        p: {
          fontSize: 12,
          bold: true
        },
      },
      content: []
    }

    body.content.push({
      text: "Controle Financeiro",
      style: 'h1'
    })

    // ENTRADAS
    this.categoria.entrada.forEach(cat => {
      let dados = []
      dados.push([{ text: 'Data', bold: true }, { text: 'Origem', bold: true }, { text: 'Descrição', bold: true }, { text: 'Valor', bold: true }])

      let inputs = relatorio.receitas.filter(receita => {
        // console.log(cat.key + " " + receita.categoria)
        return receita.categoria == cat.key
      })
      // console.log(inputs)
      inputs.forEach(input => {
        var temp = [input.data, input.autor, input.descricao, input.valor]
        dados.push(temp)
      })

      body.content.push({
        text: cat.value,
        style: 'h3'
      })
      body.content.push({
        table: {
          widths: ['auto', 100, '*', 100],
          body: dados
        }
      })
    })

    // body.content.push({
    //   text: "Despesas",
    //   style: 'h1'
    // })

    // SAIDAS
    this.categoria.saida.forEach(cat => {
      body.content.push({
        text: cat.value,
        style: 'h2'
      })

      let inputs = relatorio.despesas.filter(despesa => {
        return despesa.categoria.key == cat.key
      })

      cat.subcategoria.forEach(subcat => {

        let dados = new Array<any>()
        dados.push([{ text: 'Data', bold: true }, { text: 'Origem', bold: true }, { text: 'Descrição', bold: true }, { text: 'Valor', bold: true }])

        let item = inputs.filter(despesa => {
          return despesa.categoria.subcategoria[0].key == subcat.key
        })

        item.forEach(input => {
          var temp = [input.data, input.autor, input.descricao, input.valor]
          dados.push(temp)
        })

        body.content.push({
          text: subcat.value,
          style: 'h3'
        })
        body.content.push({
          table: {
            widths: ['auto', 100, '*', 100],
            body: dados
          }
        })
        dados = new Array<any>()
      })
    })

    pdfMake.createPdf(body).download(`relatorio-expandido-${relatorio.competencia.mes + 1}-${relatorio.competencia.ano}.pdf`)
  }

  generateSimpleReport(relatorio: RelatorioModel) {
    let resumo = []
    
    // ENTRADAS
    this.categoria.entrada.forEach(cat => {
      let total = 0

      let inputs = relatorio.receitas.filter(receita => {
        return receita.categoria == cat.key
      })
      // console.log(inputs)
      inputs.forEach(input => {
        total += Number(input.valor)
      })

      resumo.push([cat.value, total])
    })

    var body = {
      styles: {
        h1: {
          fontSize: 18,
          marginLeft: 5,
          marginTop: 10
        },
        h2: {
          fontSize: 16
        },
        h3: {
          fontSize: 14,
          margin: 5
        },
        p: {
          fontSize: 12,
          bold: true
        },
      },
      content: [
        {
          text: "Relatório Resumido AD Sousa",
          fontSize: 20,
          alignment: 'center'
        },
        {
          text: "Dízimos e Ofertas",
          style: 'h3'
        },
        {
          table: {
            widths: ['*', 100],
            body: resumo
          }
        }
      ]
    }

    resumo = new Array<any>()
    // SAIDAS
    this.categoria.saida.forEach(cat => {
      let inputs = relatorio.despesas.filter(despesa => {
        return despesa.categoria.key == cat.key
      })

      body.content.push({
        text: cat.value,
        style: 'h3'
      })

      cat.subcategoria.forEach(subcat=>{
        let itens = inputs.filter(item=>{
          return item.categoria.subcategoria[0].key == subcat.key
        })

        let total = 0;
        itens.forEach(item=>{
          total += Number(item.valor)
        })

        resumo.push([subcat.value, total])
      })

      body.content.push({
        table: {
          widths: ['*', 100],
          body: resumo
        }
      })
      resumo = new Array<any>()
    })

    

    pdfMake.createPdf(body).download(`relatorio-resumido-${relatorio.competencia.mes}-${relatorio.competencia.ano}.pdf`)
  }
}
