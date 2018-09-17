import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from "@angular/common/http"
import { BrMaskerModule } from 'brmasker-ionic-3'

import { RelatorioPage } from '../pages/relatorio/relatorio';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';

import { DynamicFormModule } from '../dynamic-form/dynamic-form.module'
import { RelatorioEditPage } from '../pages/relatorio-edit/relatorio-edit';
import { PipesModule } from '../pipes/pipes.module';
import { ReceitaPage } from '../pages/receita/receita';
import { DespesaPage } from '../pages/despesa/despesa';
import { CategoriaConfig } from '../configuracao/categoria.config';

import { PdfViewerModule } from 'ng2-pdf-viewer'
import { CategoriaPage } from '../pages/categoria/categoria';

@NgModule({
  declarations: [
    MyApp,
    RelatorioPage,
    RelatorioEditPage,
    ReceitaPage,
    DespesaPage,
    CategoriaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DynamicFormModule,
    PipesModule,
    HttpClientModule,
    BrMaskerModule,
    PdfViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RelatorioPage,
    RelatorioEditPage,
    ReceitaPage,
    DespesaPage,
    CategoriaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    CategoriaConfig
  ]
})
export class AppModule {}
