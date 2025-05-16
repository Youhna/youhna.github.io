const card = document.querySelector(".card");
console.log(card);

let draggedCard = null;

card.addEventListener("dragstart", function () {
  draggedCard = card;
  console.log(draggedCard);
});
const dropbox = document.querySelector(".dropbox");

dropbox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropbox.addEventListener("drp", function (e) {
  const clone = draggedCard.cloneNode(true);
  dropbox.appendChild(clone);
});

dropbox.addEventListener("drop")