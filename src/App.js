import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from "react";
import { useGamepads } from 'react-gamepads';

// function updateKeysPressed(targetKey) {
// 	setKeysArr([targetKey])
// }



// function updateKeysPressed() {
// 	console.log('yo')
// }


function KeysPressed() {


	const [keysArr, setKeysArr] = useState([]);

	const allowedKeys = ['x', 'y', 'a', 'b'];
	function test({ key }) {

		if ( allowedKeys.includes(key.toLowerCase()) ) {
			const uppercaseKey = key.toUpperCase();
			setKeysArr(keysArr => [...keysArr, uppercaseKey])
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", test);

		// Remove event listeners on cleanup
		return () => {
		  window.removeEventListener("keydown", test);
		};
	  }, []);


	const div = keysArr.map( item => <div>{item}</div> );

	return div;
}


// function useKeyPress(targetKey) {

// 	const [keyPressed, setKeyPressed] = useState(false);

// 	// const [keysThatHaveBeenPressed, setkeysThatHaveBeenPressed] = useState(['test']);
// 	// console.log(keysThatHaveBeenPressed);

// 	function downHandler({ key }) {
// 	  if (key === targetKey) {
// 		setKeyPressed(true);

// 	  }
// 	}

// 	const upHandler = ({ key }) => {
// 	  if (key === targetKey) {
// 		setKeyPressed(false);
// 	  }
// 	};

// 	useEffect(() => {
// 	  window.addEventListener("keydown", downHandler);
// 	  window.addEventListener("keyup", upHandler);

// 	  // Remove event listeners on cleanup
// 	  return () => {
// 		window.removeEventListener("keydown", downHandler);
// 		window.removeEventListener("keyup", upHandler);
// 	  };
// 	}, []);
// 	return keyPressed;
// }

function App() {

	// const [gamepads, setGamepads] = useState([]);
	//const keysPressedArr = ['X', 'X', 'A', 'B', 'Y'];

	// useGamepads( _gamepads => {
	// 	setGamepads(_gamepads)
	// } )

	// useEffect(() => {
	// 	updateKeysPressed()
	// }, [])

	// const xPress = useKeyPress("x");
	// const yPress = useKeyPress("y");
	// const aPress = useKeyPress("a");
	// const bPress = useKeyPress("b");

  return (
    <div className="App">
		<div class="container">
				Connect your controller.
			<div class="button-area">

				<KeysPressed />
				{/* {keysPressedArr} */}
				{/* {xPress && "X"}
				{yPress && "Y"}
				{aPress && "A"}
				{bPress && "B"} */}

			</div>
		</div>
    </div>
  );
}

export default App;
