export default {
  type: "object",
  properties: {
    file: { type: 'string' },
		error: { type: 'string' },
  },
  required: ['file', 'error']
} as const;
