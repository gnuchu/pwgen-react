var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;

  // enable CORS without external module
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
const fs = require("fs");
const words = JSON.parse(fs.readFileSync("words.json", { encoding: 'utf8', flag: 'r' }))


function newPassphrase() {
  let phrase = ""

  for(i=0; i<4; i++) {
    j = Math.floor(Math.random() * words.words.length + 1)
    phrase += words.words[j]
    if(i<3) {
      phrase += " "
    }
  }
  return phrase
}

app.get("/api/v1/passphrase", (req, res) => {
  const phrase = newPassphrase();
  res.json({ "passphrase" : `${phrase}` });
});

app.listen(port, () => {
});