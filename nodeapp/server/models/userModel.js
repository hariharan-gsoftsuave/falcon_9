
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true, 
    trim: true,       
  },
  password:{
    type: String,
    required: true, 
    trim: true,  
 },
 email:{
  type: String,
  required: false, 
  trim: true,       
},
  name: {
    type: String,
    required: false, 
    trim: true,      
  },
  age: {
    type: Number,
    required: false,  
    min: 0,          
  },
  city: {
    type: String,
    required: false,  
    trim: true,      
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  },
  updatedAt: {
    type: Date,
    default: Date.now,  
  },
});


userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();  
  next();
});


const User = mongoose.model('User', userSchema);


module.exports = User;

