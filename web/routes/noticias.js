module.exports = (app)=>{

    var conexao = require('../../config/bancodedados')

    var noticias = require('../models/noticias')

    //importando o arquivo de configurações do multer
    var multer = require('../../config/multer')
    
    //Criar noticia
    app.get('/criar_noticias',function(req,res){

        res.render('criar_noticias')
    })

    //Salvar noticia
    app.post('/salvar_noticias',multer.single('imagem'),function(req,res){
        
        //executar a conexao com o banco de dados
        conexao()

        //variaveis
        var D = new Date();

        //recuperar as informações do formulário
        var dados = req.body

        var arquivo

        if(req.file){
            arquivo = req.file.filename
        }
        else{
            arquivo = ""
        }

        // criar um novo documento na coleção noticia
        new noticias({
            titulo:dados.titulo,
            texto:dados.texto,
            imagem:arquivo,
            data: D
        })
        .save()
        .then((result)=>{
            res.redirect('/mostrar_noticias')
            //console.log(D.toLocaleDateString())
        })
        .catch((error)=>{
            console.log(error)
        })
    })

    //criar a resposta para a requisição '/mostrar_noticia'
    app.get('/mostrar_noticias', function(req,res){

        // executar a conexão com o banco de dados
        conexao()

        //mostrar todos os documentos da coleção noticia
        noticias.find().sort({"_id":-1})
        .then((noticias)=>{
            res.render('mostrar_noticias',{noticias:noticias})
        })
        .catch((error)=>{
            console.log(error)
        })
    })

    //configurar a resposta para a requisição '/alterar_noticia'
    app.get('/alterar_noticia',function(req,res){

        //armazenar o id da barra de endereço
        var id = req.query.id

        //executar a conexão com o banco de dados
        conexao()

        //criar uma pesquisa na colecao noticia utilizando o id
        noticias.findOne({_id:id})
        .then((noticias)=>{

            //renderizar o arquivo 'view' alterar_noticia
            res.render('alterar_noticias',{noticia:noticias})
        })
        .catch((error)=>{
            console.log(error)
        })
    })

    app.post('/alterar_noticias',multer.single('imagem'),function(req,res){

        conexao()

        var dados = req.body

        //verifica se existe o req.file (quando um arquivo é selecionado)
        if(req.file){
            var imagem = req.file.filename
        }else{
            var imagem = dados.img_original
        }

        noticias.findOneAndUpdate(
            {_id:dados.id},
            {
                titulo:dados.titulo,
                texto:dados.texto,
                imagem:imagem
            }
        )
        .then((result)=>{
            res.redirect('/mostrar_noticias')
        })
        .catch((error)=>{
            console.log(error)
        })
    })

    //configurar a resposta para a requisição '/excluir_noticia'
    app.get('/excluir_noticia',function(req,res){

        //armazenar o id da barra de endereço
        var id = req.query.id

        //executar a conexão com o banco de dados
        conexao()
        
        //criar uma pesquisa na colecao equipe utilizando o id
        noticias.findOne({_id:id})
        .then((noticias)=>{

            //renderizar o arquivo 'view' excluirequipe
            res.render('excluir_noticias',{noticia:noticias})
        })
        .catch((error)=>{
            console.log(error)
        })
    })

    //configurar a resposta para a requisição '/excluir_noticia' POST
    app.post('/excluir_noticia',function(req,res){

        //executar a conexao com o banco de dados
        conexao()

        //importar os dados do formulário
        var dados = req.body
        
        noticias.findOneAndRemove({_id:dados.id})
        .then((result)=>{
            res.redirect('/mostrar_noticias')
        })
        .catch((error)=>{
            console.log(error)
        })
    })
}