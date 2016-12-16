var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
  username:  {type: String, unique: true},
  password:  String,
  classroom: String,
  students: [ String ]
});

module.exports = mongoose.model('Teacher', teacherSchema);
