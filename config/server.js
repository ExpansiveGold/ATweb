// importando o módulo express
var express = require('express')
// executando o express
var app = express()

// importando o módulo consign (autoloader) carregar automaticamente o conteúdo de uma ou mais pastas
var consign = require('consign')

//configurar o ejs como render e definir o caminho das views (são os arquivos html/ejs com conteúdos)
app.set('view engine','ejs')
app.set('views','./web/views')

//configurar o caminho das pastas css, images, etc (public)
app.use(express.static('./web/assets'))

//configurar o express para transportar os dados dos formulários
app.use(express.urlencoded({extended: true}))

//definir a porta do servidor
var porta = 1313

// configurar as pastas para o carregamento automático
consign().include('./web/routes').into(app)

//exportar as variáveis app e porta
module.exports = {app, porta}