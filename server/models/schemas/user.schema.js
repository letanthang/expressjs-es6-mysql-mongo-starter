import mongoose from 'mongoose';

module.exports = {
  id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  employee_id: {
    type: Number,
    required: true
  },
  department_id: {
    type: Number,
    required: true
  },
  warehouse_id: {
    type: Number,
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees'
  },
  phone: {
    type: String,
    required: false,
    match: [/(01[2689]|09)[0-9]{8}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  }
};
