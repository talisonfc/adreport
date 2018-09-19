import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RelatorioModel } from '../../model/relatorio.model';
import { QuestionBase } from '../../dynamic-form/question-base';
import { TextboxQuestion } from '../../dynamic-form/question-textbox';
import { DropdownQuestion } from '../../dynamic-form/question-dropdown';
import { FormGroup, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';


@IonicPage({ name: "relatorio-crud" })
@Component({
  selector: 'page-relatorio-crud',
  templateUrl: 'relatorio-crud.html',
})
export class RelatorioCrudPage implements OnInit {

  relatorio: RelatorioModel
  questionsRelatorio: QuestionBase<any>[]
  competenciaList: Array<string>
  mes: number

  // form = new FormGroup({
  //   competencia : new FormControl(),
  //   dataInicio : new FormControl(),
  //   dataFim : new FormControl()
  // })
  form: any

  constructor(
    private fb: FormBuilder,
    public view: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
    this.questionsRelatorio = new Array<QuestionBase<any>>()
  }

  ngOnInit() {
    this.relatorio = this.navParams.get("payload")
    if (this.relatorio == undefined) {
      this.relatorio = new RelatorioModel()
      this.form = this.fb.group({
        competencia : ['', Validators.required],
        dataInicio : ['', Validators.required],
        dataFim : ['', Validators.required]
      })
    }
    else{
      this.form = this.fb.group({
        competencia : [this.relatorio.competencia.mes, Validators.required],
        dataInicio : [this.relatorio.dataInicio, Validators.required],
        dataFim : [this.relatorio.dataFim, Validators.required]
      })
    }

    this.competenciaList = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ]

    let temp = new Date()
    this.mes = temp.getMonth()-1
  }

  close() {
    this.view.dismiss()
  }

  submit(){
    this.relatorio.competencia.mes = this.form.value['competencia']
    this.relatorio.competencia.ano = Number(this.form.value['dataInicio'].split('-')[0])
    this.relatorio.dataInicio = this.form.value['dataInicio']
    this.relatorio.dataFim = this.form.value['dataFim']
    // console.log(this.relatorio)
    this.view.dismiss({payload: this.relatorio})
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
