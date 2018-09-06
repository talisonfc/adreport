import { database } from 'firebase'
import { HttpClient, HttpHeaders, HttpResponseBase } from "@angular/common/http"
import { RelatorioModel } from '../../model/relatorio.model';

const URL_API = "http://localhost:3000/"
const ADD = "relatorio"
const DELETE = "relatorio/remove/"
const SELECT = "relatorio/"
const LIST = "relatorio"

export abstract class Repository<T>{
  rep: Array<T>;
  db: any
  http: HttpClient

  constructor(repository: Array<T>, http: HttpClient) {
    this.rep = repository;
    this.db = database().ref("relatorios")
    this.http = http;
  }

  add(obj: T) {
    this.rep.push(obj)
    // this.db.push(obj)
    this.http.post(URL_API+ADD,obj).subscribe(res=>{})
  }

  addRep(obj: T) {
    this.rep.push(obj)
  }

  remove(filename: string) {
    return this.http.get(`${URL_API}${DELETE}${filename}`)
  }

  removeByIndex(index: number) {
    this.rep.splice(index, 1);
  }

  update(obj: T) {
    this.http.post(URL_API+ADD, obj).subscribe(res=>{
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
    return this.http.get(URL_API+SELECT+filename)
  }
}