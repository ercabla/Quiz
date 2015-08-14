var models = require('../models/models.js');
var Sequelize = require('sequelize');

// GET /quizes/statistics
exports.index = function(req, res) {    
    
   var statistics = {
       quizes: 0,
       comments: 0,
       mediaComments: 0,
       uncommentedQuizes: 0,
       commentedQuizes:0
   };
    
   Sequelize.Promise.all([
       models.Quiz.count(),
       models.Comment.count(),
       models.Quiz.count({ 
           distinct: true,
           where: [ '"Comments"."QuizId" IS NULL' ],
           include: [{model: models.Comment, required: false }] }),
       models.Quiz.count({ 
           distinct: true,
           where: [ '"Comments"."QuizId" IS NOT NULL' ],
           include: [{model: models.Comment, required: true }] })
       ]).then( function (values){
            statistics.quizes = values[0];
            statistics.comments = values[1];
            statistics.uncommentedQuizes = values[2];
            statistics.commentedQuizes = values[3];
            statistics.mediaComments = values[1] / values[0];
       
       res.render('statistics/index', {
        statistics: statistics,
        errors: []}); 
       
   }); 
    
};



