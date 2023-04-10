const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://<username>:<password>@cluster0.hbhwc24.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    phone: String
  });

  const Student = mongoose.model('Student', studentSchema);

//   ================================FETCHING ALL STUDENT FROM DB======================================

    app.get('/students', async function(req, res) {
    try {
      const students = await Student.find({});
      console.log(students);
      res.send(students);
    } catch (err) {
      res.send(err);
    }
  });
  

  //   ================================FETCHING SINGLE STUDENT FROM DB======================================


  app.get('/students/:id', async function(req, res) {
    try {
      const student = await Student.findById(req.params.id);
      res.send(student);
    } catch (err) {
      res.send(err);
    }
  });

  //   ================================POSTING STUDENT DETILS INTO DB======================================


  app.post('/students', async function(req, res) {
    try {
        const newStudent = new Student(req.body);
        const student = await newStudent.save();
        res.send(student);
    } catch (err) {
        res.send(err);
    }
});
  


  //   ================================UPDATING STUDENT DETAILS FROM DB======================================


  app.put('/students/:id', async function(req, res) {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send(student);
    } catch (err) {
      res.send(err);
    }
  });
  
 
    //   ================================DELETING STUDENT DETAILS FROM DB======================================


    app.delete('/students/:id', async function(req, res) {
        try {
          const student = await Student.findByIdAndRemove(req.params.id);
          res.send(student);
        } catch (err) {
          res.send(err);
        }
      });
      
  
  
  app.listen(3000, function() {
    console.log('Server started at port 3000');
  });
  
