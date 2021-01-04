const upper = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const lower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
const numbers = ['0','1','2','3','4','5','6','7','8','9']
const special = ['!','@','£','$','^','-','_','+','=','|',':',';','<','>','~']
const allChars = upper.concat(lower, numbers, special)

export function generatePassword(length) {
  let validPass = false
  let pass = ""

  while(!validPass) {
    pass = generate(length)
    validPass = validatePassword(pass)
  }

  return pass
}

var generate = function(length) {
  let pass = ""
  let i = 0
  const shuffledChars = shuffleArray(allChars)

  for(i=0; i<length; i++) {
    var pos = Math.ceil(Math.random() * (length-1))
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

var validatePassword = function(pass) {
  const hasUpper    = hasOne(pass, upper)
  const hasLower    = hasOne(pass, lower)
  const hasSpecial  = hasOne(pass, special)
  const hasNumber   = hasOne(pass, numbers)
  
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