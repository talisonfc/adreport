// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms'

// import { QuestionBase } from './question-base'
// import { TextboxQuestion } from './question-textbox'
// import { DropdownQuestion } from './question-dropdown'

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component'
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component'
import { QuestionControlService } from './question-control.service'

@NgModule({
    declarations: [
        DynamicFormComponent,
        DynamicFormQuestionComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule
    ],
    exports: [
        DynamicFormComponent,
        DynamicFormQuestionComponent
    ],
    providers: [QuestionControlService]
})
export class DynamicFormModule{

}