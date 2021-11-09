//importar módulo server.js (config)
var server = require('./config/server')

//criar a variavel para o valor de app (server)
var app = server.app

//criar a variavél para o valor de porta (server)
var porta = server.porta

//executar o servidor
app.listen(porta)