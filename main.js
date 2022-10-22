import './style.css'
// Set password length from the range input
const progress = document.querySelector('.progress');
const lengthEl = document.getElementById('length')
let length = 0
const setLength = (value) => {
  length = value
  lengthEl.innerText = length
}
progress.addEventListener('input', function() {
  const operation = (this.value > length) ? '+' : '-'
  setStrength(this.value, operation)
  setLength(this.value);
})
// Copy gerenerated password
const copyPass = document.getElementById('copyPass')
const generatedPass = document.getElementById('generatedPass')
copyPass.addEventListener('click', function() {
  navigator.clipboard.writeText(generatedPass.innerText).then(
    () => {
      /* clipboard successfully set */
      messageEl.className = 'bg-green text-mainBg-darker !top-8'
      messageEl.innerText = 'Copied'
      hideMessage()
    },
    () => {
      /* clipboard write failed */
      messageEl.className = 'bg-red text-white !top-8'
      messageEl.innerText = 'Please activated copy in your browser!'
      hideMessage()
    }
  );
})
// Get the checked value
const inputCheck = document.querySelectorAll('.label-check')
const options = []
inputCheck.forEach((el) => {
  el.addEventListener('click', function() {
    // add || Remove checked value from options
    if (!this.previousSibling.previousSibling.checked) {
      options.push(this.previousSibling.previousSibling.value)
    }
    else {
      const index = options.indexOf(this.previousSibling.previousSibling.value)
      if (index > -1) options.splice(index, 1)
    }
    // Update UI After changes
    updateUi()
  })
})

// update strength
let strengthValue = 0
const setStrength = (value, operation) => {
  // Calculate Strength
  const intValue = parseInt(value)
  if (operation === '+') strengthValue = intValue
  else if (operation === '-') strengthValue = intValue
  // Update UI After changes
  updateUi()
}
// Update UI
const strengthEl = document.getElementById('strength')
const statusEl = document.getElementById('status')
const bars = document.querySelectorAll('.bar')
const updateUi = () => {
  if (strengthValue > 0 || options.length > 0) {
    strengthEl.classList.remove('hidden')
    strengthEl.classList.add('flex')
  }
  else {
    strengthEl.classList.remove('flex')
    strengthEl.classList.add('hidden')
  }
  bars.forEach((el, i) => {
    el.className = 'bar'
    if(strengthValue >= 8
        && options.length === 4
      ) {
        el.className = 'bar strong'
        statusEl.innerText = 'strong'
      }
    else if(strengthValue >= 5
        && (options.length > 2 && options.length <= 4)
        && i < 3
      ) {
        el.className = 'bar medium'
        statusEl.innerText = 'medium'
      }
    else if(strengthValue >= 3
        && (options.length > 1 && options.length <= 4)
        && i < 2
      ) {
        el.className = 'bar weak'
        statusEl.innerText = 'weak'
      }
    else {
      if(i === 0) {
        el.className = 'bar v-weak'
        statusEl.innerText = 'very weak'
      }
    }
  })
}

// Generate Password
const generatorEl = document.getElementById('generator')
const messageEl = document.getElementById('message')
generatorEl.addEventListener('click', function() {
  setGeneratedEl()
})
const setGeneratedEl = () => {
  if (strengthValue <= 0) {
    messageEl.className = 'bg-red text-white !top-8'
    messageEl.innerText = 'Your character length must be more than 0 character!'
  }
  else if (options.length <= 0) {
    messageEl.className = 'bg-orange text-white !top-8'
    messageEl.innerText = 'Please select an option!'
  }
  else {
    generatedPass.innerText = generatePassword()
  }
  hideMessage()
}

const generatePassword = () => {
  const characters = getCharacters()
  const passwordArray = []
  for (let i = 0; i < strengthValue; i++) {
    let randomArray = Math.floor(Math.random() * characters.length)
    let randomValue = Math.floor(Math.random() * characters[randomArray].length)
    let randomCharacter = characters[randomArray][randomValue]
    passwordArray.push(randomCharacter)
  }
  return passwordArray.join('')
}

const getCharacters = () => {
  const Lowercase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','y','u','v','w','x','y','z']
  const Uppercase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  const Numbers = [0,1,2,3,4,5,6,7,8,9]
  const Specials = ['!','?','/','#','$','%','&','<','=','>']
  const Characters = []

  options.indexOf('lowercase') >= 0 && Characters.push(Lowercase)
  options.indexOf('uppercase') >= 0 && Characters.push(Uppercase)
  options.indexOf('numbers') >= 0 && Characters.push(Numbers)
  options.indexOf('symbols') >= 0 && Characters.push(Specials)

  return Characters
}

const hideMessage = () => {
  setTimeout(() => {
    messageEl.className = '-top-16'
    messageEl.innerText = ''
  }, 3000)
}