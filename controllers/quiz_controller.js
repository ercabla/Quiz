
var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
    models.Quiz.find(quizId).then(function(quiz) {
        if (quiz) {
            req.quiz = quiz;
            next();
        } else {
            next(new Error('No existe quizId=' + quizId));
        }
    });       
};

// GET /quizes
exports.index = function(req, res) {
    
    if (req.query.search){
        var search = req.query.search.trim();
        search = search.toLowerCase();
        models.Quiz.findAll({ 
             where: ["lower(pregunta) like ?", '%' + search.split(' ').join('%') + '%'],
             order: 'pregunta ASC'
         }).then(function(quizes) {
            res.render('quizes/index', {quizes: quizes});
        });       
    } else {
        models.Quiz.findAll().then(function(quizes) {
            res.render('quizes/index', {quizes: quizes});
        });
    }   
};

// GET /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', {quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado });    
};