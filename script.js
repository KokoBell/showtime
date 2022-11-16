const show = document.getElementById('show')
const showTime = document.getElementById('showtime')
const updateShow = document.getElementById('update')
const updateInput = document.getElementById('updateInput')
let ourShows = [`Bob's Burgers`, `Mob Psycho`, `Spy Family`, `Demon Slayers`, `Kung Fu Panda`, `Modern Family`, `Final Space`, `Misty`]
let previousNumber
let currentShow = ''


// Event listeners for all interactable elements

// Trigger the randomShow function when the showTime button is clicked
showTime.addEventListener('click', () => {
    randomShow()
})

// Trigger the addItem function when the updateShow button is clicked
updateShow.addEventListener('click', () => {
    addItem()
})

// Update the value of currentShow as the user types
updateInput.addEventListener('change', (event) => {
    currentShow = event.target.value
})


// All the functions that are used by the event listeners

// Show a countdown and then show the randomly selected show
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

// If localStorage is used, show the value there. If not, show the default value
const populateShowField = () => {
    let pNumber = localStorage.getItem('previous')
    if (pNumber) {
        show.textContent = ourShows[parseInt(pNumber)]
    } else {
        show.textContent = '...'
    }
}

// Clear the localStorage and show the default value
const clearStorage = () => {
    localStorage.clear()
    populateShowField()
}

// Set the display to input state
const updateList = () => {
    showTime.style.display = 'none'
    show.style.display = 'none'
    updateShow.style.display = 'block'
    updateInput.style.display = 'block'
    clearStorage()
    populateShowField()
}

// Add items to the current list
const addItem = () => {
    showTime.style.display = 'block'
    show.style.display = 'block'
    updateShow.style.display = 'none'
    updateInput.style.display = 'none'
    ourShows.push(currentShow)
    currentShow = ''
}

// All functions that need to be called on load are called here

// Trigger popuplateShowField to check localStorage and update the UI accordingly
populateShowField()