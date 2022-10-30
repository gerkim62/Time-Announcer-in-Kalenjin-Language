document.querySelector('#loader').style.display = 'none'

const playBtnEl = document.querySelector('#play-btn')
const timeWordsEl = document.querySelector('#time-words')
const playbackRateInputEl = document.querySelector('#playback-rate')
const playbackRateTextEl = document.querySelector('#playback-rate-text')
const ZERO_TO_TEN__ONES = ['poch', 'agenge', 'oeng', 'somok', 'angwan', 'muut', 'lo', 'tisap', 'sisit', 'sogol', 'taman']
const AND__PHRASE = 'ak'
const ZERO_TO_FIFTY__TENS = ['poch', 'taman', 'tiptem', 'sosom', 'artam', 'konom']
const IT_IS__PHRASE = 'sait'

const AUDIO_FOLDER = 'sounds'
const AUDIO_FORMART = 'aac'

let playbackRate = playbackRateInputEl.value
playbackRateTextEl.innerHTML = playbackRate

const getCurrentHours = () => new Date().getHours()
const getCurrentMinutes = () => new Date().getMinutes()

const getAfricanHours = hours => {
 
 if(hours>12)hours-=12
 
  hours > 6 ? hours -= 6 : hours += 6
  return hours
}

const getSounds = number => {
  const sounds = []

  const numberOfTens = Math.floor(number / 10)
  const numberOfOnes = number - numberOfTens * 10

  if (numberOfTens > 0) sounds.push(ZERO_TO_FIFTY__TENS[numberOfTens])

  if (numberOfOnes > 0) {
    if (numberOfTens > 0) sounds.push(AND__PHRASE)
    sounds.push(ZERO_TO_TEN__ONES[numberOfOnes])
  }
  return sounds
}

const getTimeSounds = (hours, minutes) => {
  let timeSounds = []

  const africanHours = getAfricanHours(hours)
  //console.log(africanHours)

  timeSounds.push(IT_IS__PHRASE)

  const hoursSounds = getSounds(africanHours)
  timeSounds.push(...hoursSounds)

  timeSounds.push(AND__PHRASE)

  const minutesSounds = getSounds(minutes)
  timeSounds.push(...minutesSounds)

  return timeSounds
}

const getAudioStrings = soundStrings => {
  const audioStrings = soundStrings.map(soundString => {
    return `${AUDIO_FOLDER}/${soundString}.${AUDIO_FORMART}`
  })

  return audioStrings
}



const playSounds = sounds => {
  const player = new Gapless5({
    tracks: sounds,
    crossFade:100,
    playbackRate:playbackRate,
    exclusive:true
    //crossFadeShape:CrossFadeShape.linear
  })
  player.play()
}
//playSounds(timeSounds)

playBtnEl.addEventListener('click', () => {
  let timeSounds = getTimeSounds(getCurrentHours(), getCurrentMinutes())
  const timeString = timeSounds.join(' ')

  timeSounds = getAudioStrings(timeSounds)
  
  timeWordsEl.innerHTML = timeString + '.'
  playSounds(timeSounds)
})

playbackRateInputEl.addEventListener('input',()=>{
  playbackRate = playbackRateInputEl.value
  playbackRateTextEl.innerHTML = Number(playbackRate).toFixed(1)
})

function updateTime() {
  let timeSounds = getTimeSounds(getCurrentHours(), getCurrentMinutes())
  const timeString = timeSounds.join(' ')+'.'

  timeSounds = getAudioStrings(timeSounds)
  timeWordsEl.innerHTML = timeString

}

setInterval(() => {
  updateTime()
}, 1000)
