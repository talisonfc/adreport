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

app.get("/relatorio/:filename", controller.select)
app.post("/relatorio", controller.add)
app.get("/relatorio", controller.list)
app.get("/relatorio/remove/:filename", controller.remove)

app.listen(3000, function(){
	console.log("Servidor iniciado na porta 3000")
})