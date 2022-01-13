import './App.css';
import React from 'react';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useGamepads } from 'react-gamepads';

function KeysPressed() {


	const [keysArr, setKeysArr] = useState(
		() => JSON.parse(window.localStorage.getItem('buttons')) || Array(0),
	);

	const allowedKeys = ['x', 'y', 'a', 'b'];

	function updateKeysArr(uppercaseKey) {
		setKeysArr(keysArr => [...keysArr, uppercaseKey])
	}

	useEffect(() => {
		window.localStorage.setItem('buttons', JSON.stringify(keysArr))
	}, [keysArr])

	function testKeyInput({ key }) {

		if ( allowedKeys.includes(key.toLowerCase()) ) {
			const uppercaseKey = key.toUpperCase();
			updateKeysArr(uppercaseKey);
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", testKeyInput);

		// Remove event listeners on cleanup
		return () => {
		  window.removeEventListener("keydown", testKeyInput);
		};
	  }, []);

	useEffect(() => {

	})


	const div = keysArr.map( (item) => {
		const uniqueId = uuidv4();
		return (
			<button className={'button-symbol ' + 'button-' + item.toLowerCase()} key={uniqueId}>{item}</button>
		)

	} );


	return div;
}

function App() {

	const [gamepads, setGamepads] = useState([]);

	useGamepads(gamepads => {
		setGamepads(Object.values(gamepads))
	})

	if(gamepads && gamepads[0]) {
		console.log(gamepads[0].buttons[0].pressed)
	}
	// useGamepads( gamepads => setGamepads(gamepads));
	// console.log(gamepads[0].buttons)

  return (
    <div className="App">
		<div className="container">
			<div className="info">Connect your controller.
			{gamepads.length && gamepads.map(gp => {
				return (
					<div>
						<div><span>ID:</span>{gp.id}</div>
						{gp.buttons.map((button, index) => {
							return(
								<div><span>#{index + 1}:</span>{button.value}</div>
							)
						})}
					</div>
				)
			})}
			</div>
			<div className="button-area">
				{ KeysPressed() }
			</div>
		</div>
    </div>
  );
}

export default App;
