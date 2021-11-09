module.exports = function(app){

    //importar as configurações do banco de dados
    var conexao = require('../../config/bancodedados')
    
    //importar o modelo noticias
    var noticias = require('../models/noticias')

    app.get('/',async(req,res)=>{

        //executar a conexão com o banco de dados
        conexao()

        //variável
        var d = new Date()
        var res_noticias
        
        //array messes
        const messes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        var data = d.getDate()+' de '+messes[d.getMonth()]+', '+d.getFullYear()

        //pesquisar sete (7) documentos da collection noticias em ordem descendente
        await noticias.find().limit(5).sort({"_id":-1})
        .then((noticias)=>{
            res_noticias = noticias
        })
        .catch((error)=>{
            console.log(error)
        })
        res.render('index',{rnoticias:res_noticias,messes:messes,data:data})
        
    })
}