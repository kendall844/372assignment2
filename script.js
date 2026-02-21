"use strict";

document.addEventListener("DOMContentLoaded", loaded);

function loaded() {

    const cards = document.querySelectorAll(".card");
    const favorites = [];
    let total = 0;

    const summary = document.createElement("section");
    summary.id = "favorites-summary";

    const sumTitle = document.createElement("h3");
    sumTitle.textContent = "Your Favorites";

    const sumList = document.createElement("ul");

    const totalDisplay = document.createElement("p");
    totalDisplay.textContent = "Total: $0.00";

    summary.appendChild(sumTitle);
    summary.appendChild(sumList);
    summary.appendChild(totalDisplay);

    document.querySelector("main").appendChild(summary);

    const prices = [
        15.99, 19.99, 14.99,
        8.00, 9.00, 13.00,
        12.26, 14.32, 15.07
    ];

    for (let i = 0; i < cards.length; i++) {

        const card = cards[i];
        const dishName = card.querySelector("h3").textContent;
        const dishPrice = prices[i];

        card.dataset.name = dishName;
        card.dataset.price = dishPrice;

        const priceTag = document.createElement("p");
        priceTag.classList.add("price-tag");
        priceTag.textContent = "$" + dishPrice.toFixed(2);

        const button = document.createElement("button");
        button.textContent = "Add to Favorites";
        button.classList.add("favorite-btn");

        card.appendChild(priceTag);
        card.appendChild(button);

        button.addEventListener("click", function () {

            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);

            const exist = favorites.findIndex(item => item.name === name);

            if (exist === -1) {

                favorites.push({ name: name, price: price });
                total += price;

                card.classList.add("favorite-selected");
                button.textContent = "Remove from Favorites";

            } else {

                total -= favorites[exist].price;
                favorites.splice(exist, 1);

                card.classList.remove("favorite-selected");
                button.textContent = "Add to Favorites";
            }

            updateSummary();
        });
    }

    function updateSummary() {

        while (sumList.firstChild) {
            sumList.removeChild(sumList.firstChild);
        }

        for (let i = 0; i < favorites.length; i++) {
            const li = document.createElement("li");
            li.textContent = favorites[i].name + " - $" + favorites[i].price.toFixed(2);
            sumList.appendChild(li);
        }

        totalDisplay.textContent = "Total: $" + total.toFixed(2);
    }
}