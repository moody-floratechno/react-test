import React from 'react';
import './Movies.css';
const movies = (props) => {
	return (
			<div className="Movies">
			Total Search Movies : {props.total}
			
			</div>
  )
}

export default movies;