import React, {Component, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import {NavLink} from "react-router-dom";



class Manager extends Component {

  state = {
	managers: [],
	employees: [],
	selected_manager: ""
  }

  componentDidMount(){
	this.getManagers();
  }

  getManagers = () => {
    axios.get('/api/managers')
      .then(res => {
        if(res.data){
		  if(res.data.length == 0){
			  this.setState({
				  managers:res.data
			  })
		  }
		  else{
			this.setState({
			  managers: res.data,
			  selected_manager: res.data[0].employee_id
			}, ()=> {
			  this.getEmployees()
			})
		  }
        }
	  })
      .catch(err => console.log(err))
  }

  getEmployees = () =>{
	  axios.get('/api/manager/' + `${this.state.selected_manager}`)
	  	.then(res=>{
			  this.setState({employees: res.data})
		  })
  }

  changeSelected = (e) =>{
	  this.setState({
		  selected_manager: e.target.value
	  },()=>{
		  this.getEmployees()
	  })
  }


  render() {
    return(

      <div>
		  <h1>Management System</h1>
        <label htmlFor="manager">Manager: </label>
		<select name="manager" id="manager" onChange={this.changeSelected}>
		{this.state.managers.map((manager) => <option key={manager.employee_id} value={manager.employee_id}>{manager.first_name}</option>)}
		</select>
		<div className="App">
		<table id="employees">
			<tr>
				<th>Employee ID</th>
				<th>Last Name</th>
				<th>First Name</th>
			</tr>
			{
				this.state.employees.map((employee) => 
					<tr>
					<td>{employee.employee_id}</td>
					<td>{employee.last_name}</td>
					<td>{employee.first_name}</td>
					</tr>
			)
			}
		</table>
		</div>
		<Link to='/add'>
      <button type="button" className="button">Add Employee</button>
      </Link>
	</div>
    )
  }
}

export default Manager;