import React, { useEffect, useState } from 'react';

export default function Button(props){

	return(
		<button className="button" onClick={() => train(props.emoji)}>
			{props.emoji}
			<br/>
			<span className="button-text">Submit</span>
		</button>
	)
}