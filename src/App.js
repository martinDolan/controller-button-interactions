import "./App.css";
import React from "react";
import { useState, useRef } from "react";
import KeysPressed from "./components/KeysPressed";
import ConnectYourController from "./components/ConnectYourController";
import { useEffect } from "react/cjs/react.development";

function App() {
	const [gamePadState, setGamePadState] = useState(
		() => navigator.getGamepads()[0]
	);
	const clickRef = useRef({});

	useEffect(() => {
		console.log(navigator.getGamepads()[0])
	},[gamePadState])

	return (
		<div className="App">
			<div className="container">
				<ConnectYourController gamePadState={gamePadState} clickRef={clickRef} />
				<div className="button-area">
					<KeysPressed
						clickRef={clickRef}
						setGamePadState={setGamePadState}
						gamePadState={gamePadState}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
