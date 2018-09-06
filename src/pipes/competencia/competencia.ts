import { Pipe, PipeTransform, OnInit } from '@angular/core';

@Pipe({
  name: 'competencia',
})
export class CompetenciaPipe implements PipeTransform {
  calendario: Map<number, string>

  transform(value: number, ...args) {
    this.calendario = new Map<number, string>()
    this.calendario.set(0, 'Janeiro')
    this.calendario.set(1, 'Fevereiro')
    this.calendario.set(2, 'Março')
    this.calendario.set(3, 'Abril')
    this.calendario.set(4, 'Maio')
    this.calendario.set(5, 'Junho')
    this.calendario.set(6, 'Julho')
    this.calendario.set(7, 'Agosto')
    this.calendario.set(8, 'Setembro')
    this.calendario.set(9, 'Outubro')
    this.calendario.set(10, 'Novembro')
    this.calendario.set(11, 'Dezembro')
    return this.calendario.get(value);
    // return '10'
  }
}
