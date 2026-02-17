document.getElementById("getCardBtn").addEventListener("click", () => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => console.log(data))
})