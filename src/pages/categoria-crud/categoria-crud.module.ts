import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaCrudPage } from './categoria-crud';

@NgModule({
  declarations: [
    CategoriaCrudPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaCrudPage),
  ],
})
export class CategoriaCrudPageModule {}
