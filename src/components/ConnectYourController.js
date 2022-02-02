function ConnectYourController({ clickRef }) {

	return (
		<div className="info">{clickRef.current.id ? clickRef.current.id : 'Connect your controller'}</div>
	)
}

export default ConnectYourController;