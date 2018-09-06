import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelatorioCrudPage } from './relatorio-crud';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form.module'

@NgModule({
  declarations: [
    RelatorioCrudPage,
  ],
  imports: [
    IonicPageModule.forChild(RelatorioCrudPage),
    DynamicFormModule
  ],
})
export class RelatorioCrudPageModule {}
