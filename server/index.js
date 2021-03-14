String.prototype.capitalise = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;

  // enable CORS without external module
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});
 
const fs = require("fs");
const words = JSON.parse(fs.readFileSync("words.json", { encoding: 'utf8', flag: 'r' }))

function stringToBool(str) {
  return (str === 'true')
} 

function localRandom(max) {
  return Math.floor(Math.random() * max + 1)
}
const specialChars = "!#%()+,-./:;<=>?@[]^_`{|}~"

function newPassphrase(params) {
  let phrase = ""
  const spaces = stringToBool(params.spaces)
  const capitalise = stringToBool(params.capitalise)
  const numbers = stringToBool(params.numbers)
  const special = stringToBool(params.special)
  let number_of_words = 4
  
  if(numbers || special) {
    number_of_words = 3
  }

  for(i=0; i<number_of_words; i++) {
    j = localRandom(words.words.length)
    
    if(capitalise) {
      phrase += words.words[j].capitalise()
    }
    else {
      phrase += words.words[j]
    }

    if(i<(number_of_words -1) && spaces) {
      phrase += " "
    }
  }
  
  if(special) {
    let r = localRandom(specialChars.length)
    for(i=0; i<r; i++) {
      let s = localRandom(specialChars.length - 1)
      phrase += specialChars[s]
    }
  }

  if(numbers) {
    let r = localRandom(1000)
    phrase += r.toString()
  }

  return phrase
}

app.get("/api/v1/passphrase", (req, res) => {
  const phrase = newPassphrase(req.query);
  res.json({ "passphrase" : `${phrase}` });
});

app.listen(port, () => {
});