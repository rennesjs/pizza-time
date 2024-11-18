const PIZZA_OPTIONS = {
  amour: [
    "5 fromages",
    "Canadienne",
    "Chicken chic",
    "Curry amour",
    "Délice Amour",
    "Extra amour",
    "Fromagère",
    "Méli amour",
    "Nordica",
    "Rustique",
    "Tartiflette",
    "Mexico",
    "Kebab",
    "Bolognaise",
    "Raclette",
  ],
  dominos: [
    "Savoyarde",
    "4 fromages",
    "Extravaganza",
    "Bacon Groovy",
    "Chickenita",
    "Forestière",
    "Orientale",
    "Saumoneta",
    "Peppina",
    "Hypnotika",
    "Cannibale",
    "Savoyarde",
    "Bacon chèvre miel",
  ],
};

// Function to get the selected pizza list based on the selected option
function getSelectedPizzaList() {
  const selectedSource = document.getElementById("pizza-source").value;
  return PIZZA_OPTIONS[selectedSource] || [];
}

function getRandomPizzaList(pizzaList) {
  return pizzaList.slice().sort(() => Math.random() - 0.5);
}

function calculatePizzas() {
  const amount = document.getElementById("amount").value;
  const pizzasToOrder = Math.ceil(amount * 0.3);
  const vegetarianCount = Math.ceil(pizzasToOrder * 0.15);
  let remainingPizzas = pizzasToOrder - vegetarianCount;

  document.getElementById("pizza-amount").textContent = pizzasToOrder;

  const pizzaListElement = document.getElementById("pizza-list");
  pizzaListElement.innerHTML = "";

  // Display Vegetarian pizza count
  const vegetarianItem = document.createElement("li");
  vegetarianItem.textContent = `${vegetarianCount} × Végétarienne`;
  pizzaListElement.appendChild(vegetarianItem);

  // Get the selected and randomized pizza list
  const randomPizzaList = getRandomPizzaList(getSelectedPizzaList());

  // Distribute remaining pizzas in pairs, in random order
  for (let i = 0; i < randomPizzaList.length && remainingPizzas > 0; i++) {
    const count = Math.min(2, remainingPizzas);
    const listItem = document.createElement("li");
    listItem.textContent = `${count} × ${randomPizzaList[i]}`;
    pizzaListElement.appendChild(listItem);
    remainingPizzas -= count;
  }
}

// Synchronize input and range values
function syncAmountInputs(event) {
  const value = event.target.value;
  document.getElementById("amount").value = value;
  document.getElementById("amount-range").value = value;
  calculatePizzas();
}

// Event listeners
document.getElementById("amount").addEventListener("input", syncAmountInputs);
document
  .getElementById("amount-range")
  .addEventListener("input", syncAmountInputs);

// Update pizza list when selection changes
document
  .getElementById("pizza-source")
  .addEventListener("change", calculatePizzas);

calculatePizzas();
