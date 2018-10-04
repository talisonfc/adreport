import { Repository } from "./repository.abstract";
import { RelatorioModel } from "../../model/relatorio.model";
import { ReceitaModel } from "../../model/receita.model";
import { DespesaModel } from "../../model/despesa.model";
import { HttpClient } from "@angular/common/http";

export class AdaperReportRepository extends Repository<RelatorioModel>{

    constructor(ar: Array<RelatorioModel>, http: HttpClient) {
        super(ar, http)
        this.load()
    }

    load() {
        this.getSnapshots().subscribe(res => {
            let ar = <Array<string>>res
            ar.forEach(filename => {
                this.getReport(filename).subscribe(res => {
                    let relatorio = new RelatorioModel()
                    relatorio.key = res['key'] || undefined
                    relatorio.competencia = res['competencia']
                    relatorio.dataInicio = res['dataInicio']
                    relatorio.dataFim = res['dataFim']
                    relatorio.done = res['done']
                    if (res['receitas']) {
                        relatorio.receitas = this.daoReceitas(res['receitas'])
                    }
                    if (res['despesas']) {
                        relatorio.despesas = this.daoDespesas(res['despesas'])
                    }
                    if (res['copias']) {
                        res['copias'].forEach(relatorioCopia => {
                            let temp = new RelatorioModel()
                            temp.key = relatorioCopia['key'] || undefined
                            temp.competencia = relatorioCopia['competencia']
                            temp.dataInicio = relatorioCopia['dataInicio']
                            temp.dataFim = relatorioCopia['dataFim']
                            temp.done = relatorioCopia['done']
                            if (relatorioCopia['receitas']) {
                                temp.receitas = this.daoReceitas(relatorioCopia['receitas'])
                            }
                            if (relatorioCopia['despesas']) {
                                temp.despesas = this.daoDespesas(relatorioCopia['despesas'])
                            }
                            relatorio.copias.push(temp)
                        })
                    }
                    super.addRep(<RelatorioModel>relatorio)
                })
            });

        })
    }

    daoReceitas(value: Array<any>): Array<ReceitaModel> {
        let receitas = new Array<ReceitaModel>()
        value.forEach(item => {
            let receita = this.copy(item, new ReceitaModel())
            receitas.push(receita)
        })
        return receitas
    }

    daoDespesas(value: Array<any>): Array<DespesaModel> {
        let despesas = new Array<DespesaModel>()
        value.forEach(item => {
            let despesa = this.copy(item, new DespesaModel())
            despesas.push(despesa)
        })
        return despesas
    }

    copy(value, instancia) {
        let obj = instancia
        let keys = Object.keys(value)
        keys.forEach(key => {
            obj[key] = value[key]
        })
        return obj
    }
}