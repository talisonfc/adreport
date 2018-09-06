var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema
var relatorioSchema = new Schema({
	key: String,
	competencia: {mes: Number, ano: Number},
	dataInicio: Date,
	dataFim: Date,
	receitas: [{data: Date, valor: Number, descricao: String, categoria: String, autor: String}],
	despesas: [{data: Date, valor: Number, descricao: String, categoria: String, autor: String}]
})

// Model
exports.Relatorio = mongoose.model("Relatorio", relatorioSchema)
