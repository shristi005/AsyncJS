let deckId

//note a deck has 52 cards when we call api it gives us the deck those 52 card and we store that in a variable so as to remember which deck we were making use of and to do changes to do to that deck only
let computerScore = 0
let playerScore = 0
const drawBtn = document.getElementById("draw")
const header = document.getElementById("header")
const computerScoreDisplay = document.getElementById("computer-score")
const playerScoreDisplay = document.getElementById("player-score")

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            document.getElementById("remaining").textContent = `Remaining Cards: ${data.remaining}`
            computerScoreDisplay.textContent = `Score: 0`
            playerScoreDisplay.textContent = `Score: 0`
            deckId = data.deck_id
            drawBtn.disabled = false
            computerScore = playerScore = 0
            console.log(deckId)
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick)
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2     -- this is the url that we make use to get 2 cards from the deck we got

function drawCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            // //make sure of using two template strings
            // document.getElementById("card-Drawn").innerHTML = data.cards.map(card => `<img src="${card.image}" alt=${`card with value ${card.value} and ${card.suit}`}>`).join()

            //The above method is good but to simplify sice its known that only 2 cards are drawn:
            document.getElementById("card-Drawn").children[1].innerHTML = `<img src=${data.cards[0].image} class="card-img" />`
            document.getElementById("card-Drawn").children[3].innerHTML = `<img src=${data.cards[1].image} class="card-img"/>`

            header.textContent = winner(data.cards[0], data.cards[1])
            document.getElementById("remaining").textContent = `Remaining Cards: ${data.remaining}`

            if (data.remaining === 0) {
                header.textContent = computerScore > playerScore ? "The Final Winner is: Computer" : computerScore < playerScore ? "The Final Winner is: You" : "It's a tie"
                drawBtn.disabled = true
            }

        })
}

function winner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1Value = valueOptions.indexOf(card1.value)
    const card2Value = valueOptions.indexOf(card2.value)
    if (card1Value === card2Value) return "War!"
    else if (card1Value > card2Value) {
        computerScore++;
        computerScoreDisplay.textContent = `Score: ${computerScore}`
        return "Computer wins!"
    }
    else {
        playerScore++;
        playerScoreDisplay.textContent = `Score: ${playerScore}`
        return "You win!"
    }
}
drawBtn.addEventListener("click", drawCards)