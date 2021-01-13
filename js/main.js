const compose = (...functions) => (data) =>
  functions.reduceRight((value, func) => func(value), data);

// let description = $("#description");
// let calories = $("#calories");
// let carbs = $("#carbs");
// let protein = $("#protein");

const attributesToString = (obj = {}) => {
  const keys = Object.keys(obj);
  const attrs = [];

  for (let i = 0; i < keys.length; i++) {
    let attr = keys[i];
    attrs.push(`${attr}="${obj[attr]}"`);
  }
  const string = attrs.join("");
  return string;
};

const tagAttrs = (obj) => (content = "") =>
  `<${obj.tag}${obj.attrs ? " " : ""}${attributesToString(
    obj.attrs
  )}>${content}</>`;

const tag = (t) => {
  if (typeof t === "string") {
    return tagAttrs({ tag: t });
  } else {
    return tagAttrs(t);
  }
};

const tableRowTag = tag("tr");
const tableRow = (items) => compose(tableRowTag, tableCells)(items);

const tableCell = tag("td");
const tableCells = (item) => item.map(tableCell).join("");

const trashIcon = tag({ tag: "i", attrs: { class: "fas fa-trash-alt" } })("");

let description = document.getElementById("description");
let calories = document.getElementById("calories");
let carbs = document.getElementById("carbs");
let protein = document.getElementById("protein");

let list = [];

const validateInputs = () => {
  description.value ? "" : description.classList.add("is-invalid");
  calories.value ? "" : calories.classList.add("is-invalid");
  carbs.value ? "" : carbs.classList.add("is-invalid");
  protein.value ? "" : protein.classList.add("is-invalid");

  description.addEventListener("keydown", () => {
    description.classList.remove("is-invalid");
  });
  calories.addEventListener("keydown", () => {
    calories.classList.remove("is-invalid");
  });
  carbs.addEventListener("keydown", () => {
    carbs.classList.remove("is-invalid");
  });
  protein.addEventListener("keydown", () => {
    protein.classList.remove("is-invalid");
  });

  if (description.value && calories.value && carbs.value && protein.value) {
    add();
  }
};

const add = () => {
  const newItem = {
    description: description.value,
    calories: Number(calories.value),
    carbs: Number(carbs.value),
    protein: Number(protein.value),
  };
  list.push(newItem);
  cleanInputs();
  updateTotals();
  renderItems();
};

const updateTotals = () => {
  let calories = 0;
  let carbs = 0;
  let protein = 0;

  list.map((item) => {
    (calories += item.calories),
      (carbs += item.carbs),
      (protein += item.protein);
  });
  document.getElementById("totalCalories").textContent = calories;
  document.getElementById("totalCarbs").textContent = carbs;
  document.getElementById("totalProtein").textContent = protein;
};

const cleanInputs = () => {
  description.value = "";
  carbs.value = "";
  calories.value = "";
  protein.value = "";
};
const renderItems = () => {
  document.querySelector("tbody").innerHTML = "";

  list.map((item, index) => {
    const removeButton = tag({
      tag: "button",
      attrs: {
        class: "btn btn-outline-danger",
        onclick: `removeItem(${index})`,
      },
    })(trashIcon);

    const row = document.createElement("tr");

    row.innerHTML = tableRow([
      item.description,
      item.calories,
      item.carbs,
      item.protein,
      removeButton,
    ]);

    document.querySelector("tbody").appendChild(row);
  });
};

const removeItem = (index) => {
  list.splice(index, 1);
  updateTotals();
  renderItems();
};
