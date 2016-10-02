var http = require('http'),
	modulo = require('./modulo.js'),
	mongo = require('mongodb'),
	url = '';
	jsonText = '';

var server = http.createServer(function(request, response){

	response.writeHead(200, {"Content-Type" : "text/html"});
	url = (request.url.split("/"));
	if(url[1] == ''){
		response.write("<h1>Oi, tudo bem contigo? :)</h1>");
		response.write("<h2>--- Tutorial Sistema ---</h2>");
		response.write("<h2>Para adicionar:" + 
						"<br/>- Digite na URL:" + 
						"<br/>- localhost:3000/add/" +
						"<br/>- Depois de add/ digite o nome que queira inserir no banco" +
						"<br/>- Ex.: localhost:3000/add/Nome" +
						"<br/>- Aperte enter" +
						"<br/>- OBS: localhost e em maquina local, caso esteja acessando de um endereco de ip, digite o ip:3000..." +
						"</h2>");
		response.write("<h2>Para remover:" + 
						"<br/>- Digite na URL:" + 
						"<br/>- localhost:3000/remove/" +
						"<br/>- Depois de add/ digite o nome que queira inserir no banco" +
						"<br/>- Ex.: localhost:3000/remove/Nome" +
						"<br/>- Aperte enter" +
						"<br/>- OBS: localhost e em maquina local, caso esteja acessando de um endereco de ip, digite o ip:3000..." +
						"</h2>");
		response.write("<h2>Para listar:" + 
						"<br/>- Clique no link abaixo:" +
						"<br/><a href='http://localhost:3000/find'>Listar Objetos</a>" +
						"</h2>");
		response.end();
	}else if(url[1] == 'add'){
		if(url[2] != null){
			jsonText = {Title: url[2]};
			modulo.add(response, jsonText);
		}else{
			response.write("<h2>Sabe que ta vazio, ne? Poxa, me ajude!</h2>");
			response.end();
		}
	}else if(url[1] == 'remove'){
		if(url[2] != null){
			jsonText = {Title: url[2]};
			modulo.remove(response, jsonText);
		}else{
			response.write("<h2>Sabe que ta vazio, ne? Poxa, me ajude!</h2>");
			response.end();
		}
	}else if(url[1] == 'find'){
		modulo.find(response);
	}

});

server.listen(3000, function(){
	console.log('Servidor Hello World rodando!');
});