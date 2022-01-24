import "./App.css";
import React from "react";
import { useState, useRef } from "react";
import KeysPressed from "./components/KeysPressed";

function App() {
	const [gamePadState, setGamePadState] = useState(
		() => navigator.getGamepads()[0]
	);
	const clickRef = useRef({});

	return (
		<div className="App">
			<div className="container">
				<div className="info">Connect your controller.</div>
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
