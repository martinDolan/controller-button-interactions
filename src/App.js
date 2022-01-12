import './App.css';
import React from 'react';
import { useState, useEffect } from "react";

function KeysPressed() {


	const [keysArr, setKeysArr] = useState(
		() => JSON.parse(window.localStorage.getItem('buttons')) || Array(0),
	);

	const allowedKeys = ['x', 'y', 'a', 'b'];

	function updateKeysArr(uppercaseKey) {
		setKeysArr(keysArr => [...keysArr, uppercaseKey])
	}

	React.useEffect(() => {
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


	const div = keysArr.map( item => <div>{item}</div> );

	return div;
}

function App() {

  return (
    <div className="App">
		<div class="container">
				Connect your controller.
			<div class="button-area">
				<KeysPressed />
			</div>
		</div>
    </div>
  );
}

export default App;
