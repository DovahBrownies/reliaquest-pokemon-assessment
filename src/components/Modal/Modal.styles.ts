const styles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.85)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
	},
	modal: {
		borderRadius: '0.5rem',
		padding: '1rem',
	},
	closeButton: {
		position: 'absolute',
		right: '1rem',
		top: '1rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '5rem',
		height: '5rem',
		backgroundColor: 'black',
		border: '0.2rem solid white',
		cursor: 'pointer',
		fontSize: '4em',
		borderRadius: '100%',
	},
};

export default styles;