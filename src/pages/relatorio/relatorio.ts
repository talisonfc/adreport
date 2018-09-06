import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { RelatorioModel } from '../../model/relatorio.model';
import { RelatorioEditPage } from '../relatorio-edit/relatorio-edit';

import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

@Component({
  selector: 'relatorio-page',
  templateUrl: 'relatorio.html'
})
export class RelatorioPage implements OnInit {

  relatorios: Array<RelatorioModel>
  anos: Array<number>

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

  edit(relatorio: RelatorioModel) {
    let md = this.modal.create('relatorio-crud', { payload: relatorio })
    md.present()
  }

  remove(relatorio: RelatorioModel, index: number) {
    var filename = `adreport-${relatorio.competencia.mes}-${relatorio.competencia.ano}.rp`
    // console.log(filename)
    // console.log(relatorio)
    this.db.handleRelatorio().remove(filename).subscribe(res => {
      this.removeByIndex(index)
    })
  }

  removeByIndex(index: number) {
    this.db.handleRelatorio().removeByIndex(index)
  }

  open(relatorio: RelatorioModel) {
    this.navCtrl.push(RelatorioEditPage, { payload: relatorio })
  }

  setFilterAno() {
    this.getAnos(this.relatorios)
    let alert = this.alert.create({
      title: "Ano",
      buttons: [
        {
          text: "Cancelar"
        }
      ]
    })

    this.anos.forEach(ano => {
      alert.addInput({
        type: "radio",
        value: "" + ano,
        label: "" + ano,
        handler: data => {
          console.log()
          alert.dismiss()
        }
      })
    })

    alert.present()
  }

  getAnos(relatorios: Array<RelatorioModel>) {
    this.anos = new Array<number>()
    relatorios.forEach(relatorio => {
      // if(this.have(relatorio.competencia.ano, this.anos)==false){
      //   this.anos.push(relatorio.competencia.ano)
      // }
      this.have(relatorio.competencia.ano, this.anos).then(res => {
        this.anos.push(relatorio.competencia.ano)
      }).catch(() => { })
    })
    console.log(this.anos)
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
    // console.log(anos)
    // anos.forEach(anot=>{
    //   if(anot==ano){
    //     return true
    //   }
    // })
    // return false
  }

  getItems(value) {

  }

