import React, { Component } from 'react';
import Manager from './components/Manager';
import './App.css';
import AddManager from './components/AddManager'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
export default function App() {
	return (
	  <Router>
		<div className="App">
		  <Switch>
		  	<Route path="/" exact component={Manager} />

			<Route path="/add" exact component={AddManager} />

		  </Switch>
		</div>
	  </Router>
	);
  }
