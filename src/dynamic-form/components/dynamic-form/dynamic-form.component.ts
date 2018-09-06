import { Component, Input, Output, EventEmitter, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
 
import { QuestionBase }              from '../../question-base';
import { QuestionControlService }    from '../../question-control.service';
import { ToastController } from 'ionic-angular';
 
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
 
  @Input() questions: QuestionBase<any>[] = [];
  @Input() objeto: any
  form: FormGroup;
  // payLoad = '';
 
  constructor(private toastControll: ToastController,
    private qcs: QuestionControlService) {  }
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
 
  onSubmit() {
    // this.payLoad = this.form.value;
    this.copy(this.form.value,this.objeto)
    let toast = this.toastControll.create({
      message: "Dados salvo com sucesso!",
      duration: 2000
    })
    toast.present()
  }

  copy(payload, dest): void{
    Object.keys(payload).forEach(key=>{
      dest[key] = payload[key]
    })
  }
}