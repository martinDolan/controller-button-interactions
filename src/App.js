import './App.css';
import React from 'react';
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useGamepads } from 'react-gamepads';
import debounce from 'lodash.debounce';
import AwesomeDebouncePromise from 'awesome-debounce-promise'


// function checkGamepad() {
// 	window.addEventListener('gamepadconnected', event => {

// 		let result = event.gamepad.id;
// 		return result;
// 		// All buttons and axes values can be accessed through
// 		console.log(event.gamepad.id)
// 		//event.gamepad;

// 	}, false);
// }

function KeysPressed() {

	const [gamepads, setGamepads] = useState([]);
	// const [gamepad, setGamepad] = useState(() => navigator.getGamepads()[0]);

	const [keysArr, setKeysArr] = useState(
		() => JSON.parse(window.localStorage.getItem('buttons')) || Array(0),
	);

	const allowedKeys = ['x', 'y', 'a', 'b'];

	let debouncedKey = useRef('test');

	function updateKeysArr(uppercaseKey) {
		setKeysArr(keysArr => [...keysArr, uppercaseKey])
	}

	// useGamepads(gamepads => {
	// 	setGamepads(Object.values(gamepads))
	// })

	useEffect(() => {
		window.localStorage.setItem('buttons', JSON.stringify(keysArr))
	}, [keysArr])

	function testKeyInput({ key }) {
		if ( allowedKeys.includes(key.toLowerCase()) ) {
			const uppercaseKey = key.toUpperCase();
			updateKeysArr(uppercaseKey);
		}
	}

	function testGamepadInput( button ) {
		console.log(button)
		if ( allowedKeys.includes(button.toLowerCase()) ) {
			const uppercaseKey = button.toUpperCase();
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


	// useEffect(() => {
	// 	if(gamepad) {
	// 		console.log(gamepad.buttons)
	// 	}
	// }, [gamepad])


	const div = keysArr.map( (item) => {
		const uniqueId = uuidv4();
		return (
			<button className={'button-symbol ' + 'button-' + item.toLowerCase()} key={uniqueId}>{item}</button>
		)

	} );


	return div;
}

function App() {

	const [gamePadState, setGamePadState] = useState(() => navigator.getGamepads()[0]);
	const clickRef = useRef({});

	// if(gamePadState){

	// 	let gamepadArr = Object.values(gamePadState)[0];


	// 	console.log(gamepadArr)
	// 	// if(gamepadArr) {

	// 	// 	let test = Object.values(gamepadArr);
	// 	// 	console.log(test)

	// 	// }
	// 	// if(gamepadArr[0]['buttons']) {

	// 	// 	let test = gamepadArr[0]['buttons'];
	// 	// }
	// }

	function pollgamepads() {
		return navigator.getGamepads();
	}

	function tick() {
		// Set the gamePadState from pollGamepads
		// call tick() recusively
		setGamePadState(pollgamepads())
		window.requestAnimationFrame(() => tick())
		//console.log(gamePadState)
	}

	useEffect(() => {
		tick();

		if(gamePadState) {
			const gamePadArr = Object.values(gamePadState)

			if(gamePadArr[0] !== null) {
				clickRef.current = gamePadArr[0];

				// console.log(clickRef.current.buttons[0].pressed)
				if(clickRef.current.buttons[0].pressed === true) {
					console.log('oh yeah')
				}
			}
		}
	},[gamePadState])


	// if(gamepadArr) {
	// }

  return (
    <div className="App">
		<div className="container">
			<div className="info">Connect your controller.
			</div>
			<div className="button-area">

			{/* {gamePadState.map((item) =>
				item
			)} */}
				{ KeysPressed() }
			</div>
		</div>
    </div>
  );
}

export default App;
