var path = require('path');

// Carga modelo ORM
var Sequelize = require('sequelize');

// Usar DDBB SQLite
var sequelize = new Sequelize(null, null, null, {dialect: 'sqlite', storage: "quiz.sqlite"} );

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Exportar definición de la tabla Quiz
exports.Quiz = Quiz;

sequelize.sync().then(function(){

    Quiz.count().then(function(count){
        if(count === 0) {
            Quiz.create({ pregunta: 'Capital de Italia',
                          respuesta: 'Roma'
                        })
            .then(function(){console.log('Base de datos inicializada')});
        };
    });
});
