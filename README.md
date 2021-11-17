<div align="center">
    <img width="200" height="200"
      src="https://cdn.discordapp.com/attachments/880176467747680347/894393414701940816/910dd500f81e17ac76326a87b6580545.png">
  
  <h1>Pvu-Farm-Notifications</h1>
</div>

## Purpose
Gives you notifications to your telegram bot when you have new Pvu-alert and manages with your telgram bot.
e.g. Crows, Water, Harvest.
## Description
This service has been built with javascript and nodejs from scratch also with some libraries like telgraf and cronjs.
The service is running on a terminal and scheduled with cron every 1 hour for check farm status, also the service is listening to your telegram bot for commands like /start, /farm.
/farm will show you the options to choose from farm so you can choose action you want to do. eg. water, harvest, crows.
## Features
- Notifications for Crows
- Notifications for Water
- Notifications for Harvest
- Manage with your telegram bot for harvesting, water and crows

## Installation
### Requirements
- NodeJs (14.x.x)
- Visual Studio Code

### Environment Variables
create a file named `.env` in the root directory of the project and add the following variables:
- `TELEGRAM_BOT_TOKEN`: Your telegram bot token, getting from `https://core.telegram.org/bots#3-how-do-i-create-a-bot` or `https://t.me/botfather`.
- `TELEGRAM_CHAT_ID`: Your telegram chat id (e.g. 123456789).
- `PVU_TOKEN`: Your pvu token (get it from localstorage) 

### Local Deployment
To deploy the service locally, you can use the following command:
    `npm run start`
### Disclaimer
This service is not official and is only for educational purposes. And it is not deployed on any server.

### No-Gos
* Remove plants from your land is not supported by this service.
* You can't use this service to buy Pvu.
* If the pvu API is down, you can't use this service.
* This service depends enterly on the PVU Changes.
* This service is based until farm 2.5

### Instructions for use
1. Install nodejs and npm
2. Install visual studio code
3. Install the dependencies
4. Create a file named `.env` in the root directory of the project and add the variables mentioned above. (get chat id with /start command)
5. Run the service with `npm run start`.
