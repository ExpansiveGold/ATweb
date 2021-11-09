//importar mongoose
var mongoose = require('mongoose');

//configurar o bando de dados
var conexao = async()=>{
    mongoose.connect('mongodb+srv://ExpansiveGold:MongoPass@cluster0.6hqym.mongodb.net/ATweb?retryWrites=true&w=majority')
};

//exportar variavel conexao
module.exports = conexao;