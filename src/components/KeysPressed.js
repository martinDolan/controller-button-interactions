import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function KeysPressed({ gamePadState, setGamePadState, clickRef }) {
	function pollgamepads() {
		return navigator.getGamepads();
	}

	function tick() {
		setGamePadState(pollgamepads());
		window.requestAnimationFrame(() => tick());
	}

	useEffect(() => {
		tick();
	}, []);

	useEffect(() => {

		if (gamePadState) {
			const gamePadArr = Object.values(gamePadState);

			if (gamePadArr[0] !== null) {
				clickRef.current = gamePadArr[0];

				const aPressed = clickRef.current.buttons[0].pressed;
				const bPressed = clickRef.current.buttons[1].pressed;
				const xPressed = clickRef.current.buttons[2].pressed;
				const yPressed = clickRef.current.buttons[3].pressed;

				if (aPressed === true) {
					testKeyInput({ key: "a" });
				}

				if (bPressed === true) {
					testKeyInput({ key: "b" });
				}

				if (xPressed === true) {
					testKeyInput({ key: "x" });
				}

				if (yPressed === true) {
					testKeyInput({ key: "y" });
				}
			}
		}
	}, [gamePadState]);

	const [keysArr, setKeysArr] = useState(
		() => JSON.parse(window.localStorage.getItem("buttons")) || Array(0)
	);

	const allowedKeys = ["x", "y", "a", "b"];

	function updateKeysArr(uppercaseKey) {
		setKeysArr((keysArr) => [...keysArr, uppercaseKey]);
	}

	useEffect(() => {
		window.localStorage.setItem("buttons", JSON.stringify(keysArr));
	}, [keysArr]);

	function testKeyInput({ key }) {
		if (allowedKeys.includes(key.toLowerCase())) {
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

	const div = keysArr.map((item) => {
		const uniqueId = uuidv4();
		return (
			<button
				className={"button-symbol " + "button-" + item.toLowerCase()}
				key={uniqueId}
			>
				{item}
			</button>
		);
	});

	return div;
}

export default KeysPressed;
