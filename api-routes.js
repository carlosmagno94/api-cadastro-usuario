//Inicializar express router
let router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API está Ok!',
        message: 'Bem vindo ao api-crud-node'
    });
});

//Importar Usuário Controller
var userController = require('./userController');

router.route('/usuario')
.get(userController.index)
.post(userController.new);

router.route('/usuario/:usuario_id')
.get(userController.view)
.patch(userController.update)
.put(userController.update)
.delete(userController.delete);

//Exportar as Rotas da  API
module.exports  = router;