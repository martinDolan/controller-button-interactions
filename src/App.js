import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from "react";

function useKeyPress(targetKey) {

	const [keyPressed, setKeyPressed] = useState(false);

	function downHandler({ key }) {
	  if (key === targetKey) {
		setKeyPressed(true);
	  }
	}

	const upHandler = ({ key }) => {
	  if (key === targetKey) {
		setKeyPressed(false);
	  }
	};

	useEffect(() => {
	  window.addEventListener("keydown", downHandler);
	  window.addEventListener("keyup", upHandler);

	  // Remove event listeners on cleanup
	  return () => {
		window.removeEventListener("keydown", downHandler);
		window.removeEventListener("keyup", upHandler);
	  };
	}, []);
	return keyPressed;
}

function App() {

	const xPress = useKeyPress("x");
	const yPress = useKeyPress("y");
	const aPress = useKeyPress("a");
	const bPress = useKeyPress("b");

  return (
    <div className="App">
		<div class="container">
			<div class="button-area">

				Connect your controller.

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
