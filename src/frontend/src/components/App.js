import React, { useEffect, useState } from 'react';
import './style.css'

export default function App() {

	return (
		<div id='page'>

			<h2>Emoji Machine Learning</h2>

			<div>
				<p className="result"><b>Training Data:</b> <span id="trained">None...</span></p>
				<p className="result"><b>Current Guess:</b> <span id="guessed">Waiting...</span></p>
			</div>

			<div id="buttons">
				<button id="delete-button" className="button" onClick={() => deleteSamples()}>☠️<br/><span className="button-text">DELETE</span></button>
			
				<button id="clear-button" className="button" onClick={() => resetGrid()}>🚫<br/><span className="button-text">CLEAR</span></button>

				{/*
					<button className="row1" type="button" onclick=train('{{ emoji }}');>{{ emoji }}<br><span className="button-text">Submit</span></button>
				*/}
			</div>

			<div id="below-canvas">
				<div id="instructions">
					<h3>Instructions</h3>
					<ul>
						<li>Draw emojis and submit them to train the Machine Learning model.
						</li>
						<li>Clear will reset the drawing.</li>
					</ul>
				</div>
			</div>

		</div>
	);
}