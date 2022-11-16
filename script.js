const show = document.getElementById('show')
const showTime = document.getElementById('showtime')
const ourShows = [`Bob's Burgers`, `Mob Psycho`, `Spy Family`, `Demon Slayers`, `Kung Fu Panda`, `Modern Family`, `Final Space`, `Misty`]

let previousNumber
const randomShow = () => {
    show.style.color = '#1E1E1E'
    const randomIndex = Math.floor(Math.random() * ourShows.length)
    if (parseInt(localStorage.getItem('previous')) != randomIndex) {
        const rShow = ourShows[randomIndex]
        let start = -1
        let tempShow
        let interval = setInterval(() => {
            tempShow = Math.floor(Math.random() * ourShows.length)
            if (tempShow === start) {
                if (tempShow - 1 > 0) {
                    tempShow = tempShow - 1
                } else {
                    tempShow = tempShow + 1
                }
            }
            show.textContent = ourShows[tempShow]
            console.log(start, tempShow)
            start = tempShow
        }, 150)

        setTimeout(() => {
            clearInterval(interval)
            show.style.color = '#D3202B'
        }, 2000)

        show.textContent = rShow
        localStorage.setItem('previous', randomIndex)

    } else {
        randomShow()
    }
}

const populateShowField = () => {
    let pNumber = localStorage.getItem('previous')
    if (pNumber) {
        show.textContent = ourShows[parseInt(pNumber)]
    } else {
        show.textContent = '...'
    }
}

const clearStorage = () => {
    localStorage.clear()
    populateShowField()
}

populateShowField()