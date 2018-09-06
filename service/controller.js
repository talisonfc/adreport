
var fs = require("fs")

const format = ".rp"

exports.add = function(req, res){
	const relatorio = req.body || null

	if(relatorio==null){
		res.status(400).end()
	}
	else{
		const filename = "adreport-"+relatorio['competencia']['mes']+"-"+relatorio['competencia']['ano']
		//console.log(filename)
		fs.writeFile("./relatorios/"+filename+format, JSON.stringify(req.body), function(err,sucess){
			if(err){
				res.end(err)
			}
			else{
				res.json({filename: filename+format})
			}
		})
	}
}

exports.remove = function(req, res){
	const filename = req.params.filename || null
	//console.log(filename)
	if(filename==null){
		res.status(400).end()
	}
	else{
		fs.unlink("./relatorios/"+filename, function(err, sucess){
			if(err){
				res.status(400).end()			
			}
			else{
				res.status(200).end()
			}
		})
	}
}

exports.list = function(req, res){
	fs.readdir("./relatorios", function(err, files){
		if(err){
			res.status(400).end()
		}
		else{
			//console.log(files)
			res.status(200).json(files)
		}
	})
}

exports.select = function(req, res){
	const filename = req.params.filename || null
	//console.log(filename)

	if(filename==null){ // retornar todos os relatorios
		res.status(400).end()
	}
	else{ // retornar apenas o relatorio referenciado pelo id
		fs.readFile("./relatorios/"+filename, function(err, data){
			if(err){
				res.status(400).end()
			}
			else{
				res.status(200).json(JSON.parse(data))
			}
		})
	}
}

