const courses = require('./courses');
const students = require('./students');
const subjects = require('./subjects');
const teachers = require('./teachers');
const finishedCourse = require('./finishedCourse');

module.exports = (app) => {
  app.use('/courses', courses);
  app.use('/students', students);
  app.use('/subjects', subjects);
  app.use('/teachers', teachers);
  app.use('/finished-course', finishedCourse);
} 