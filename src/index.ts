import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from './lib/api-gateway.js';
import schema from './schema.js';

export const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	if (!process.env.SLACK_WEBHOOK) throw new Error('Slack endpoint missing');

	const fetch = (await import('node-fetch')).default;

	const log = JSON.parse(event.body);

	const response = await fetch(process.env.SLACK_WEBHOOK, {
		method: 'POST',
		body: JSON.stringify({
			blocks: [
				{
					type: 'header',
					text: {
						type: 'plain_text',
						text: 'Error',
						emoji: true,
					},
				},
			],
			attachments: [
				{
					fallback: `Error: ${log.error} ${log.file} ${log.function}`,
					color: '#2eb886',
					title: 'Message:',
					text: `This error occured in ${log.function ? `the function *${log.function}*, ` : ''}filename *${log.file}*`,
					fields: [
						{
							title: 'Error Message',
							value: `\`\`\`${log.error}\`\`\``,
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
