import React from 'react';
import './Person.css';
const person = (props) => {
	return (
			<div className="Person">
			<p onClick={props.click}> I am a person.  I am {Math.floor(Math.random() * 30)} years old. my name is {props.name}  
			</p>
			<input type="text" onChange={props.changed} value={props.name} />
			</div>
  )
}

export default person;