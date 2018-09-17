import { Injectable } from '@angular/core';
import { Repository } from './repository.abstract';
import { RelatorioModel } from '../../model/relatorio.model';
import { ReceitaModel } from '../../model/receita.model';
import { DespesaModel } from '../../model/despesa.model';
import { HttpClient } from '@angular/common/http';
import { AdaperReportRepository } from './adapter-report-repository';
import { CategoriaModel } from '../../configuracao/categoria.model';
import { CONTENT_ATTR } from '@angular/platform-browser/src/dom/dom_renderer';

@Injectable()
export class DatabaseProvider{


  reportRepository: AdaperReportRepository

  constructor(public http: HttpClient) {
    // super(new Array<RelatorioModel>())
    // super.setHttp(http)
    // this.load()

    this.reportRepository = new AdaperReportRepository(new Array<RelatorioModel>(), http)
  }

  handleRelatorio(): any {
    return this.reportRepository;
  }

  load() {
    // super.getSnapshots().then(res => {
    //   // console.log(res)
    //   if (res != undefined) {
    //     let keys = Object.keys(res)
    //     keys.forEach(key => {
    //       let relatorio = new RelatorioModel
    //       relatorio.key = key
    //       relatorio.competencia = res[key]['competencia']
    //       relatorio.dataInicio = res[key]['dataInicio']
    //       relatorio.dataFim = res[key]['dataFim']
    //       if(res[key]['receitas']){
    //         relatorio.receitas = this.daoReceitas(res[key]['receitas'])
    //       }
    //       if(res[key]['despesas']){
    //         relatorio.despesas = this.daoDespesas(res[key]['despesas'])
    //       }
    //       super.addRep(<RelatorioModel>relatorio)
    //     })
    //   }

    // })
  }

  daoReceitas(value:Array<any>): Array<ReceitaModel>{
    let receitas = new Array<ReceitaModel>()
    value.forEach(item=>{
      let receita = this.copy(item, new ReceitaModel())
      receitas.push(receita)
    })
    return receitas
  }

  daoDespesas(value:Array<any>): Array<DespesaModel>{
    let despesas = new Array<DespesaModel>()
    value.forEach(item=>{
      let despesa = this.copy(item, new DespesaModel())
      despesas.push(despesa)
    })
    return despesas
  }

  copy(value, instancia){
    let obj = instancia
    let keys = Object.keys(value)
    keys.forEach(key=>{
      obj[key] = value[key]
    })
    return obj
  }

  getCategoria(tipo: string){
    return new Promise((resolve,reject)=>{
      let temp: Array<CategoriaModel> = new Array<CategoriaModel>()
      this.http.get<Array<CategoriaModel>>("http://localhost:3000/categoria/"+tipo).subscribe(res=>{
        if(res instanceof Array){
          res.forEach(element => {
            let cat = new CategoriaModel()
            cat.key = element.key
            cat.value = element.value
            if(element.subcategoria!=undefined){
              element.subcategoria.forEach(catt=>{
                let subcat = new CategoriaModel()
                subcat.key = catt.key
                subcat.value = catt.value
                

                if(catt.subcategoria){
                  catt.subcategoria.forEach(cattt=>{
                    let subcatt = new CategoriaModel();
                    subcatt.key = cattt['key']
                    subcatt.value = cattt['value']

                    if(subcat.subcategoria == undefined) subcat.subcategoria = new Array<CategoriaModel>()
                    subcat.subcategoria.push(subcatt)
                  })
                }

                if(cat.subcategoria==undefined) cat.subcategoria = new Array<CategoriaModel>()
                cat.subcategoria.push(subcat)
              })
            }
            temp.push(cat)
          })
          resolve(temp) 
        }
        else{
          let cat = new CategoriaModel()
          cat.key = res['key']
          cat.value = res['value']
          if(res['subcategoria']!=undefined){
            res['subcategoria'].forEach(catt=>{
              let subcat = new CategoriaModel()
              subcat.key = catt.key
              subcat.value = catt.value

              if(catt.subcategoria){
                catt.subcategoria.forEach(cattt=>{
                  let subcatt = new CategoriaModel();
                  subcatt.key = cattt['key']
                  subcatt.value = cattt['value']

                  if(subcat.subcategoria == undefined) subcat.subcategoria = new Array<CategoriaModel>()
                  subcat.subcategoria.push(subcatt)
                })
              }
              
              if(cat.subcategoria==undefined) cat.subcategoria = new Array<CategoriaModel>()
              cat.subcategoria.push(subcat)
            })
          }
          temp.push(cat)
          resolve(temp)
        }
      })
    })
  }
}
