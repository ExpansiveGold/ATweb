//importar mongoose
var mongoose = require('mongoose');

//configurar o bando de dados
var conexao = async()=>{
    try {
        var db = await mongoose.connect('mongodb+srv://ExpansiveGold:MongoPass@cluster0.6hqym.mongodb.net/ATweb?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
    }
    catch (error) {
        console.log(error)
    }
};

//exportar variavel conexao
module.exports = conexao;