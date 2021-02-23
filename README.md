# IsKHubSlow
Hi! I check if KHub's response time is slow and tweets it, inspired by the idea of [@IsKHubDown](https://twitter.com/IsKHubDown "@IsKHubDown") on Twitter. Open-sourced, so you can fix bugs or contribute features here!

<!-- Shield batches -->
![License](https://img.shields.io/github/license/xyr11/iskhubslow?color=blue&style=flat-square)
![Bot status](https://img.shields.io/uptimerobot/status/m787049497-77105a43774c3d08e2afb952?style=flat-square)
![Uptime ratio](https://img.shields.io/uptimerobot/ratio/7/m787049497-77105a43774c3d08e2afb952?label=uptime%20ratio&style=flat-square) 
![Twitter](https://img.shields.io/twitter/follow/IsKHubSlow?color=blue&style=flat-square)

> ## Table of Contents
> [Planned Features](#planned-features) <br>
> [Technical Info](#technical-info) <br>
> [Development goals](#development-goals) <br>
> [License](#license)

## Planned Features
For starters, here's what I *plan* to do:
- Request data every minute from an API that checks every 5 minutes (so theoretically, the max delay on my systems would be 5.99 minutes)
- Determines if current response time is above "average" (the normal value) using gathered data by using math and statistics like T-test (Creator's note: it's hard to learn this types of stuff, and it's HARDER to put code that automatically computes for this things)
- Condense information and tweets the results
- I also tweet routinely every 4 hours about current statuses of KHub

## Technical info
### Hosted on
The bot is hosted on [Repl.it](https://repl.it/@xyr11/iskhubslow)

### Language
Node.js

### Modules
npm, express, dotenv, request, body-parser, fs, twit

## Development goals
Status | Description
--- | ---
✅ | Start the project, figuring out a plan on how to do it, pick essential modules
🟡 | Code of the initial functions in vanilla Javascript (how to figure out if the response time is above "average", condense the results)
❌ | After proven good thru testing, implement the database sytem and the tweeting system
❌ | Beta period, run the code, debug if there are any errors, ask for feedback, repeat
❌ | v1 launch!

## License
The source code of this project is released under [MIT license](https://github.com/xyr11/xtrike-bot/blob/main/LICENSE)

### *Thanks for checking out!*
