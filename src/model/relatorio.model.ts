import { ReceitaModel } from "./receita.model";
import { DespesaModel } from "./despesa.model";
import { MovimentacaoModel } from "./movimentacao.model";

export class RelatorioModel{
    key?: string
    receitas: Array<ReceitaModel>
    despesas: Array<DespesaModel>
    competencia: {mes: number, ano: number, copy?: boolean} // competencia refere-se ao mes do relatorio
    dataInicio: Date // marca o limite inicial do relatorio
    dataFim: Date // marca o limite final do relatio
    done: boolean // usado para definir se o relatorio ainda pode ser editado. Caso não possa, vincular copia
    copias?: Array<RelatorioModel>

    constructor(){
        this.competencia = {mes: 0, ano:0}
        this.receitas = new Array<ReceitaModel>()
        this.despesas = new Array<DespesaModel>()
        this.copias = new Array<RelatorioModel>()
    }

    addReceita(receita: ReceitaModel){
        this.receitas.push(receita)
    }

    addDespesa(despesa: DespesaModel){
        this.despesas.push(despesa)
    }

    async copyForRoot(relatorio: RelatorioModel, root: RelatorioModel){
        let temp = await this.copyRelatorio(relatorio)
        temp.key = ""+root.copias.length
        root.copias.push(temp)
    }

    async copyRelatorio(relatorio: RelatorioModel){
        let temp = new RelatorioModel()
        // copy receita
        // console.log('copiando receitas')
        await relatorio.receitas.forEach(receita=>{
            relatorio.copyReceita(receita).then(res=>{
                // console.log(res)
                temp.receitas.push(<ReceitaModel>res)
            })
        })
        // copy despesa
        // console.log('copiando despesas')
        await relatorio.despesas.forEach(despesa=>{
            relatorio.copyDespesa(despesa).then(res=>{
                // console.log(res)
                temp.despesas.push(<DespesaModel>res)
            })
        })
        Object.assign(temp.competencia, relatorio.competencia)
        temp.dataInicio = relatorio.dataInicio
        temp.dataFim = relatorio.dataFim
        temp.done = false;
        temp.competencia.copy = true;
        return temp
    }

    copyReceita(input: ReceitaModel){
        return new Promise((resolve, reject)=>{
            let temp = new ReceitaModel()
            temp.data = input.data
            temp.valor = input.valor
            temp.descricao = input.descricao
            temp.categoria = input.categoria
            temp.autor = input.autor
            resolve(temp)
        })
    }

    copyDespesa(input: DespesaModel){
        return new Promise((resolve, reject)=>{
            let temp = new DespesaModel()
            temp.data = input.data
            temp.valor = input.valor
            temp.descricao = input.descricao
            Object.assign(temp.categoria, input.categoria)
            temp.autor = input.autor
            resolve(temp)
        })
    }
}