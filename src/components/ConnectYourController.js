import { useEffect } from "react";


function ConnectYourController({ gamePadState, clickRef }) {
	//console.log(gamePadState)
	useEffect(() => {



		//const gamePadArr = Object.values(gamePadState);

		// if (gamePadArr[0] !== null) {
		// 	clickRef.current = gamePadArr[0];
		// }

	}, [clickRef])

	return (
		<div className="info">{clickRef.current.id ? clickRef.current.id : 'Connect your controller'}</div>
	)
}

export default ConnectYourController;