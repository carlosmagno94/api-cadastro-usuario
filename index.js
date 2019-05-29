//importação do express
let express = require('express');
//Importar body-parser
let bodyParser = require('body-parser');
//Importar mongoose
let mongoose = require('mongoose');
//inicializar a aplicação
let app = express();

//Importar rotas
let apiRoutes = require("./api-routes");

//Configura o body-parser para manipular as solicitações de postagem
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Conecta ao Mongoose e configure a variável de conexão
mongoose.connect('mongodb://localhost/restapi');

var db  = mongoose.connection;

//porta do servidor de configuração
var port = process.env.PORT || 8080;

//Enviar menssagem para o URL padrão
app.get('/', (req, res) => res.send('API RESTful  de Cadastro Express e Nodemon'));

//Usar API routes (rotas) no aplicação
app.use('/api', apiRoutes);

//Executar a aplicação para a porta especifica
app.listen(port, function(){
    console.log('Rodando API RESTful  na porta: '+ port);
});