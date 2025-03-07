const styles = {
	wrapper: {
		display: 'inline-flex',
		flexDirection: 'column',
		fontSize: '1.25rem',
		maxWidth: '100%',
		marginBottom: '1rem',
	},
	label: {
		marginBottom: '0.25rem',
	},
  input: {
		fontSize: '1.5rem',
		background: 'none',
		border: '0.15rem solid',
		borderColor: 'rgba(255, 255, 255, 0.45)',
		borderRadius: '0.85rem',
		padding: '0 0.5rem',
		'@media (max-width: 1024px)': {
			fontSize: '1.25rem',
    },
		'&:focus': {
			borderColor: 'rgba(255, 255, 255, 1)',
		},
  },
};

export default styles;