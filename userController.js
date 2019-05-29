Usuario = require('./userModel');

exports.index = function(req, res) {
    Usuario.get( function (err, usuarios){
        if(err){
            res.json({
                status: "Erro",
                message: err,
            })
        };
        res.json({
            status: "Sucesso",
            message: 'Usuários recuperados com suceso',
            data: usuarios
        });
    });
};

exports.new = function(req, res){
    var usuario = new Usuario();

    usuario.login = req.body.login;
    usuario.password = req.body.password;
    usuario.name = req.body.name ? req.body.name : usuario.name;
    usuario.email = req.body.email;
    usuario.tipo = req.body.tipo;

    //Salvar usuario e verificar erros
    usuario.save(function (err) {
        if (err){
            res.json(err);
        }
        
      res.json({
          message: 'Usuário cadastrado com sucesso!',
          data: usuario
      });
    });
};

exports.view = function(req, res){
    Usuario.findById(req.params.usuario_id, function(err, usuario){
        if(err){
            res.send(err);
        }

        res.json({
            message: 'Dados do usuário: ' + usuario.name,
            data: usuario
        });
    });
};

exports.update = function (req, res){
    Usuario.findById(req.params.usuario_id, function(err, usuario){
        if(err){
            res.send(err);
        }

        usuario.login = req.body.login;
        usuario.name = req.body.name ? req.body.name : usuario.name;
        usuario.email = req.body.email;
        usuario.password = req.body.password;
        usuario.tipo = req.body.tipo;

        //Salvar dados atualizados e verificar erros
        usuario.save(function (err) {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'Informações atualizadas!',
                data: usuario
            });
        });
    });
};

exports.delete = function (req, res) {
    Usuario.remove({
        _id: req.params.usuario_id
    }, function (err, usuario) {
        if (err) {
            res.send(err);
        }
        res.json({
            status: 'Sucesso',
            message: 'Usuário deletado com sucesso!'
        });
    });
};