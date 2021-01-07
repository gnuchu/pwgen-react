
export function generatePassword(settings) {
  let validPass = false
  let pass = ""

  // createCharSet(settings)

  if(settings.allChars.length === 0) {
    return "At least 1 character set must be selected"
  }

  while(!validPass) {
    pass = generate(settings)
    validPass = validatePassword(pass, settings)
  }

  return pass
}

var generate = function(settings) {
  let pass = ""
  let i = 0
  const shuffledChars = shuffleArray(settings.allChars)

  for(i=0; i<settings.length; i++) {
    var pos = Math.ceil(Math.random() * (settings.length-1))
    pass += shuffledChars[pos]
  }
  return pass
}

var shuffleArray = function (a) {
  // Create a copy of the array so that we don't shuffle the original one
  var arrayCopy = a.slice(0);
  // Shuffle the array
  return arrayCopy.sort(function() {
    return Math.random() - 0.5
  })
}

var validatePassword = function(pass, settings) {
  const hasUpper    = hasOne(pass, settings.upper)
  const hasLower    = hasOne(pass, settings.lower)
  const hasSpecial  = hasOne(pass, settings.special)
  const hasNumber   = hasOne(pass, settings.numbers)
  
  return (hasUpper && hasLower && hasSpecial && hasNumber)

}

var hasOne = function(pass, characterSet) {
  let found = false
  for(let n = 0; n < characterSet.length; n++) {
    if(pass.indexOf(characterSet[n], 0) > -1) {
      found = true
    }
  }
  return found
}