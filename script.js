// Global variables

// Uninitialized
let ourShows
let previousNumber

// Initialized
let currentShow = ''

// HTML Elements
const show = document.getElementById('show')
const showTime = document.getElementById('showtime')
const updateShow = document.getElementById('update')
const updateInput = document.getElementById('updateInput')
const heading = document.getElementById('heading')

// Check for shows in localStorage and populate the list accordinly
if (!localStorage.getItem('ourShows')) {
    ourShows = [{ 'name': `Bob's Burgers`, 'url': '' }, { 'name': `Mob Psycho`, 'url': '' }, { 'name': `Spy Family`, 'url': '' }, { 'name': `Demon Slayer`, 'url': '' }, { 'name': `Kung Fu Panda`, 'url': '' }, { 'name': `Modern Family`, 'url': '' }, { 'name': `Final Space`, 'url': '' }, { 'name': `Misty`, 'url': '' }, { 'name': `Rick and Morty`, 'url': '' }]
} else {
    ourShows = JSON.parse(localStorage.getItem('ourShows'))
}

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
    showTime.textContent = 'Hmmmm...'
    const randomIndex = Math.floor(Math.random() * ourShows.length)
    if (parseInt(localStorage.getItem('previous')) != randomIndex) {
        const rShow = ourShows[randomIndex].name
        let start = -1
        let tempShow
        let interval = setInterval(() => {
            tempShow = Math.floor(Math.random() * ourShows.length)
            show.textContent = ourShows[tempShow].name
            start = tempShow
        }, 150)

        setTimeout(() => {
            clearInterval(interval)

            // Set the show text color to red
            show.style.color = '#e50914'

            // Update the show name
            show.textContent = rShow

            // Update the index in localStorage
            localStorage.setItem('previous', randomIndex)

            // Set the showTime to the default text
            showTime.textContent = 'Show Time!'
        }, 2000)
    } else {
        randomShow()
    }
}

// If localStorage is used, show the value there. If not, show the default value
const populateShowField = () => {
    let pNumber = localStorage.getItem('previous')
    if (pNumber) {
        show.textContent = ourShows[parseInt(pNumber)].name
        show.style.color = '#e50914'
    } else {
        show.textContent = '...'
        show.style.color = '#1E1E1E'
    }
}

// Clear the localStorage and show the default value
const clearStorage = () => {
    localStorage.clear()
    populateShowField()
    ourShows = []
}

// Set the display to input state
const updateList = () => {
    heading.textContent = 'Add Another Show'
    showTime.style.display = 'none'
    show.style.display = 'none'
    updateShow.style.display = 'block'
    updateInput.style.display = 'block'
    populateShowField()
}

// Add items to the current list
const addItem = () => {
    heading.textContent = 'Show Selector'
    showTime.style.display = 'block'
    show.style.display = 'block'
    updateShow.style.display = 'none'
    updateInput.style.display = 'none'
    if (currentShow != '') {
        ourShows.push(currentShow)
        localStorage.setItem('ourShows', JSON.stringify(ourShows))
        currentShow = ''
    }
    populateShowField()
}

// All functions that need to be called on load are called here

// Trigger popuplateShowField to check localStorage and update the UI accordingly
populateShowField()