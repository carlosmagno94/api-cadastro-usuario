Usuario = require('./userModel');

exports.index = function (req, res) {
    Usuario.get(function (err, usuarios) {
        if (err) {
            res.json({
                status: "Erro",
                message: err,
            })
        };
        res.json({
            status: "Sucesso",
            message: usuarios.length == 0 ? "Nenhum usuário cadastrado" 
            : usuarios.length == 1 ? + usuarios.length + ' usuário recuperado com sucesso'
            : usuarios.length + ' usuários recuperados com sucesso',
            data: usuarios
        });
    });
};

getByEmail = function (email) {
    return Usuario.find({ 'email': email });
}

getBylogin = function (login){
    return Usuario.find({'login': login});
}

exports.new = function (req, res) {
    const usuario = req.body;
    //verificar o login e email
    getByEmail(usuario.email).then(function (usuarioExiste) {
        if (usuarioExiste.length > 0) {
            return res.status(400).send({ error: 'E-mail já cadastrado' });
        }
        getBylogin(usuario.login).then(function (usuarioExiste) {
            if (usuarioExiste.length > 0) {
                return res.status(400).send({ error: 'Login já existente!' });
            }
        }).catch(err => console.error.bind(console, `Error : ${err}`));

        createUsuario();
    }).catch(err => console.error.bind(console, `Error : ${err}`));

    createUsuario = function () {
        Usuario.create(usuario)
            .then(user => res.status(200).send({ Ok: 'Usuário cadastrado com sucesso!' }))
            .catch(err => console.error.bind(console, `Erro : ${err}`));
    }
    // var usuario = new Usuario();

    // usuario.login = req.body.login;
    // usuario.password = req.body.password;
    // usuario.name = req.body.name ? req.body.name : usuario.name;
    // usuario.email = req.body.email;
    // usuario.tipo = req.body.tipo;

    // //Salvar usuario e verificar erros
    // usuario.save(function (err) {
    //     if (err){
    //         res.json(err);
    //     }
    //   res.json({
    //       message: 'Usuário cadastrado com sucesso!',
    //       data: usuario
    //   });
    // });
};

exports.view = function (req, res) {
    Usuario.findById(req.params.usuario_id, function (err, usuario) {
        if (err) {
            res.send(err);
        };
        res.json({
            message: 'Dados do usuário: ' + usuario.name,
            data: usuario
        });
    });
};

exports.update = function (req, res) {
    Usuario.findById(req.params.usuario_id, function (err, usuario) {
        if (err) {
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