  generateFullReport(relatorio: RelatorioModel) {
    // let rowHeader = [{text: 'Data', bold: true}, {text: 'Origem', bold: true}, {text: 'Descrição', bold: true}, {text: 'Valor', bold: true}]

    // Receita
    let dizimos = []
    let ofertas = []
    let ofertasMissionaria = []

    dizimos.push([{text: 'Data', bold: true}, {text: 'Origem', bold: true}, {text: 'Descrição', bold: true}, {text: 'Valor', bold: true}])
    ofertas.push([{text: 'Data', bold: true}, {text: 'Origem', bold: true}, {text: 'Descrição', bold: true}, {text: 'Valor', bold: true}])
    ofertasMissionaria.push([{text: 'Data', bold: true}, {text: 'Origem', bold: true}, {text: 'Descrição', bold: true}, {text: 'Valor', bold: true}])

    let receitasDizimo = relatorio.receitas.filter(receita=>{return receita.categoria=='dizimo'})
    let receitasOferta = relatorio.receitas.filter(receita=>{return receita.categoria=='oferta'})
    let receitasOfertaMissionaria = relatorio.receitas.filter(receita=>{return receita.categoria=='oferta_missionaria'})
    

    receitasDizimo.forEach(receita=>{
      var temp = [receita.data, receita.autor, receita.descricao, receita.valor]
      dizimos.push(temp)
    })

    receitasOferta.forEach(receita=>{
      var temp = [receita.data, receita.autor, receita.descricao, receita.valor]
      ofertas.push(temp)
    })

    receitasOfertaMissionaria.forEach(receita=>{
      var temp = [receita.data, receita.autor, receita.descricao, receita.valor]
      ofertasMissionaria.push(temp)
    })

    // Despesa
    let imoveis = []
    let administrativas = []
    let saude = []

    imoveis.push([{text: 'Data', bold: true}, {text: 'Origem', bold: true}, {text: 'Descrição', bold: true}, {text: 'Valor', bold: true}])
    administrativas.push([{text: 'Data', bold: true}, {text: 'Origem', bold: true}, {text: 'Descrição', bold: true}, {text: 'Valor', bold: true}])
    saude.push([{text: 'Data', bold: true}, {text: 'Origem', bold: true}, {text: 'Descrição', bold: true}, {text: 'Valor', bold: true}])

    let despesasImovel = relatorio.despesas.filter(desp=>{return desp.categoria=="imoveis"})
    let despesasAdministrativa = relatorio.despesas.filter(desp=>{return desp.categoria=="administrativas"})
    let despesasSaude = relatorio.despesas.filter(desp=>{return desp.categoria=="saude"})

    despesasImovel.forEach(desp=>{
      var temp = [desp.data, desp.autor, desp.descricao, desp.valor]
      imoveis.push(temp)
    })

    despesasAdministrativa.forEach(desp=>{
      var temp = [desp.data, desp.autor, desp.descricao, desp.valor]
      administrativas.push(temp)
    })

    despesasSaude.forEach(desp=>{
      var temp = [desp.data, desp.autor, desp.descricao, desp.valor]
      saude.push(temp)
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
          text: "Relatório Analítico AD Sousa",
          fontSize: 20,
          alignment: 'center'
        },
        {
          text: 'Receita',
          style: 'h1'
        },
        {
          text: 'Dízimo',
          style: 'h3'
        },
        {
          table: {
            widths: ['auto',100,'*',100],
            body: dizimos
          }
        },
        {
          text: 'Ofertas',
          style: 'h3'
        },
        {
          table: {
            widths: ['auto',100,'*',100],
            body: ofertas
          }
        },
        {
          text: 'Ofertas Missionária',
          style: 'h3'
        },
        {
          table: {
            widths: ['auto',100,'*',100],
            body: ofertasMissionaria
          }
        },
        {
          text: 'Despesa',
          style: 'h1'
        },
        {
          text: 'Imóvel',
          style: 'h3'
        },
        {
          table: {
            widths: ['auto',100,'*',100],
            body: imoveis
          }
        },
        {
          text: 'Administrativas',
          style: 'h3'
        },
        {
          table: {
            widths: ['auto',100,'*',100],
            body: administrativas
          }
        },
        {
          text: 'Saúde',
          style: 'h3'
        },
        {
          table: {
            widths: ['auto',100,'*',100],
            body: saude
          }
        },
      ]
    }
    // console.log(relatorio)
    pdfMake.createPdf(body).download(`relatorio-expandido-${relatorio.competencia.mes + 1}-${relatorio.competencia.ano}.pdf`)
  }

  generateSimpleReport(relatorio: RelatorioModel) {
    let resumo = []

    // Receita
    let totalDizimo: number = 0
    let totalOferta: number = 0
    let totalOfertaMissionaria: number = 0
    
    let receitasDizimo = relatorio.receitas.filter(receita=>{return receita.categoria=='dizimo'})
    let receitasOferta = relatorio.receitas.filter(receita=>{return receita.categoria=='oferta'})
    let receitasOfertaMissionaria = relatorio.receitas.filter(receita=>{return receita.categoria=='oferta_missionaria'})
    

    receitasDizimo.forEach(receita=>{
      totalDizimo += receita.valor
    })

    receitasOferta.forEach(receita=>{
      totalOferta += receita.valor
    })

    receitasOfertaMissionaria.forEach(receita=>{
      totalOfertaMissionaria += receita.valor
    })

    resumo.push(['Dízimo',totalDizimo])
    resumo.push(['Oferta',totalOferta])
    resumo.push(['Oferta Missionária',totalOfertaMissionaria])

    // Despesa
    let despesasImovel = relatorio.despesas.filter(desp=>{return desp.categoria=="imoveis"})
    let despesasAdministrativa = relatorio.despesas.filter(desp=>{return desp.categoria=="administrativas"})
    let despesasSaude = relatorio.despesas.filter(desp=>{return desp.categoria=="saude"})

    let totalImovel: number = 0
    let totalAdministrativo: number = 0
    let totalSaude: number = 0

    despesasImovel.forEach(desp=>{
      totalImovel += desp.valor
    })

    despesasAdministrativa.forEach(desp=>{
      totalAdministrativo += desp.valor
    })

    despesasSaude.forEach(desp=>{
      totalSaude += desp.valor
    })

    resumo.push(['Imovel', ''+totalImovel])
    resumo.push(['Administrativo', ''+totalAdministrativo])
    resumo.push(['Saúde', ''+totalSaude])

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
          text: 'Resumo',
          style: 'h1'
        },
        {
          table: {
            widths: ['*',100],
            body: resumo
          }
        }
      ]
    }
    pdfMake.createPdf(body).download(`relatorio-resumido-${relatorio.competencia.mes}-${relatorio.competencia.ano}.pdf`)
  }
}

