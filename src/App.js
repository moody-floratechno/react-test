import React, { Component } from 'react';
import './App.css';
import Request from 'superagent';
import Cards from './Cards/Cards';
import {DebounceInput} from 'react-debounce-input';

function debounce(fn, waitTime){
	console.log("console in debounce");
	let timeOut;
	
	return function(){
	//fn.apply(this,args);
	
	timeOut && clearTimeout(timeOut);	
	timeOut = setTimeout(fn, waitTime);
	} 
}

function kk(val){
 alert("Taking it ahead!"+val);	
}
class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			value: '',
			movies: ''
  		};

	this.searchTerm = this.searchTerm.bind(this);
	}
	
	
	searchTerm = (e) => {
		alert("kick off");
		
		//alert(event.target.value);
		/*
		this.setState({value: event.target.value})
		let searchString = event.target.value;
		var url =  "http://www.omdbapi.com?s="+searchString+"&y=&r=json&plot=short&apikey=2f8cc728"
		Request.get(url).then((response) => {
							    if(!response.body.Error) {
									this.setState({
												  movies: response.body.Search,
												  totalResult: response.body.totalResults
												  })
								} else {
									this.setState({
												  movies: '',
												  totalResult: 0
												  })
								}
								});
		*/
							   
	}
			
	render() {
	  let movies = null;
	  const style ={
		  float:"left"
	  }
	  if(this.state.movies.length > 0) {
			movies = (
			<div style={style}>
				{
					this.state.movies.map((movies,index) => {
						return	<Cards
									title={movies.Title} 
									year ={movies.Year}
									type ={movies.Type}
									key ={index}
								/>
						})
				}
			</div>
		   )
	   }
	 let self = this;
	return (
	  <div className="App">
		<h1 className="margin-10">Get information about your favourite movies</h1>
		
		&nbsp;
		<input
		  minLength={3}
		  onChange = {(e) => this.searchTerm(e)} placeholder="Search for movies"   className="margin-10" />
	
		<p className="margin-13">You Searched: <span className="bold">{this.state.value}</span></p>
		<p className="margin-13">Total Results: <span className="bold">{this.state.totalResult}</span></p>
		{movies}
	  </div>
	);
	}
  
  
}

export default App;