import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from "react";
import { useGamepads } from 'react-gamepads';
import useKeyPress from './utils/useKeyPress';

function App() {

	const [gamepads, setGamepads] = useState([]);
	const keysPressedArr = ['X', 'X', 'A', 'B', 'Y'];

	useGamepads( _gamepads => {
		setGamepads(_gamepads)
	} )

	const xPress = useKeyPress("x");
	const yPress = useKeyPress("y");
	const aPress = useKeyPress("a");
	const bPress = useKeyPress("b");

  return (
    <div className="App">
		<div class="container">
				Connect your controller.
			<div class="button-area">

				{keysPressedArr}
				{xPress && "X"}
				{yPress && "Y"}
				{aPress && "A"}
				{bPress && "B"}

			</div>
		</div>
    </div>
  );
}

export default App;
