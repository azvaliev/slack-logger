import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "./lib/api-gateway";
import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	return formatJSONResponse({
		message: 'hello',
		event
	})
}

export default handler;