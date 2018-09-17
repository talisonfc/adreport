import { HttpClient, HttpHeaders, HttpResponseBase } from "@angular/common/http"
import { RelatorioModel } from '../../model/relatorio.model';

const URL_API = "http://localhost:3000/"
const ADD_RELATORIO = "relatorio"
const DELETE_RELATORIO = "relatorio/remove/"
const SELECT_RELATORIO = "relatorio/"
const LIST = "relatorio"

const ADD_CATEGORIAS = "categoria/"
const GET_CATEGORIAS = "categoria/"

export abstract class Repository<T>{
  rep: Array<T>;
  db: any
  http: HttpClient

  constructor(repository: Array<T>, http: HttpClient) {
    this.rep = repository;
    this.http = http;
  }

  add(obj: T) {
    this.rep.push(obj)
    // this.db.push(obj)
    this.http.post(URL_API+ADD_RELATORIO,obj).subscribe(res=>{})
  }

  addCategoria(obj: Object, tipo:string){
    this.http.post(URL_API+ADD_CATEGORIAS+tipo, obj).subscribe(res=>{})
  }

  addRep(obj: T) {
    this.rep.push(obj)
  }

  remove(filename: string) {
    return this.http.get(`${URL_API}${DELETE_RELATORIO}${filename}`)
  }

  removeByIndex(index: number) {
    this.rep.splice(index, 1);
  }

  update(obj: T) {
    this.http.post(URL_API+ADD_RELATORIO, obj).subscribe(res=>{
      console.log(res)
    })
  }

  list() {
    // this.http.get(URL_API + LIST).subscribe(res => {
    //   let ar = <Array<string>>res
    //   ar.forEach(filename => {
    //     this.http.get(URL_API+SELECT+filename).subscribe(res=>{
    //       this.rep.push(<T>res)
    //     })
    //   });
    // })
    return this.rep
  }

  abstract load()

  getSnapshots() {
    return this.http.get(URL_API + LIST)
    // return new Promise((resolve, reject) => {
    //   this.db.once("value", snap => {
    //     resolve(snap.val())
    //   })
    // })
  }

  getReport(filename) {
    return this.http.get(URL_API+SELECT_RELATORIO+filename)
  }

}