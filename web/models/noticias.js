// importar mongoose
var mongoose = require('mongoose');

//executar a classe schema
var Schema = mongoose.Schema;

//configurar modelo noticias
var noticias = new Schema({
    titulo: String,
    texto: String,
    imagem: String,
    data: Date
});

//difinir armazenamento para as noticias
var noticias_coll = mongoose.model('noticias',noticias);

//exportar variavel coleção noticias e data
module.exports = noticias_coll;