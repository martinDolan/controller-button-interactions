import './App.css';
import React from 'react';
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useGamepads } from 'react-gamepads';
import debounce from 'lodash.debounce';
import AwesomeDebouncePromise from 'awesome-debounce-promise'


// const myGamepad = navigator.getGamepads();
// console.log(myGamepad[0])

// window.addEventListener("gamepadbuttondown", function(e){
// 	// Button down
// 	console.log(

// 	   "Button down",
// 	   e.button, // Index of button in buttons array
// 	   e.gamepad

// 	);
//  });

// setInterval(() => {
//     const myGamepad = navigator.getGamepads()[0];
//     console.log(`Left stick at (${myGamepad.axes[0]}, ${myGamepad.axes[1]})` );
//     console.log(`Right stick at (${myGamepad.axes[2]}, ${myGamepad.axes[3]})` );
// }, 100)


function KeysPressed() {

	const [gamepads, setGamepads] = useState([]);
	const [gamepad, setGamepad] = useState(() => navigator.getGamepads()[0]);

	//console.log('gamepad', gamepad)

	// useEffect(() => {

	// 	console.log(gamepad)
	// }, [gamepad])



	const [keysArr, setKeysArr] = useState(
		() => JSON.parse(window.localStorage.getItem('buttons')) || Array(0),
	);

	const allowedKeys = ['x', 'y', 'a', 'b'];

	let debouncedKey = useRef('test');

	function updateKeysArr(uppercaseKey) {
		setKeysArr(keysArr => [...keysArr, uppercaseKey])
	}

	useGamepads(gamepads => {
		setGamepads(Object.values(gamepads))
	})

	useEffect(() => {
		window.localStorage.setItem('buttons', JSON.stringify(keysArr))
	}, [keysArr])

	function testKeyInput({ key }) {
		console.log(key)
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
	// 	if(gamepads[0]) {
	// 		console.log(gamepads[0].buttons[0])
	// 		if(gamepads[0].buttons[0]) {
	// 			//console.log(gamepads[0].buttons[0])
	// 			// const test = testGamepadInput('a');
	// 			// console.log(test)
	// 			testGamepadInput('a')
	// 			//return AwesomeDebouncePromise(() => testGamepadInput('a'), 500)
	// 		}
	// 		//console.log(gamepads[0].buttons[0].pressed)
	// 	}
	// }, [gamepads[0]])

	useEffect(() => {
		if(gamepad) {
			// console.log(gamepad[0].buttons[0])
			console.log(gamepad.buttons)
			// if(gamepad[0].buttons[0]) {
			// 	//console.log(gamepad[0].buttons[0])
			// 	// const test = testGamepadInput('a');
			// 	// console.log(test)
			// 	//testGamepadInput('a')
			// 	//return AwesomeDebouncePromise(() => testGamepadInput('a'), 500)
			// }
			//console.log(gamepad[0].buttons[0].pressed)
		}
	}, [gamepad])


	const div = keysArr.map( (item) => {
		const uniqueId = uuidv4();
		return (
			<button className={'button-symbol ' + 'button-' + item.toLowerCase()} key={uniqueId}>{item}</button>
		)

	} );


	return div;
}

function App() {

	// const [gamepads, setGamepads] = useState([]);

	// useGamepads(gamepads => {
	// 	setGamepads(Object.values(gamepads))
	// })

	// if(gamepads && gamepads[0]) {
	// 	console.log(gamepads[0].buttons[0].pressed)
	// }
	// useGamepads( gamepads => setGamepads(gamepads));
	// console.log(gamepads[0].buttons)

  return (
    <div className="App">
		<div className="container">
			<div className="info">Connect your controller.
			{/* {gamepads.length && gamepads.map(gp => {
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
			})} */}
			</div>
			<div className="button-area">
				{ KeysPressed() }
			</div>
		</div>
    </div>
  );
}

export default App;
