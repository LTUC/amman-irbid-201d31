/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  // let catalog = document.getElementById('catalog');
  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let optionEl = document.createElement('option');
    optionEl.textContent = Product.allProducts[i].name; 
    selectElement.appendChild(optionEl);

  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading

    event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart(event);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list

  const selectElement = document.getElementById('items');
  let item = selectElement.options[selectElement.selectedIndex].text;
  console.log(item);

  
  // TODO: get the quantity
  let itemQuantityEl = document.getElementById('quantity');
  let itemQuantity = itemQuantityEl.value;
      console.log(itemQuantity);
  // TODO: using those, add one item to the Cart
  cart.addItem(item, itemQuantity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let itemCount = document.getElementById('itemCount');
  itemCount.textContent = cart.items.length;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div

let cartContents = document.getElementById('cartContents');
let itemsUL = document.createElement('ul')
cartContents.appendChild(itemsUL);

function updateCartPreview() {
  // TODO: Get the item and quantity from the form

  const selectElement = document.getElementById('items');
  let item = selectElement.options[selectElement.selectedIndex].text;
  let itemQuantityEl = document.getElementById('quantity');
  let itemQuantity = itemQuantityEl.value;

  // TODO: Add a new element to the cartContents div with that information
  let itemsList = document.createElement('li');
  
  itemsList.textContent = `${item} was added ${itemQuantity} times.`

  itemsUL.appendChild(itemsList);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();


