const player = document.querySelector('.player')
const playBtn = document.querySelector('.play')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const audio = document.querySelector('.audio')
const progressContainer = document.querySelector('.progress-container')
const progressBar = document.querySelector('.progress-bar')
const titleSong = document.querySelector('.song')
const coverImg = document.querySelector('.cover-img')
const imgSrc = document.querySelector('.img-src')
const time = document.querySelector('.time')
const songLenght = document.querySelector('.song-length')
const range = document.querySelector('.range')
const volumeImg = document.querySelector('.volume-img')
const repeat = document.querySelector('.repeat-img')

// массив из названий песен
const songs = [
    'AwolNation - Sail',
    'Imagine Dragons - Radioactive',
    'Linkin Park - New Divide']

let songIndex = 0 

// функция смены песни и заголовка
const loadSong = (song) => {
    titleSong.innerHTML = song
    audio.src = `audio/${song}.mp3`
    coverImg.src = `img/cover${songIndex + 1}.jpg`
}
loadSong(songs[songIndex])

// Плэй и пауза 
const playSong = () => {
    player.classList.add('play')
    imgSrc.src = 'icons/pause.svg'
    audio.play()
}
const pauseSong = () => {
    player.classList.remove('play')
    imgSrc.src = 'icons/play.svg'
    audio.pause()
}

// запуск по клику 
playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// переключение песен 
const nextSong = () => {
    songIndex++
    if (songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
nextBtn.addEventListener('click', nextSong)

const prevSong = () => {
    songIndex--
    if (songIndex < 0){
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex])
    playSong()
}
prevBtn.addEventListener('click', prevSong)

// полоса прокрутки песни 
const moveLineProgress = (event) => {
    const {duration, currentTime} = event.srcElement
    const progressLine = (currentTime / duration) * 100
    progressBar.style.width = `${progressLine}%`
}
audio.addEventListener('timeupdate',moveLineProgress)

// перемотка 
const setProgress = (event) => {
    const width = progressContainer.clientWidth
    const click = event.offsetX
    const duration = audio.duration
    audio.currentTime = (click / width) * duration

}
progressContainer.addEventListener('click', setProgress)

// авто переключение на следующую песню
audio.addEventListener('ended', nextSong)

// отсчет времени
const countTimeSong = () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100

    let minutes = Math.floor(audio.currentTime / 60)
    if (minutes < 10) {
        minutes = '0' + String(minutes)
    }
    let seconds = Math.floor(audio.currentTime % 60)
    if (seconds < 10) {
        seconds = '0' + String(seconds)
    }
    
    time.innerHTML = `${minutes}:${seconds}`
}
audio.addEventListener('timeupdate', countTimeSong)

// регулировка громкости

const showVolume = () => {
    range.classList.toggle('active')
    volumeImg.classList.toggle('active')
}
volumeImg.addEventListener('click',showVolume)

const chahgeDownVolume = () => {
    range.value = Number(range.value) - 1
    audio.volume =range.value / 100
}
const chahgeUpVolume = () => {
    range.value = Number(range.value) + 1
    audio.volume =range.value / 100
}
range.addEventListener('change',chahgeDownVolume)
range.addEventListener('change',chahgeUpVolume)

// повтор
function handleRepeat() {
    if (audio.loop == true) {
        audio.loop = false
        repeat.classList.toggle('active')
    }
    else {
        audio.loop = true
        repeat.classList.toggle('active')
    }
}
repeat.addEventListener('click',handleRepeat)
