//importar o multer
var multer = require('multer');

//configurar o destino e nome do arquivo (DiskStorage)
var armazenamento = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./web/assets/images');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+'_'+file.originalname);
    }
});

//criar a variável para executar o multer com o diskStorage
var upload = multer({storage:armazenamento});

//exportar a variavel upload
module.exports = upload;