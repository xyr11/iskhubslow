const express = require('express')
const dotenv = require('dotenv')
const request = require('request')
const bodyParser = require('body-parser')
const fs = require('fs')
const jStat = require('jstat')
const Twit = require('twit')
const Database = require('@replit/database')

const app = express()
app.use(bodyParser.json())

dotenv.config()

const uptimerobotKey = 'ur1193341-6572cf68c41bac3ba466f3b5' // uptime robot read-only key
const dbMaxSize = 1000 // max 5MB (5,000,000 bytes) per value, ~10 bytes per response time, 5,000,000 / 10 = 500,000

const db = new Database()

const routineCheck = 5 * 60 // routine tweets every n seconds
const khubNames = ['BRC', 'CARC', 'CBZRC', 'CLC', 'CMC', 'CRC', 'CVC', 'CVisC', 'EVC', 'IRC', 'MC', 'MRC', 'SMC', 'SRC', 'WVC', 'ZRC']
const khubIds = [787225660, 787225654, 787225658, 787225655, 787225666, 787225672, 787225653, 787225662, 787225665, 787225651, 787225656, 787225659, 787225667, 787225671, 787225661, 787225674]
const khubReg = [8, 2, 4, 13, 6, 16, 3, 10, 11, 1, 5, 7, 14, 15, 9, 12] // sort by region
let response = []
let dataCache = []
let status = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
/*
 * RESPONSE TIMES
 * 0 - khub is down
 * 1 - response time is good
 * 2 - khub is slow
 * 8 - service unavailable: lack of data from database
 * 9 - service unavailable: lack of fetched data
 */

const jsonOutput = {
  message: 'Hey there, young fellow. Glad to see you here. We\'re no strangers to love, you know the rules and so do I. A full commitment\'s what I\'m thinking of, you wouldn\'t get this from any other guy, I just wanna tell you how I\'m feeling, gotta make you understand... Never gonna give you up, never gonna let you down, never gonna run around and desert you; Never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you.',
  khub: []
}

// function that tweets to our bot account
const T = new Twit({ consumer_key: process.env.TWIT_APIKEY, consumer_secret: process.env.TWIT_APISECRET, access_token: process.env.TWIT_ACCTOKEN, access_token_secret: process.env.TWIT_ACCSECRET })
const tweet = tweetTxt => T.post('statuses/update', { status: tweetTxt }, function (err, data, res) {
  if (err) console.log('⚠ ', err)
  else console.log(`💬 New tweet! twitter.com/IsKHubSlow/status/${data.id_str}`)
})

// convert to timezone
const convertTZ = (date, tzString) => {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }))
}

// time string: Jan 01 01:01am
const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const add0 = number => {
  return number < 10 ? '0' + number : number
}
const timeStr = dt => {
  return m[dt.getMonth()] + ' ' + add0(dt.getDate()) + ' ' + (dt.getHours() > 12 ? add0(dt.getHours() - 12) : add0(dt.getHours())) + ':' + add0(dt.getMinutes()) + (dt.getHours() > 12 ? 'pm' : 'am')
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)) // sleep() to simulate blocking because nodejs is asynchronous

// simple function that gets data from uptimerobot api
const options = {
  method: 'POST',
  url: 'https://api.uptimerobot.com/v2/getMonitors',
  headers: { 'cache-control': 'no-cache', 'content-type': 'application/x-www-form-urlencoded' },
  form: { api_key: uptimerobotKey, format: 'json', response_times: '1' }
}
const getData = () => new Promise(function (resolve, reject) {
  request(options, async (err, res, body) => {
    if (err) return reject(err)
    resolve(filterResponseData(JSON.parse(body).monitors))
  })
})

// if there is an error, set status code of the respective khub and say it on console
function isError (khubId, errorDescription) {
  const x = khubIds.find(khubId)
  if (typeof x === 'undefined') console.error('Invalid KHub ID')
  status[x] = 8
  console.log(`Error: ${khubNames[x]} khub (id ${khubIds[x]}) ${errorDescription}`)
  return 0
}

