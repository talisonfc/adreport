import { NgModule } from '@angular/core';
import { ReportlinecontrollersComponent } from './reportlinecontrollers/reportlinecontrollers';
import { IonicModule } from 'ionic-angular'
import { PipesModule } from '../pipes/pipes.module'

@NgModule({
	declarations: [ReportlinecontrollersComponent],
	imports: [
		IonicModule,
		PipesModule
	],
	exports: [ReportlinecontrollersComponent]
})
export class ComponentsModule {}
