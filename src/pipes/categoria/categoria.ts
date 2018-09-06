import { Pipe, PipeTransform } from '@angular/core';
import { CategoriaConfig } from '../../configuracao/categoria.config';

@Pipe({
  name: 'categoria',
})
export class CategoriaPipe implements PipeTransform {
  
  transform(value: string, type: string) {
    // console.log(value)
    // console.log(type)
    let index: number = 0
    let categorias = new CategoriaConfig()
    categorias[type].forEach((cat,i) => {
      // console.log(cat.key+" - "+value)
      if(cat.key===value){
        // console.log("aqui")
        index = i
      }
    });
    return categorias[type][index].value;
  }
}
