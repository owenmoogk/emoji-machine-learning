import React, { useEffect, useState } from 'react';
import './style.css'
import Button from './Button'

export default function App() {

	return (
		<div id='page'>

			<h2>Emoji Machine Learning</h2>

			<br/>

			<div id='body'>
				<div id='left'>
					<div id='headers'>
						<p className="result"><b>Training Data:</b> <span id="numberOfData"></span></p>
					</div>
					<div id='description'>
						This is a machine learning website! It takes inputs from user to train a model, and then uses that model to predict what the user has drawn. Try it out!
						<br/><br/>
						<b>Instructions:</b>
						<ul>
							<li>Start by drawing an emoji that you see above.</li>
							<li>Once you are done, click on the button with the emoji that you have drawn. This will train the model.</li>
							<li>As you continue to draw emojis, the model will start to make guesses as to what you have drawn (it may take a little bit of training data to get it right).</li>
							<li>Once you can draw emojis and the computer gets it right before you even submit, then you have trained the model!</li>
						</ul>
						<br/>
						<b>Purpose</b>
						<br/><br/>
						This was made to teach about machine learning, and visualize it in a nice way. The origal idea was from Makeschool, and was run on Flask and Replit. I liked the idea, so made the code a lot cleaner and ran it using Django and React for the frontend and backend (respectivley). Thanks! 
					</div>
				</div>

				<div id='right'>
					<div id="buttons">

						<button id="clear-button" className="button" onClick={() => clearDrawing()}>
							🚫
						</button>

						<Button emoji='🙂'></Button>
						<Button emoji='🚀'></Button>
						<Button emoji='💎'></Button>
						<Button emoji='👍'></Button>

						<p className="result"><b>Current Guess:</b> <span id="guess">Waiting...</span></p>
					</div>
					<br/>
					<div id='canvas-container'></div>
				</div>
			</div>

		</div>
	);
}