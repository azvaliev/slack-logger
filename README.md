# Slack Logger
This is a Lambda function built as an endpoint for easy logging to Slack. I used the Serverless Framework, on top of Node.JS / TypeScript.

## Documentation

### POST - /

This endpoint is for submitting logs to be posted in a Slack channel. It takes several parameters in the body

#### fileName - *required string*
This specifies the fileName referencing the error / log.

#### log - *required string*
This is whatever text you want to be shown as a log

#### level - *optional 'error' | 'success' | 'warning' | 'info'* - default: *'error'*
This specifies the level of importance of the log, which will be displayed as part of the message and leave a color indicator

#### location - *optional string*
The location can reference functions, line numbers, whatever you please that can help you identify the location of the error

## Getting Started

Ensure you have Node.JS version 16 installed on your machine as well as [Serverless](https://www.serverless.com/framework/docs/getting-started)

Clone the repository, and install dependencies
```bash
git clone https://github.com/azvaliev/slack-logger.git
[...]
cd slack-logger
npm install
```

From there, rename the `serverless.example.yml` to `serverless.yml` and fill in missing areas
```bash
mv serverless.example.yml serverless.yml
```
```yml
org: 
app: 
# These can both be configured by creating a free account at https://serverless.com/
# and registering an app
[...]
environment:
  SLACK_WEBHOOK:
  # Configure this environment variable by visiting https://api.slack.com/apps/
  # Create a free account, register an app and create a webhook for desired channel for bot
```

### That's it! It is now configured and can be run using the following

#### Local testing

```bash
npm run dev OR sls offline
```

## Deployment

Deploying will require you to connect your Serverless account to AWS through the [dashboard](https://app.serverless.com/), and once that is done you can simply run the following.
```bash
npm run deploy OR sls deploy
[...]

✔ Service deployed to stack logging-bot-dev

dashboard: ...
endpoint: POST - YOUR_LOGBOT_ENDPOINT

```
