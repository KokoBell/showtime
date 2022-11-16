const show = document.getElementById('show')
const showTime = document.getElementById('showtime')
const ourShows = [`Bob's Burgers`, `Mob Psycho`, `Spy Family`, `Demon Slayers`, `Kung Fu Panda`, `Modern Family`, `Final Space`, `Misty`]

let previousNumber
const randomShow = () => {
    const randomIndex = Math.floor(Math.random() * ourShows.length)
    if (parseInt(localStorage.getItem('previous')) != randomIndex) {
        const rShow = ourShows[randomIndex]
        show.textContent = rShow
        localStorage.setItem('previous',randomIndex)
    } else {
        randomShow()
    }
}

const checkHistory = () => {
    console.log(localStorage.getItem('previous'))
}