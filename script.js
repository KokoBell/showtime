// Global variables

// Uninitialized
let ourShows
let previousNumber

// Initialized variables
let currentShow = ''
let currentUrl = ''

// HTML Elements
const show = document.getElementById('show')
const showTime = document.getElementById('showtime')
const updateShow = document.getElementById('update')
const updateInput = document.getElementById('updateInput')
const urlInput = document.getElementById('urlInput')
const showLabel = document.getElementById('showName')
const urlLabel = document.getElementById('urlLabel')

const heading = document.getElementById('heading')

// Check for shows in localStorage and populate the list accordinly
if (!localStorage.getItem('ourShows')) {
    ourShows = [{ 'name': `Bob's Burgers`, 'url': 'https://soap2day.cc/TczozMToiMTQ1fHwxMDUuMjI1LjEzLjE1M3x8MTY2ODcxNjY0NyI7.html' }, { 'name': `Mob Psycho`, 'url': 'https://9anime.to/watch/mob-psycho-100-iii.yqqv0' }, { 'name': `Spy Family`, 'url': 'https://9anime.to/watch/spy-x-family-part-2.vvvo6/' }, { 'name': `Demon Slayer`, 'url': 'https://9anime.to/watch/demon-slayer-kimetsu-no-yaiba.6q67/ep-24' }, { 'name': `Kung Fu Panda`, 'url': 'https://www.netflix.com/watch/81459975' }, { 'name': `Modern Family`, 'url': 'https://soap2day.cc/TczozMDoiOTZ8fDEwNS4yMjUuMTMuMTUzfHwxNjY4NzE4MDQzIjs.html' }, { 'name': `Final Space`, 'url': 'https://netflix.com/watch/81437328' }, { 'name': `Misty`, 'url': 'https://www.netflix.com/watch/81029907' }, { 'name': `Rick and Morty`, 'url': 'https://www.netflix.com/watch/80098733' }, { 'name': 'Girlfriends', 'url': 'https://www.netflix.com/watch/81270376' }]
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

// Update the value of currentUrl as the user types
urlInput.addEventListener('change', (event) => {
    currentUrl = event.target.value
})

// All the functions that are used by the event listeners

// Show a countdown and then show the randomly selected show
const randomShow = () => {
    show.style.color = '#1E1E1E'
    showTime.textContent = 'Hmmmm...'
    if (ourShows.length == 0) {
        setTimeout(() => {
            show.textContent = 'Your roster is empty'
            showTime.textContent = 'Add a show'
            showTime.onclick = () => {
                updateList()
            }
        }, 800)
        return
    }
    const randomIndex = Math.floor(Math.random() * ourShows.length)
    if (parseInt(localStorage.getItem('previous')) != randomIndex) {
        const rShow = ourShows[randomIndex].name
        const showLink = ourShows[randomIndex].url
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
            show.href = showLink
            show.target = '_blank'

            // Update the index in localStorage
            localStorage.setItem('previous', randomIndex)

            // Set the showTime to the default text
            showTime.textContent = 'Show Time!'
            setTimeout(() => {
                if (showLink != "#") {
                    console.log('Clicked')
                    show.click()
                }
                console.log('No valid url')
            }, 1500)
        }, 2000)
    } else {
        randomShow()
    }
}

// update the span with the show text
const updateShowtime = (pNumber) => {
    show.textContent = ourShows[parseInt(pNumber)].name
    show.href = ourShows[parseInt(pNumber)].url
    show.target = '_blank'
    show.style.color = '#e50914'
}

// show the default show on the text
const defaultShow = () => {
    show.textContent = '...'
    show.style.color = '#1E1E1E'
}

// If localStorage is used, show the value there. If not, show the default value
const populateShowField = () => {
    let pNumber = localStorage.getItem('previous')
    if (pNumber) {
        updateShowtime(pNumber)
    } else {
        defaultShow()
    }
}

// Clear the localStorage and show the default value
const clearStorage = () => {
    localStorage.clear()
    populateShowField()
    ourShows = []
}

// Toggle between the input form and the show field
const toggleCard = () => {
    if (showTime.style.display === 'none') {
        heading.textContent = 'Show Selector'
        showTime.textContent = 'Show Time!'
        showTime.style.display = 'block'
        show.style.display = 'block'
        updateShow.style.display = 'none'
        updateInput.style.display = 'none'
        urlInput.style.display = 'none'
        showLabel.style.display = 'none'
        urlLabel.style.display = 'none'
        showTime.onclick = () => {
            randomShow()
        }
    } else {
        heading.textContent = 'Add Another Show'
        showTime.style.display = 'none'
        show.style.display = 'none'
        updateShow.style.display = 'block'
        updateInput.style.display = 'flex'
        urlInput.style.display = 'flex'
        showLabel.style.display = 'flex'
        urlLabel.style.display = 'flex'
    }
}

// Set the display to input state
const updateList = () => {
    toggleCard()
    populateShowField()
}

// Add items to the current list
const addItem = () => {
    toggleCard()
    if (currentShow != '') {
        if (currentUrl === '') {
            currentUrl = '#'
        }
        ourShows.push({ 'name': currentShow, 'url': currentUrl })
        localStorage.setItem('ourShows', JSON.stringify(ourShows))
        currentShow = ''
    }
    populateShowField()
}

// All functions that need to be called on load are called here

// Trigger popuplateShowField to check localStorage and update the UI accordingly
populateShowField()