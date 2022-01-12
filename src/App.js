import './App.css';
import React from 'react';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

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


	//const div = keysArr.map( item => (<div id="">{item}</div>) );
	const div = keysArr.map( (item) => {
		const uniqueId = uuidv4();
		return (
			<div className={'button-symbol ' + 'button-' + item.toLowerCase()} key={uniqueId}>{item}</div>
		)

	} );


	return div;
}

function App() {

  return (
    <div className="App">
		<div className="container">
			<div className="info">Connect your controller.</div>
			<div className="button-area">
				{ KeysPressed() }
			</div>
		</div>
    </div>
  );
}

export default App;
