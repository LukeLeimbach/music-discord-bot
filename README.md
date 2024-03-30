# Wall Music

This is a showcase of both my newest passion project and my ability to learn new technologies quickly. This project is not done, so check my commits to see what I'm working on.

Link to hosted site: [Wall Music Dashboard](https://wall-music-discord-bot.web.app)

## Description
This app is the combination of a Discord bot and a web app that work in tandem to provide a user friendly music streaming service inside of Discord. All you have to do is invite the bot to your server, create a text channel for it to live in, and enjoy your music. To ensure that you enjoy your music your own way, you can stream music over Spotify, YouTube, or mp3 files *(WIP)*. Your queue is stored on the cloud, so you can control your music from either inside Discord or on the [Wall Music Dashboard](https://wall-music-discord-bot.web.app).

## Web App Reproducability

In order to get the web app running locally, follow these steps:
### Clone the repository
```console
user:~$ git clone https://github.com/LukeLeimbach/music-discord-bot.git
```
### Install the dependencies
```console
user:~$ npm i
```
### Create the build file
```console
user:~$ ionic build
```
### Serve the build
```console
user:~$ ionic serve
```
### Set up your .env in the outermost directory
```
REACT_APP_FIREBASE_API_KEY=[your-key]
REACT_APP_SPOTIFY_CLIENT_ID=[your-key]
REACT_APP_SPOTIFY_CLIENT_SECRET=[your-key]
REACT_APP_DEV_GUILD_ID=[your-key]
```

Now of course, you don't have my precious secret API keys, so you'll have to set up the Firebase and Spotify API keys yourself. Now why go through all that trouble when you could just use the hosted site.

## Discord Reproducability
### Create your config.json
Create this config file in the `bot/` directory.
```
{
  "token": "[your-token]",           <- Your bot's secret auth token
  "clientId": "924079497412767844",  <- Bot's id (not secret)
  "devGuildId": "[your-id]",         <- This is a server (guild) id
  "devTestChannelId": "[your-id]"    <- This is a text-channel id
}
```
### Run the bot
```console
user:~$ npm .
```

Please note, the Discord bot is a major work in progress at the moment.

## Stack
My stack is called FNoRFIo.
- Firebase Functions
- NodeJs
- React
- Firestore
- Ionic Framework
