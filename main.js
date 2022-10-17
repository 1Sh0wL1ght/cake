const express = require('express')
const readline = require("readline");
const fs = require('fs')
const app = express()
const port = 3000

// modes
// single mode
const { usernames } = require('./usernames.json')
// multi cape mode
const multimode = require('./multimode.json')

//Readline Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("--------------------------------------------------------------------------------------------------------------------------------------")
console.log("██████╗░███████╗██╗░░░░░███████╗████████╗███████╗░█████╗░██████╗░████████╗██╗███████╗██╗███╗░░██╗███████╗░░░███╗░░██╗███████╗████████╗")
console.log("██╔══██╗██╔════╝██║░░░░░██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝██║████╗░██║██╔════╝░░░████╗░██║██╔════╝╚══██╔══╝")
console.log("██║░░██║█████╗░░██║░░░░░█████╗░░░░░██║░░░█████╗░░██║░░██║██████╔╝░░░██║░░░██║█████╗░░██║██╔██╗██║█████╗░░░░░██╔██╗██║█████╗░░░░░██║░░░")
console.log("██║░░██║██╔══╝░░██║░░░░░██╔══╝░░░░░██║░░░██╔══╝░░██║░░██║██╔═══╝░░░░██║░░░██║██╔══╝░░██║██║╚████║██╔══╝░░░░░██║╚████║██╔══╝░░░░░██║░░░")
console.log("██████╔╝███████╗███████╗███████╗░░░██║░░░███████╗╚█████╔╝██║░░░░░░░░██║░░░██║██║░░░░░██║██║░╚███║███████╗██╗██║░╚███║███████╗░░░██║░░░")
console.log("╚═════╝░╚══════╝╚══════╝╚══════╝░░░╚═╝░░░╚══════╝░╚════╝░╚═╝░░░░░░░░╚═╝░░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚══╝╚══════╝╚═╝╚═╝░░╚══╝╚══════╝░░░╚═╝░░░")
console.log("--------------------------------------------------------------------------------------------------------------------------------------")
console.log("Cosmetic server for MCP!")
console.log("requires modification!")
console.log("Currently only supports Capes")
console.log("Made By 1Sh0wL1ght")
console.log()
console.log()
console.log("select mode:")
console.log("1: Single")
console.log("2: Multiple")
rl.question("mode: ", (m) => {
  capesys(m)
  rl.close()
})

app.get('/', (req, res) => {
  res.send('<h1>Cape system main page</h1>\n<h2>provided by 1sh0wl1ght</h2>\n<p>currently only supports capes</p>')
})

app.get('/update', (req, res) => {
  let file_content = fs.readFileSync('./multimode.json');
  let content = JSON.parse(file_content);
  content.Users[0].using = 3
  fs.writeFileSync('./multimode.json.txt', file_content);
  fs.writeFileSync('./multimode.json', JSON.stringify(content));
  res.send('<h1>Sucessfully updated, <a href="rollback">wait go back</a></h1>')
})
app.get('/rollback', (req, res) => {
  rollback(res)
})

function rollback(res) {
  if(res != Response) return new Error(`Tried getting Response got ${res} instead`)
  let file_content = fs.readFileSync('./multimode.json.txt');
  fs.writeFileSync('./multimode.json', file_content);
  res.send('rollback successful')
}

function capesys(mode) {
  // code may be DRY or some code may be useless but i am learning as i go
  console.log("loading capes for users")
  if(mode === "1") {
    console.log('---------------------------------------')
      for (const username of usernames) {
        let userpath = __dirname + '/capes/' + username + '.png'

        if(fs.existsSync(userpath)) {
          console.log(`Loaded ${username}'s cape!`)
        } else {
          console.log(`Invalid cape for ${username}!`)
        }
        app.get(`/${username}`, (req, res) => {;
          if(fs.existsSync(userpath)) {
            console.log(`Sent ${username}'s cape`)
          } else {
            console.warn(`${username} owns a cape, But there was no cape file present for ${username}`)
            console.warn('therefore their cape will not be sent when requesting it')
          }
          res.sendFile(userpath)
        })
      }
      console.log('---------------------------------------')
    } else if (mode === "2"){
      for (const user of multimode.Users) {
        let userpath;
        for (const ownedcape of user.Owns) {
        if (user.using != ownedcape) { 
          console.log('!DO NOT REPORT THIS TO GITHUB REPO!')
          console.warn(user.username + ' is using a cape that they dont have, try checking multimode.json\n if multimode.json is working fine then check for code in your client that somehow modified the cape they are using or the capes they owned')
          console.log('!THIS CAN BE A FALSE ERROR/WARNING!')
        }
        }
        userpath = `${__dirname}/capes/multimode/${user.using}.png`

        app.get(`/${user.username}`, (req, res) => {
          console.log(`Sent ${user.username}'s cape, as a response`)
          res.sendFile(userpath)
        })
      }
    } 
}

app.listen(port)