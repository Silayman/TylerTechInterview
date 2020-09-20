const express = require ('express');
const router = express.Router();
const Employee = require('../models/employee');

/*
Get all managers and directors
*/
router.get('/managers', (req, res, next)=> {
	Employee.find({$or:[{"roles": /Manager/},{"roles": /Director/}]}).select({ "roles": 1, "employee_id":1, "first_name":1, "last_name":1})
    .then(data => res.json(data))
    .catch(next)
});

/*
Add an employee
*/
router.post('/add', (req, res, next) => {
	if(req.body){
		Employee.create(req.body)
		  .then(data => res.json(data))
		  .catch((err) =>{
			res.json({
				error: "Required fields missing!"
			  })
		  });
	  }
});

/*
Get managers/directors employees
*/
router.get('/manager/:id', (req, res, next) => {
	Employee.find({ manager: req.params.id }, 'manager').select({ "employee_id":1, "first_name":1, "last_name":1})
    .then(data => res.json(data))
    .catch(next)
});


module.exports = router;