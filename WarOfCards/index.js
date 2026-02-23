let deckId

//note a deck has 52 cards when we call api it gives us the deck those 52 card and we store that in a variable so as to remember which deck we were making use of and to do changes to do to that deck only

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
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
            document.getElementById("card-Drawn").children[0].innerHTML = `<img src=${data.cards[0].image} class="card-img" />`
            document.getElementById("card-Drawn").children[1].innerHTML = `<img src=${data.cards[0].image} class="card-img"/>`



        })
}
document.getElementById("draw").addEventListener("click", drawCards)