const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

const { usernames } = require('./usernames.json')
//SETTINGS
let inValidCapePath = __dirname + '/capes/invalidcape.png'

console.log("--------------------------------------------------------------------------------------------------------------------------------------")
console.log("██████╗░███████╗██╗░░░░░███████╗████████╗███████╗░█████╗░██████╗░████████╗██╗███████╗██╗███╗░░██╗███████╗░░░███╗░░██╗███████╗████████╗")
console.log("██╔══██╗██╔════╝██║░░░░░██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝██║████╗░██║██╔════╝░░░████╗░██║██╔════╝╚══██╔══╝")
console.log("██║░░██║█████╗░░██║░░░░░█████╗░░░░░██║░░░█████╗░░██║░░██║██████╔╝░░░██║░░░██║█████╗░░██║██╔██╗██║█████╗░░░░░██╔██╗██║█████╗░░░░░██║░░░")
console.log("██║░░██║██╔══╝░░██║░░░░░██╔══╝░░░░░██║░░░██╔══╝░░██║░░██║██╔═══╝░░░░██║░░░██║██╔══╝░░██║██║╚████║██╔══╝░░░░░██║╚████║██╔══╝░░░░░██║░░░")
console.log("██████╔╝███████╗███████╗███████╗░░░██║░░░███████╗╚█████╔╝██║░░░░░░░░██║░░░██║██║░░░░░██║██║░╚███║███████╗██╗██║░╚███║███████╗░░░██║░░░")
console.log("╚═════╝░╚══════╝╚══════╝╚══════╝░░░╚═╝░░░╚══════╝░╚════╝░╚═╝░░░░░░░░╚═╝░░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚══╝╚══════╝╚═╝╚═╝░░╚══╝╚══════╝░░░╚═╝░░░")
console.log("--------------------------------------------------------------------------------------------------------------------------------------")
console.log("Cosmetic server for MCP Optifine Sources Only!")
console.log("Currently only supports Capes")
console.log("Allowing users to change capes to differnt ones and allowing upto (infinate) capes per username : not done")
console.log("Made By 1Sh0wL1ght")
console.log()

app.get('/', (req, res) => {
  console.log("New request from: " + req.ip);
  res.send('<h1>local cape system</h1>\n<h2>provided by 1sh0wl1ght</h2>')

})
app.get('/reset', (req, res) => {
  res.send('done, reload this page to again reset capes. to reload capes => Options>Skin customization>Optifine Cape>Reload Cape')
  console.log("Recived a reload action!")
  console.log("Sending changed capes")
  capesys()
})
console.log("loading capes for users")
console.log("-----------------------")
function capesys() {
    for (const username of usernames) {
      let capepath = __dirname + '/capes/' + username + '.png'
      if(fs.existsSync(__dirname + '/capes/' + username + '.png')) {
        console.log(`Loaded ${username}'s cape!`)
      } else {
        capepath = inValidCapePath
        console.log(`Invalid cape for ${username}!`)
      }
      app.get(`/${username}`, (req, res) => {
        if(fs.existsSync(__dirname + '/capes/' + username + '.png')) {
          console.log("New Cape request from: " + req.ip);
          console.log(`Sent ${username}'s cape, as a response`)
          capepath = __dirname + '/capes/' + username + '.png'
        } else {
          capepath = inValidCapePath
          console.log("New Cape request from: " + req.ip);
          console.log(`invalid cape for ${username}, sent Invaild cape instead!`)
        }
        res.sendFile(capepath)
      })
    }
}
capesys()
console.log("-----------------------")
console.log("done!")

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})