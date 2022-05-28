export default {
	type: 'string',
	properties: {
		function: { type: 'string' },
		file: { type: 'string' },
		error: { type: 'string' },
	},
	required: ['file', 'error'],
} as const;
