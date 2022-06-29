const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

const { usernames } = require('./usernames.json')

console.log("Cape manipulation for MCP Optifine Sources Only!")
console.log("Made By 1Sh0wL1ght")

console.log("██████╗░███████╗██╗░░░░░███████╗████████╗███████╗░█████╗░██████╗░████████╗██╗███████╗██╗███╗░░██╗███████╗░░░███╗░░██╗███████╗████████╗")
console.log("██╔══██╗██╔════╝██║░░░░░██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝██║████╗░██║██╔════╝░░░████╗░██║██╔════╝╚══██╔══╝")
console.log("██║░░██║█████╗░░██║░░░░░█████╗░░░░░██║░░░█████╗░░██║░░██║██████╔╝░░░██║░░░██║█████╗░░██║██╔██╗██║█████╗░░░░░██╔██╗██║█████╗░░░░░██║░░░")
console.log("██║░░██║██╔══╝░░██║░░░░░██╔══╝░░░░░██║░░░██╔══╝░░██║░░██║██╔═══╝░░░░██║░░░██║██╔══╝░░██║██║╚████║██╔══╝░░░░░██║╚████║██╔══╝░░░░░██║░░░")
console.log("██████╔╝███████╗███████╗███████╗░░░██║░░░███████╗╚█████╔╝██║░░░░░░░░██║░░░██║██║░░░░░██║██║░╚███║███████╗██╗██║░╚███║███████╗░░░██║░░░")
console.log("╚═════╝░╚══════╝╚══════╝╚══════╝░░░╚═╝░░░╚══════╝░╚════╝░╚═╝░░░░░░░░╚═╝░░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚══╝╚══════╝╚═╝╚═╝░░╚══╝╚══════╝░░░╚═╝░░░")

app.get('/', (req, res) => {
  res.send('<h1>local cape system</h1>\n<h2>provided by 1sh0wl1ght</h2>')
})
app.get('/reset', (req, res) => {
  res.send('done, reload this page to again reset capes\nOptions>Skin customization>Optifine Cape>Reload Cape')
  console.log("sending changed capes")
  capesys()
})
console.log("loading capes for users")
function capesys() {
    for (const username of usernames) {
      let capepath = __dirname + '/capes/' + username + '.png'
      if(!fs.existsSync(__dirname + '/capes/' + username + '.png')) {
        capepath = __dirname + '/capes/invalidcape.png'
        console.log(`invalid cape for ${username}!`)
      } else {
        console.log(`sent ${username}'s cape!`)
      }
      app.get(`/${username}`, (req, res) => {
        res.sendFile(capepath)
      })
      
    }
}
capesys()
console.log("done!")

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})