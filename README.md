![License](https://img.shields.io/github/license/xyr11/iskhubslow?color=blue&style=flat-square)
![Bot status](https://img.shields.io/uptimerobot/status/m787049497-77105a43774c3d08e2afb952?style=flat-square)
![Uptime ratio](https://img.shields.io/uptimerobot/ratio/7/m787049497-77105a43774c3d08e2afb952?label=uptime%20ratio&style=flat-square) 
![Twitter](https://img.shields.io/twitter/follow/IsKHubSlow?color=blue&style=flat-square)

<br />
<p align="center">
  <a href="https://github.com/xyr11/iskhubslow">
    <img src="https://pbs.twimg.com/profile_images/1364194963504852994/dyZu1ojE_400x400.png" alt="@IsKHubSlow profile picture" title="@IsKHubSlow profile picture" width="120" height="120" style="border-radius:50%">
  </a>
  <h3 align="center"><a href="https://twitter.com/IsKHubSlow/" style="color:inherit">IsKHubSlow</a></h3>
  <p align="center">
    A bot that checks if KHub is slow and tweets it.
    <br />
    <a href="https://twitter.com/IsKHubSlow/">See it LIVE!</a>
    ·
    <a href="https://github.com/xyr11/iskhubslow/issues">Report Bug</a>
    ·
    <a href="https://github.com/xyr11/iskhubslow/issues">Request Feature</a>
  </p>
</p>
<br />

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the Project</a>
      <ul>
        <li><a href="#planned-features">Planned Features</a></li>
        <li><a href="#built-with">Build With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#development-status">Development status</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#author">Author</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

# About the Project
IsKHubSlow is a bot that checks if KHub is slow based on its response time and tweets it, inspired by the idea of [@IsKHubDown](https://twitter.com/IsKHubDown "@IsKHubDown") on Twitter. Open-sourced here on GitHub!

## Planned Features
For starters, here's what I *plan* to do:
- Request data every minute from an API that checks every 5 minutes
- Determines if current response time is above "average" (the normal value) using data
- Condense information and tweets the results
- I also tweet routinely every 4 hours about current statuses of KHub

## Built With
+ Node.js
+ Twitter API v2
+ UptimeRobot API
+ MongoDB database

# Getting Started

## Prerequisites
+ Twitter Developer account: if you don’t have one already, you can [apply for one](https://developer.twitter.com/en/apply-for-access.html).
+ A Twitter developer app, which can be created in your Twitter developer account.
+ "Read and Write" permissions to your app (Project Settings > App permissions)
+ Your `API key`, `API key secret`, `Access token`, and `Access token secret` from your app in the [Twitter developer portal](https://developer.twitter.com/en/docs/developer-portal/overview)
+ [Node.js](https://nodejs.org/en/download/)
+ npm (This is automatically installed with Node.)

<details id="twitter-bot-instructions">
  <summary>Click for detailed instructions relating to all things Twitter bot account related</summary>
  <ol>
    <li>Create a new Twitter account</li>
    <li>Go to <a href="https://developer.twitter.com/en/application">https://developer.twitter.com/en/application</a> and apply for a developer account by following the instructions given</li>
    <li>Go to the Developer dashboard at <a href="https://developer.twitter.com/en/portal/dashboard">https://developer.twitter.com/en/portal/dashboard</a> and create a project. When you create a project, you should also be able to create an app.</li>
    <li>Go to the app that you created and go to its app settings. Go to "App permissions", click edit, and choose "Read and Write" so that your account will be able to 'write' tweets. Press "Save".</li>
    <li>Go back to the app settings and navigate to the "Keys and tokens" part (below your app name).
      <ul>
        <li>Press "Regenerate" on the "API key &amp; secret" part and copy your <code>API key</code> and <code>API key secret</code> values.</li>
        <li>Press "Generate" on the "Access token &amp; secret" part and copy your <code>Access token</code> and <code>Access token secret</code> values.</li>
      </ul>
    </li>
  </ol>
</details>

## Installation

1. Clone the repository 
   ```
   git clone https://github.com/xyr11/iskhubslow
   ```
2. Install NPM packages
   ```
   npm install
   ```
3. Add a new file called `.env` and add this inside:
   ```
   TWIT_APIKEY=your-api-key
   TWIT_APISECRET=your-api-key-secret
   TWIT_ACCTOKEN=your-access-token
   TWIT_ACCSECRET=your-access-secret
   ```
   for example:
   ```
   TWIT_APIKEY=AbCdEfGhIjKlMnOpQrStUvWxY
   TWIT_APISECRET=AbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWx
   TWIT_ACCTOKEN=0123456789012345678-AbCdEfGhIjKlMnOpQrStUvWxYzAbCd
   TWIT_ACCSECRET=AbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrS
   ```
4. Get the bot up and running!
   ```
   npm start
   ```

# Development status
Status | Description
:---: | ---
✅ | Start the project, figuring out a plan on how to do it, pick essential modules
🟡 | Build system that receives data, stores in database, tweets in certain times
🟡 | How to figure out if the response time is above "average", condense the results, error mitigation, automation system
❌ | Beta period, run the code, debug if there are any errors, ask for feedback, repeat
❌ | v1 launch, replit hosting

# Author
Xyrus Kurt Roldan
+ Website: [XYR.codes](https://xyr.codes/)
+ Twitter: [@xy_rus](https://twitter.com/xy_rus)
+ Project link: https://github.com/xyr11/iskhubslow

# License
Distributed under the MIT License. See [`LICENSE`](https://github.com/xyr11/xtrike-bot/blob/main/LICENSE) for more information.

# Acknowledgements
+ [Replit](https://repl.it) for the bot hosting
+ [UptimeRobot API](https://uptimerobot.com/api/) for data fetching
+ [@IsKHubDown](https://twitter.com/IsKHubDown "@IsKHubDown") for the original idea
