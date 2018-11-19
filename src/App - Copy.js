import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';
import Request from 'superagent';
import Movies from './Movies/Movies';

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			name:"mudassir",
			persons: [
					  { id:1, name: "max", age: 29 },
					  { id:2, name: "manu", age: 26 },
					  { id:3, name: "carl", age: 22 } 
					 ],
			showPersons: false,
			showMovies: true,
			searchText: '',
			displayTitles: false
			}
	  	console.log("constructor called");	
		
		this.changeName = this.changeName.bind(this);
		this.changeNameHandler = this.changeNameHandler.bind(this);
		
		
	 
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
    console.log("get derived state called");
	
	return null;
  }
  
  
	
	
	searchTerm = (event) => {
	  this.setState({
					searchText: event.target.value
					})
	  //this.getTotal()
	  let searchString = event.target.value;
		//alert(searchString);
		var url =  "http://www.omdbapi.com?s="+searchString+"&y=&r=json&plot=short&apikey=2f8cc728"
	    Request.get(url).then((response) => {
							//console.log("resp" + JSON.stringify(response));
							console.log(response.body.Search);
							console.log(response.body.totalResults);
							this.setState({
										  movies: response.body.Search,
										  totalResult: response.body.totalResults
										  })
							});
	  console.log("search" + event.target.value);
	}
	
	

  componentDidMount() {
    console.log("component mount called");
  }
  
  
  
  changeName(newName) {
    this.setState({
      name: newName
    });
  }
  
  changeNameHandler(event,id) {
	 /* this.setState(state => ({
      name: event.target.value
    })); */
	/* this.setState({
			name: event.target.value	   
				   }); */
	const personIndex = this.state.persons.findIndex(p => {
													 return p.id === id;
													 })
	const person = {
	 ...this.state.persons[personIndex]
	};
	person.name = event.target.value;
	
	const persons = [...this.state.persons];
	persons[personIndex] = person;
	this.setState({persons:persons});
    console.log(event.target.value);
  }
  
  changeNameToggle = () => {
    this.setState({
		showPersons : !this.state.showPersons
	})
  }
  
  
  getTotal = () => {
	  // get url api
		let searchString = this.state.searchText;
		//alert(searchString);
		var url =  "http://www.omdbapi.com?s="+searchString+"&y=&r=json&plot=short&apikey=2f8cc728"
	    Request.get(url).then((response) => {
							//console.log("resp" + JSON.stringify(response));
							console.log(response.body.Search);
							console.log(response.body.totalResults);
							this.setState({
										  movies: response.body.Search,
										  totalResult: response.body.totalResults
										  })
							});
	  //this.setState({
	//	displayTitles : !this.state.displayTitles
	//}) 
	  
	  
  }
  componentDidUpdate(prevProps,prevState) {
	  console.log("did update");
	  console.log("new " + this.state.name + " old " + prevState.name);
  }
  
  componentWillUnmount() {
	  console.log("app unmounted");  
  }
  
  deleteHandler = (index) => {
	  //const allpersons = this.state.persons;
	  const allpersons = [...this.state.persons];
	  allpersons.splice(index,1);
	  this.setState({persons:allpersons})
  }
  
  
	
  render() {
	  let persons = null;
	  let movies = null;
	  const divStyle = {
	   border:"1px solid blue",
	   backgroundColor:"green",
	   padding:"5px",
	   cursor:"pointer",
	   color:"white"
	};
	  if(this.state.showPersons) {
		persons = (
		<div>
		{
			this.state.persons.map((person,index) => {
							return	<Person
										name={person.name} 
										age={person.age} 
										name1= {this.state.name} 
										click={()=>this.deleteHandler(index)}
										key ={index}
										changed={(event)=>this.changeNameHandler(event,person.id)}
										/>
								})
		}
		
		</div>
				   )
		divStyle.backgroundColor = "red";
	  } 
	  if(this.state.showMovies) {
		  movies = (
					<div>
					 {this.state.searchText.length > 0 ?
					      	 <Movies total={this.state.totalResult} /> 
						  
						 : ''}
					</div>
					)
	  }
	  if(this.state.displayTitles) {
		 alert("true");  
	  }
	  console.log("render called");
    return (
      <div className="App">
        <h1>hi test react</h1>
		<p>this is working</p>
		<div>{movies}</div>
		<button  style={divStyle} onClick={this.changeNameToggle}>Toggle Names</button> 
		
		&nbsp; 
		<input type="text" onKeyUp={this.searchTerm} placeholder="search total movies"/>
		{persons}
		
		
		
		</div>
		
    );
  }
  
  
}

export default App;
