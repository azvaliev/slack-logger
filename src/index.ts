import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from './lib/api-gateway.js';

import schema from './schema.js';

const colors = {
	success: '#2eb886',
	warning: '#fcba03',
	error: '#ed3f18',
	info: '#4278f5',
};

const logger: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	if (!process.env.SLACK_WEBHOOK) throw new Error('Slack endpoint missing');

	const fetch = (await import('node-fetch')).default;

	const {
		log, fileName, location,
	} = event.body;
	let { level } = event.body;

	// If level is not one of the object keys or is not set, set to error
	if (!level || !new Set(Object.keys(colors)).has(level)) level = 'error';

	const response = await fetch(process.env.SLACK_WEBHOOK, {
		method: 'POST',
		body: JSON.stringify({
			blocks: [
				{
					type: 'header',
					text: {
						type: 'plain_text',
						text: level,
						emoji: true,
					},
				},
			],
			attachments: [
				{
					fallback: `${level}: ${log} ${fileName} ${location}`,
					color: colors[level],
					title: 'message:',
					text: `this error occured in ${location ? `*${location}*, ` : ''}filename *${fileName}*`,
					fields: [
						{
							title: 'logs:',
							value: `\`\`\`${log}\`\`\``,
							short: false,
						},
					],
				},
			],

		}),
	});
	const result = (await response.text()).trim();
	if (result !== 'ok') throw new Error(result);

	return formatJSONResponse({
		result,
	});
};

export const handler = middy(logger).use(middyJsonBodyParser());