// filter response time data
function filterResponseData (inputArray) {
  const returnVal = []
  for (let i = 0; i < khubIds.length; i++) {
    const m = inputArray
    let val = null

    for (let j = 0; j < m.length; j++) {
      if (khubIds[i] === m[j].id) { val = m[j].response_times; break } // get response times
    }

    if (Array.isArray(val)) { // check if foundVal is array
      for (let j = 0; j < val.length; j++) {
        // remove the 'datetime' property
        if (typeof val[j].datetime !== 'undefined') delete val[j].datetime

        val[j] = val[j].value
        // check if the 'value' property is a valid number
        if (typeof val[j] !== 'number') val = isError(i, 'response time is invalid')
      }
    } else {
      val = isError(i, 'response time is invalid')
    }

    returnVal[i] = val
  }
  return returnVal
}

// check every ~1 minute
async function main () {
  const d = new Date() // date

  let fetched
  await getData().then(data => { fetched = data }).catch(console.error)
  for (let i = 0; i < khubIds.length; i++) {
    await db.get(`khubdb${i}`).then(async dbData => {
      let newData = fetched[i]
      response[i] = newData[0]

      if (!dbData || dbData.length < 20) {
        status[i] = 8
        console.log(`🔴 ${khubNames[i]} KHub #${i} too few data in database [${timeStr(convertTZ(d, 'Asia/Manila'))}] ⚠️`)
        newData.splice(0,1) // remove current response time
        await db.set(`khubdb${i}`, newData).catch(console.error) // save to db
        dbData = newData
      } else if (!newData) {
        status[i] = 9
        console.log(`🔴 ${khubNames[i]} KHub #${i} too few data fetched [${timeStr(convertTZ(d, 'Asia/Manila'))}] ⚠️`)
        newData = []
      } else if (dbData.length > dbMaxSize - 1) {
        dbData.splice(dbMaxSize, dbData.length) // check if database has more data than dbMaxSize (so that we won't blow our memory)
      }

      // check for new response times
      if (dbData[0] !== response[i]) {
        // console.log(`⭐  Detected new response times for ${khubNames[i]} KHub (${timeStr(convertTZ(d, 'Asia/Manila'))})`) // for testing

        const sd = Math.floor(await jStat.stdev(dbData, true))
        const p50 = Math.floor(await jStat.percentile(dbData, 0.5))
        const upperLimit = Math.ceil((p50 + sd) / 10) * 10 // round to tens place
        const lowerLimit = Math.ceil((p50 - sd) / 10) * 10 // round to tens place
        const mean = Math.floor(await jStat.mean(dbData))

        if (Math.ceil(response[i] / 10) * 10 > upperLimit && status[i] !== 2) {
          status[i] = 2
          // await tweet(`⚠️ ${khubNames[i]} KHub is slow [@ ${timeStr(convertTZ(d, 'Asia/Manila'))}] 🔴 \n\n(heyy plz dont believe in me yet lol i'm still on beta)`)
          // for testing
          console.log(`🔴 ${khubNames[i]} KHub #${i} is slow: ~${Math.floor(response[i] / 10) * 10 }ms [@ ${timeStr(convertTZ(d, 'Asia/Manila'))}] ⚠️`)
          console.log(`Normal: ≤${upperLimit} | Response time: ${response[i]} ms \n`)
        }

        if (Math.ceil(response[i] / 10) * 10 < upperLimit && status[i] === 2) {
          status[i] = 1
          // await tweet(`👌 ${khubNames[i]} KHub isn't slow anymore! [@ ${timeStr(convertTZ(d, 'Asia/Manila'))}] 🟢 \n\n(hey, i'm still on beta! idk what im talking about)`)
          console.log(`🟢 ${khubNames[i]} KHub #${i} isn't slow anymore! [@ ${timeStr(convertTZ(d, 'Asia/Manila'))}] 👌 \n`) // for testing
        }
        if (newData[i] < lowerLimit + sd && newData[i] < mean) {
          status[i] = 1
          // fix dataset
          let dbDataFixed = []
          for (let j = 0; j < dbData.length; j++) {
            if (dbData[j] < lowerLimit + sd && dbData[j] < mean) {
              dbDataFixed.push(dbData[j])
            }
          }
          dbData = dbDataFixed
          // await tweet(`👌 ${khubNames[i]} KHub isn't slow anymore! [@ ${timeStr(convertTZ(d, 'Asia/Manila'))}] 🟢 \n\n(heyy pls dont believe in me yet lol i'm still on beta)`)
          console.log(`🟢 ${khubNames[i]} KHub #${i} isn't slow anymore! [@ ${timeStr(convertTZ(d, 'Asia/Manila'))}] 👌 \n`) // for testing
        }

        // add new response time to database
        if (status[i] === 1 || status[i] === 2) {
          await dbData.unshift(response[i])
        } else if (status[i] === 8) { // if there is no data in database
          dbData = newData
        }

        // save data to database
        if (status[i] !== 9) {
          await db.set(`khubdb${i}`, dbData).catch(console.error)
        } 

        // update jsonOutput
        jsonOutput.khub[i] = {
          name: khubNames[i],
          latest_response_time: response[i],
          average_response_time: await jStat.mean(dbData),
          status: status[i],
          date: d.getTime(),
          reg: khubReg[i]
        }

        // save jsonOutput var so that it doesn't get reset when bot is restarting
        // await db.set('jsonOutput', JSON.stringify([jsonOutput])).catch(console.error)
        // await db.get('jsonOutput').then(value => {
        //   if (!value || value !== jsonOutput) {
        //     db.set('jsonOutput', JSON.stringify(jsonOutput))
        //   }
        // }).catch(console.error)
      }

      if (status[i] === 9) {
        dataCache[i] = []
      } else if (dbData[0] !== response[i]) {
        dataCache[i] = [response[i], newData[1]] // add the first 2 response times to cache so that we can compare if there are new response times or not
      }
    }).catch(console.error)
  }
}

