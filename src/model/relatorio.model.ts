import { ReceitaModel } from "./receita.model";
import { DespesaModel } from "./despesa.model";

export class RelatorioModel{
    key?: string
    receitas: Array<ReceitaModel>
    despesas: Array<DespesaModel>
    competencia: {mes: number, ano: number} // competencia refere-se ao mes do relatorio
    dataInicio: Date // marca o limite inicial do relatorio
    dataFim: Date // marca o limite final do relatio
    done: boolean // usado para definir se o relatorio ainda pode ser editado. Caso não possa, vincular copia
    copia?: RelatorioModel

    constructor(){
        this.competencia = {mes: 0, ano:0}
        this.receitas = new Array<ReceitaModel>()
        this.despesas = new Array<DespesaModel>()
    }

    addReceita(receita: ReceitaModel){
        this.receitas.push(receita)
    }

    addDespesa(despesa: DespesaModel){
        this.despesas.push(despesa)
    }
}