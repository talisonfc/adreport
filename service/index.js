var express = require("express")
//var database = require("./dbconfig")
var bodyParse = require("body-parser")

var app = express()

app.use(bodyParse())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var controller = require("./controller")

app.post("/relatorio", controller.addRelatorio)
app.get("/relatorio/:filename", controller.getRelatorio)

app.post("/categoria/entrada", controller.addCategoriaEntrada)
app.post("/categoria/saida", controller.addCategoriaSaida)
app.get("/categoria/entrada", controller.getCategoriaEntrada)
app.get("/categoria/saida", controller.getCategoriaSaida)

app.get("/relatorio", controller.listRelatorios)
app.get("/relatorio/remove/:filename", controller.removeRelatorio)

app.listen(3000, function(){
	console.log("Servidor iniciado na porta 3000")
})