//Inicializar express router
let router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API está Ok!',
        message: 'Bem vindo a API de Cadastro de Usuários!'
    });
});

//Importar Usuário Controller
var userController = require('./userController');

// router.route('/usuarios')
// .get(userController.index)
// .post(userController.new);

router.route('/usuarios/obterUsuarios')
.get(userController.index);

router.route('/usuarios/cadastrar')
.post(userController.new);

// router.route('/usuarios/:usuario_id')
// .get(userController.view)
// .patch(userController.update)
// .put(userController.update)
// .delete(userController.delete);

router.route('/usuarios/obterUsuario/:usuario_id')
.get(userController.view);
router.route('/usuarios/atualizarUsuario/:usuario_id')
.put(userController.update);
router.route('/usuarios/atualizarDadoUsuario/:usuario_id')
.patch(userController.update);
router.route('/usuarios/deletarUsuario/:usuario_id')
.delete(userController.delete);

//Exportar as Rotas da  API
module.exports  = router;