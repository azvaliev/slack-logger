export default {
	type: 'object',
	properties: {
		location: { type: 'string' },
		fileName: { type: 'string' },
		log: { type: 'string' },
		level: { type: 'string' },
	},
	required: ['fileName', 'log'],
} as const;
