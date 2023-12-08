import { Collection, DefaultCollection } from "./collections.js";

function clearFields() {
  const collectionTitle = document.getElementById("collection-title");
  const collectionDescription = document.getElementById(
    "collection-description"
  );

  collectionTitle.value = "";
  collectionDescription.value = "";
}

function checkTitleField() {
  const collectionTitle = document.getElementById("collection-title");
  const createButton = document.getElementById("create-button");

  createButton.style.backgroundColor = collectionTitle.value
    ? "rgb(14 165 233)"
    : "rgb(7, 89, 133)";
}

function toggleCollectionForm() {
  const newCollectionForm = document.getElementById("new-collection-form");
  newCollectionForm.style.display =
    newCollectionForm.style.display === "none" ? "block" : "none";
  if (newCollectionForm.style.display === "block") checkTitleField();
}

function cancelCollection(e) {
  const newCollectionForm = document.getElementById("new-collection-form");
  e.preventDefault();
  newCollectionForm.style.display = "none";
  clearFields();
}

const newCollectionButton = document.getElementById("new-collection-button");
const cancelButton = document.getElementById("cancel-button");
const createButton = document.getElementById("create-button");
const collectionTitle = document.getElementById("collection-title");

newCollectionButton.addEventListener("click", toggleCollectionForm);
cancelButton.addEventListener("click", cancelCollection);
collectionTitle.addEventListener("input", checkTitleField);

/**
 *
 **/
const collections = [];
const defaultCollection = new DefaultCollection(
  "Have You?",
  "This is your default collection"
);
const secondCollection = new Collection(
  "Shopping list",
  "this is my weekly shopping list"
);
collections.push(defaultCollection, secondCollection);
const collectionSection = document.getElementById("collection-section");

for (let collection of collections) {
  let newCollectionHTML = `
    <div class="collection-card">
        <h3 class="text-2xl text-lime-600 | mb-5">${collection.title}</h3>                 
        <h4 style="font-size: 130%" class=" my-2">${collection.description}<h4>
        <p><i>Created ${collection.creationDate}</i></p>
        <input style="background-color: lightblue; width: 50%" type='text'>
    </div>
    `;
  const parser = new DOMParser();
  const newCollection = parser.parseFromString(newCollectionHTML, "text/html").body.firstChild;
  collectionSection.appendChild(newCollection);
}