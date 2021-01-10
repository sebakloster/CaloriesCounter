const compose = (...functions) => (data) =>
  functions.reduceRight((value, func) => func(value), data);

// let description = $("#description");
// let calories = $("#calories");
// let carbs = $("#carbs");
// let protein = $("#protein");

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
    calories: calories.value,
    carbs: carbs.value,
    protein: protein.value,
  };
  list.push(newItem);
  cleanInputs();
  console.log(list);
};

const cleanInputs = () => {
  description.value = "";
  carbs.value = "";
  calories.value = "";
  protein.value = "";
};
