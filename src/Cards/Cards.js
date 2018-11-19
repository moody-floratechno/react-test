import React from 'react';
import './Cards.css';
const cards = (props) => {
	return (
			<div className="Cards">
			  <div className="display"> Name: {props.title}</div>
			  <div className="display"> Year: {props.year}</div>
			  <div className="display"> Type: {props.type}</div>
			</div>
  )
}

export default cards;