setInterval(main, 8000)

// routine check
/* let count = 0
setInterval(async function () {
  // count
  await db.get('routineCount')
    .then(value => { count = value })
    .catch(console.error)

  var rn = new Date()
  var rnm = new Date(rn.getYear()+1900+"-"+addZero(rn.getMonth()+1)+"-"+addZero(rn.getDate())+"T00:00:00+08:00")
  var timeOfDay = Math.floor((rn - rnm) / 1000) // time of day in seconds

  // e is the nth + 1 routine check tweet
  // e.g. if `e` is 3, then the next tweet from this function will be the 3rd tweet for the day
  var e = Math.floor(timeOfDay / routineCheck) + 1

  var nextUpdate = e * routineCheck
  var lDelay = (nextUpdate - Math.ceil(timeOfDay)) * 1000
  await sleep(lDelay - 1000)

  // log to console
  var timeStr = rn.toLocaleString('en-US',{timeZone:'Asia/Manila'})
  console.log("Current time:",timeStr,
  "\ntimeOfDay:",timeOfDay,"| nextUpdate:",nextUpdate,"\nlDelay:",lDelay/routineCheck,"seconds\n")
  //console.log("Current time:",timeStr)

  // test tweet ;)
  count++
  await db.set('routineCount', count)
  //tweet(`${timeStr}\n\n\n${utility.rckrll[count%utility.rckrll.length-1]}`)
}, 1000) */

// server

// for /db<number>, return the live state of the database collection
for (let i = 0; i < khubIds.length; i++) {
  app.get(`/db${i}`, async (req, res) => {
    res.type('json')
    res.set('title', `${khubNames[i]} KHub DB | IsKHubSlow Raw JSON`)
    await db.get(`khubdb${i}`).then(value => { res.end(JSON.stringify(value)) })
  })
}

// for /json, return the live state of the uptimerobot
app.get('/uptimerobot', async (req, res) => {
  res.type('json')
  res.set('title', 'UptimeRobot API | IsKHubSlow Raw JSON')
  await getData().then(fetchedData => { res.end(JSON.stringify(fetchedData)) })
})

// /data for front-end
app.get('/data', async (req, res) => {
  res.type('json')
  await db.get('jsonOutput').then(val => {
    res.end(JSON.stringify(val))
  }).catch(console.error)
  // res.end(JSON.stringify(jsonOutput))
})

db.getAll().then(val => {
  console.log(JSON.stringify(val))
})
// app.get('/db', async (req, res) => {
//   res.type('json')
//   res.end(JSON.stringify(await db.getAll()))
// })

// server front-end
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  fs.readFile('home.html', (err, data) => {
    if (err) return console.error(err)
    res.end(data.toString())
  })
})

// open server only AFTER db is connected
app.listen(3000, () => console.log('🚀 Server up and running \n'))
