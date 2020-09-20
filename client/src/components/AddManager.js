import React, {Component, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

import 'materialize-css';


class AddManager extends Component {
		state = {
			managers: [],
			manager: "",
			employee_id: "",
			first_name: "",
			last_name: "",
			roles: []
		}

		componentDidMount(){
		this.getManagers();
		}

		addPost = () => {
			const _employee = {
				"manager": this.state.manager,
				"employee_id": this.state.employee_id,
				"first_name": this.state.first_name,
				"last_name": this.state.last_name,
				"roles": this.state.roles
			}
			if(_employee.roles.includes("Director") && _employee.manager == ""){
				_employee.manager = _employee.first_name
			}
			axios.post('/api/add', _employee)
				.then(res => {
					if(res.data){
						console.log(res.data);
						console.log(_employee)
					}
				})
				.catch(err => console.log(err))
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
					  manager: res.data[0].employee_id
					})
				  }
				}
			  })
			  .catch(err => console.log(err))
		  }

		changeSelected = (e) =>{
			if(e.target.name == "manager"){
				this.setState({
					manager: e.target.value
				})
			}
			else if(e.target.name == "employee_id"){
				this.setState({
					employee_id: e.target.value
				})
			}
			else if(e.target.name == "first_name"){
				this.setState({
					first_name: e.target.value
				})
			}
			else if(e.target.name == "last_name"){
				this.setState({
					last_name: e.target.value
				})
			}
			else if(e.target.name == "roles"){
				let value = Array.from(e.target.selectedOptions, option => option.value);
				this.setState({
					roles: value
				})
			}
			
		}

		render() {
			return(
		
			  <div id="total">
				  <h1>Add New Employee</h1>
				<label htmlFor="manager">Manager: </label>
				<select name="manager" id="manager" onChange={this.changeSelected}>
					{this.state.managers.map((manager) => <option key={manager.employee_id} value={manager.employee_id}>{manager.first_name}</option>)}
				</select>
				<form id="add">
					<label htmlFor="employee_id">Employee ID: </label>
					<input onChange={this.changeSelected} type="text" id="employee_id" name="employee_id"></input>
					<label htmlFor="first_name">First Name: </label>
					<input onChange={this.changeSelected} type="text" id="first_name" name="first_name"></input>
					<label htmlFor="last_name">Last Name: </label>
					<input onChange={this.changeSelected} type="text" id="last_name" name="last_name"></input>
				</form>
				<div>
					<label htmlFor="roles">Roles: </label>
					<select onChange={this.changeSelected} name="roles" id="roles" multiple>
						<option value="Accounting">Accounting</option>
						<option value="Anaylst">Anaylst</option>
						<option value="Director">Director</option>
						<option value="IT">IT</option>
						<option value="Manager">Manager</option>
						<option value="Sales">Sales</option>
						<option value="Support">Support</option>
					</select>
				<div>
				<Link to='/'>
			  <button type="button" onClick={this.addPost} className="button">Save</button>
			  </Link>
			  <Link to='/'>
			  <button type="button" className="button">Cancel</button>
			  </Link>
			  </div>
			  </div>
			</div>
			)
		  }
		}
		

export default AddManager;