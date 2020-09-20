const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  manager: {
	type: String,
	required: [true, 'The employee text field is required']
  },
  employee_id: {
    type: String,
    required: [true, 'The employee text field is required']
  },
  first_name: {
    type: String,
    required: [true, 'The employee text field is required']
  },
  last_name: {
    type: String,
    required: [true, 'The employee text field is required']
  },
  roles: {
	  type: Array,
	  required: [true, 'The employee text field is required'],
	  validate : {
		validator : function(array) {
		  return array.every((v) => typeof v === 'string');
		}
  }}
})

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;