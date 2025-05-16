const card = document.querySelector(".card");
console.log(card);

card.addEventListener("mouseenter", flipMe);

function flipMe() {
  card.classList.add("flip");
}
card.addEventListener("mouseLeave", flipMeBack);

function flipMeBack() {
  card.classList.remove("flip");
}
card.addEventListener("click", function () {
  card.cardList.toggle("flip");
});
