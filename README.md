<br />
<p align="center">
  <a href="https://github.com/xyr11/iskhubslow">
    <img src="https://raw.githubusercontent.com/xyr11/iskhubslow/api-changes/images/icon-large.png" alt="IsKHubSlow icon" title="@IsKHubSlow profile picture" width="120" height="120">
  </a>
  <h3 align="center">IsKHubSlow API (under development)</h3>
  <p align="center">
    Check whether any of the KHubs are slow
  </p>
  <p align="center">
    <a href="https://github.com/xyr11/iskhubslow"><img src="https://img.shields.io/uptimerobot/status/m787049497-77105a43774c3d08e2afb952?style=flat-square"></a> <a href="https://github.com/xyr11/iskhubslow"><img src="https://img.shields.io/uptimerobot/ratio/7/m787049497-77105a43774c3d08e2afb952?label=Uptime%20%287%20days%29&style=flat-square"></a> <a href="https://twitter.com/IsKHubSlow"><img src="https://img.shields.io/twitter/follow/IsKHubSlow?color=blue&style=flat-square"></a>
  </p>
</p>
<br />

<details open="open">
  <summary>Table of Contents</summary>

1. [About the API](#about-the-api)
   + [Features](#features)
   + [Build With](#built-with)
2. [Getting Started](#getting-started)
   <!--
   + [Prerequisites](#prerequisites)
   + [Usage](#usage)
     + [Formats](#formats)
     + [Options](#options)
     + [Sample Code](#sample-code)
   -->
4. [Changelogs](#changelogs)
5. [Author](#author)
6. [License](#license)
7. [Acknowledgements](#acknowledgements)

</details>

# About the API
The IsKHubSlow API fetches the current response times of all the Pisay KHubs (see list below) and determines if they are slow based on current and past data. This project is NOT associated with PSHS and Moodle. Official Twitter: [@IsKHubSlow](https://twitter.com/IsKHubSlow)

List of KHubs included: [BRC](https://khub.brc.pshs.edu.ph/), [CARC](https://khub.carc.pshs.edu.ph/), [CBZRC](https://khub.cbzrc.pshs.edu.ph/), [CLC](https://khub.clc.pshs.edu.ph), [CMC](https://khub.cmc.pshs.edu.ph/), [CRC](https://khub.crc.pshs.edu.ph/), [CVC](https://khub.cvc.pshs.edu.ph/), [CVisC](https://khub.cvisc.pshs.edu.ph/), [EVC](https://khub.evc.pshs.edu.ph/), [IRC](https://khub.irc.pshs.edu.ph/), [MC](https://khub.mc.pshs.edu.ph/), [MRC](https://khub.mrc.pshs.edu.ph/), [SMC](https://khub.smc.pshs.edu.ph/), [SRC](https://khub.src.pshs.edu.ph/), [WVC](https://khub.wvc.pshs.edu.ph/), [ZRC](https://khub.zrc.pshs.edu.ph/) <span style="font-size:10px">(yes i visited all of them, and not to be biased but the ones that look better are the CLC, CRC, IRC, and MC KHubs)</span>

## Features
- Request data from UptimeRobot API that checks for response times
- Determines if current response time is slow using historical data and an algorithm
- Returns data on a specified endpoint as an API

## Built With
+ Node.js
+ UptimeRobot API
+ Replit database

# Getting Started

This API is currently under development and you cannot fetch anything yet.

<!--
GREETINGS, INTELLECTUAL READER. THIS TEXT IS HIDDEN FOR REGULAR PEOPLE TO SEE BECAUSE THE TEXT HERE IS JUST A ROUGH GUIDE, AND NOTHING HAS BEEN IMPLEMENTED YET. PROCEED WITH CAUTION.

## Prerequisites
+ Javascript or any other languages that support fetching from a URL

## Usage

### Formats
Responses are currently served in JSON only, but this may change in the future.

### Options
#### campus *[Required]*
(array) A valid PSHS campus acronym, regardless of capitalization. Example: `['MC']` for a single campus and `['CVC', 'CVISC']` for multiple campuses

---
#### isslow *[Default is true]*
(boolean) Whether to display current status of each KHubs as either "normal", "slow", or "down"

---
#### past *[Default is 0]*
(integer) Return the past respone times (in ms) of each KHubs up to the specified number. Max is 256. Returned items may be fewer than expected because of lack of data.

---
#### current *[Default is true]*
(boolean) Whether to show the current response time of each KHubs (in ms)

### Sample Code
Node.js Requests:
```js
// URL: https://iskhubslow.xyr11.repl.co/api
var options = {
  campus: ['brc', 'cvc', 'mc'],
  past: 10
}

// ??????? idk what next
```
-->

# Changelogs

## May 2021 Rewrite
Complete rewrite of the repo, separating the Twitter bot and making the API stand-alone

# Author
Xyrus Kurt Roldan
+ Twitter: [@xy_rus](https://twitter.com/xy_rus)
+ Project link: https://github.com/xyr11/iskhubslow

# License
Distributed under the MIT License. See [LICENSE](https://github.com/xyr11/xtrike-bot/blob/main/LICENSE) for more information.

# Acknowledgements
+ [Replit](https://repl.it) for the API hosting and database
+ [UptimeRobot API](https://uptimerobot.com/api/) for data fetching
+ [@IsKHubDown](https://twitter.com/IsKHubDown) for the original idea
