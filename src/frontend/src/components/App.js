import React, { useEffect, useState } from 'react';
import './style.css'
import Button from './Button'

export default function App() {

	return (
		<div id='page'>

			<h2>Emoji Machine Learning</h2>

			<div>
				<p className="result"><b>Training Data:</b> <span id="numberOfData"></span></p>
				<p className="result"><b>Current Guess:</b> <span id="guess">Waiting...</span></p>
			</div>

			<div id="buttons">
				<button id="delete-button" className="button" onClick={() => deleteSamples()}>
					☠️
					<br />
					<span className="button-text">DELETE</span>
				</button>

				<button id="clear-button" className="button" onClick={() => clearDrawing()}>
					🚫
					<br />
					<span className="button-text">CLEAR</span>
				</button>

				<br/>
				<br/>

				<Button emoji='🙂'></Button>
				<Button emoji='🚀'></Button>
				<Button emoji='💎'></Button>
				<Button emoji='👍'></Button>

			</div>
		</div>
	);
}