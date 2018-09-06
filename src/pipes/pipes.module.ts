import { NgModule } from '@angular/core';
import { CompetenciaPipe } from './competencia/competencia';
import { HojePipe } from './hoje/hoje';
import { MoneyPipe } from './money/money';
import { DatebrPipe } from './datebr/datebr';
import { CategoriaPipe } from './categoria/categoria';
@NgModule({
	declarations: [CompetenciaPipe,
    HojePipe,
    HojePipe,
    MoneyPipe,
    DatebrPipe,
    CategoriaPipe],
	imports: [],
	exports: [CompetenciaPipe,
    HojePipe,
    HojePipe,
    MoneyPipe,
    DatebrPipe,
    CategoriaPipe]
})
export class PipesModule {}
