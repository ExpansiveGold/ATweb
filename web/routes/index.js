module.exports = function(app){

    //importar as configurações do banco de dados
    var conexao = require('../../config/bancodedados')
    
    //importar o modelo noticias
    var noticias = require('../models/noticias')

    app.get('/',async(req,res)=>{

        //executar a conexão com o banco de dados
        conexao()

        //variável
        var res_noticias
        
        //array messes
        const messes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


        //pesquisar sete (7) documentos da collection noticias em ordem descendente
        await noticias.find().limit(7).sort({"_id":-1})
        .then((noticias)=>{
            res_noticias = noticias
        })
        .catch((error)=>{
            console.log(error)
        })
        res.render('index',{rnoticias:res_noticias,messes:messes})
        
    })
}