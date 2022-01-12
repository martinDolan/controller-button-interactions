import { useState, useEffect } from "react";

function useKeyPress(targetKey) {

	const [keyPressed, setKeyPressed] = useState(false);

	const [keysThatHaveBeenPressed, setkeysThatHaveBeenPressed] = useState(['test']);
	console.log(keysThatHaveBeenPressed);

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

export default useKeyPress;