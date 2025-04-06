//Populate form.html with content of Cart
function loadCart(){
  let cartOutput = ``;
  let cart = [];
  if (localStorage.getItem("cart") === null){
    cartOutput = `<h4 class="ms-5">Your cart is empty</h4>`
  } else {
    cart = JSON.parse(localStorage.getItem("cart"))
    for (let i in cart){
      if (i == 0){
        cartOutput += `
      <div class="row my-3">
        <div class="col-sm-9">
          <div class="card p-3 border-0 rounded-5 shadow-sm">
            <div class="row g-0 align-items-center">
              <div class="col-md-2">
                <img src="${cart[i].image}" class="img-fluid rounded-4 cart-image-custom" alt="${cart[i].title}">
              </div>
              <div class="col-md-6">
                <div class="card-body ms-3">
                  <h5 class="text-muted mb-1">${cart[i].title}</h5>
                  <h4 class="fw-bold">Price €${cart[i].price}</h3>
                </div>
              </div>
              <div class="col-md-4 d-flex flex-column justify-content-between align-items-end">
                <div class="mb-auto"><p><i type="button" class="bi bi-trash3-fill text-danger fs-4" onclick="removeItem(${i})"></i></p><br>  </div>
                <div class="btn-group align-self-end" role="group" aria-label="Change amount">
                  <button type="button" class="btn rounded-start-4 text-bg-custom">-</button>
                  <div id="qty${i}" class="btn btn-nobtn text-bg-custom">1</div>
                  <button type="button" class="btn rounded-end-4 text-bg-custom">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card p-4 border-0 rounded-5 shadow-sm">
            <h3>Order summary</h3>
            <div class="row mt-3">
              <div class="col-6"><p>Total</p></div>
              <div class="col-6"><p id="total-price" class="fw-bold text-end">€${calculateTotal()}</p></div>
            </div>
          </div>
        </div>
      </div>
      `
      } else {
      cartOutput += `
      <div class="row my-3">
        <div class="col-sm-9">
          <div class="card p-3 border-0 rounded-5 shadow-sm">
            <div class="row g-0 align-items-center">
              <div class="col-md-2">
                <img src="${cart[i].image}" class="img-fluid rounded-4 cart-image-custom" alt="${cart[i].title}">
              </div>
              <div class="col-md-6">
                <div class="card-body ms-3">
                  <h5 class="text-muted mb-1">${cart[i].title}</h5>
                  <h4 class="fw-bold">Price €${cart[i].price}</h3>
                </div>
              </div>
              <div class="col-md-4 d-flex flex-column justify-content-between align-items-end">
                <div class="mb-auto"><p><i type="button" class="bi bi-trash3-fill text-danger fs-4" onclick="removeItem(${i})"></i></p><br>  </div>
                <div class="btn-group align-self-end" role="group" aria-label="Change amount">
                  <button type="button" class="btn rounded-start-4 text-bg-custom">-</button>
                  <button id="qty${i}" class="btn btn-nobtn text-bg-custom">1</button>
                  <button type="button" class="btn rounded-end-4 text-bg-custom">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    }
  }
}
document.getElementById("cart-container").innerHTML = cartOutput
}

function removeItem(itemIndex){
  let cart = [];
  if (localStorage.getItem("cart") != null){
    cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  loadCart();
}

function changeQty(changeBy){

}

function calculateTotal(){
  let cart = [];
  let sum = 0;
  if (localStorage.getItem("cart") != null){
    cart = JSON.parse(localStorage.getItem("cart"))
    cart.forEach(item => sum += item.price);
  }
  return sum.toFixed(2);
}

//Validation for the form
//Valid expressions for each field
const regexName = new RegExp(/^(?!.{50})[A-Za-zåäöÅÄÖ\s]+\s[A-Za-zåäöÅÄÖ\s]+$/); //Done
const regexPhone = new RegExp(/^[0-9\-\(\)\s]{4,50}$/); //Done
const regexEmail = new RegExp(/^(?!.{50})[A-Za-zåäöÅÄÖ\.-_0-9]+@[A_Za-zåäöÅÄÖ\.-_0-9]+\.[a-z]{2,}$/); //Done
const regexStreet = new RegExp(/^(?!.{50})[A-Za-zåäöÅÄÖ\s0-9]{2,}$/); //Done
const regexZipCode = new RegExp(/^[0-9]{5}|[0-9]{3}\s[0-9]{2}$/); //Done
const regexCity = new RegExp(/^[A-Za-zåäöÅÄÖ\s]{2,50}$/); //Done

const validations = [regexName, regexPhone, regexEmail, regexStreet, regexZipCode, regexCity];

//Adds eventlistener to form to perform validation
document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("myForm");
  if (form != null) {
    form.addEventListener("submit", validateFields);
  }
});

//Validation function for the form
function validateFields(e) {
  //Prevents the form from submitting and refreshing
  e.preventDefault();
  
  //All input values in the form to preform validation on
  let fullName = document.getElementById("name");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");
  let street = document.getElementById("street");
  let zipCode = document.getElementById("zipCode");
  let city = document.getElementById("city");
  
  //Adds the input values to an array to validate everything in a for loop
  const values = [fullName, phone, email, street, zipCode, city];

  //Validating each field against it's corresponding expression
  for (i in values) {

    //If the expression is true add "is-valid" to the values class to display a green check-icon"
    if (validations[i].test(values[i].value)) {
      
      //Removes "is-invalid" if it was invalid in the previous attempt
      if (values[i].classList.contains("is-invalid")) {
        values[i].classList.remove("is-invalid");
      }

      //Adds valid to the input
      values[i].classList.add("is-valid");

    } else {
      //Removes "is-valid" if it was valid in the previous attempt
      if (values[i].classList.contains("is-valid")) {
        values[i].classList.remove("is-valid");
      }

      //Adds invalid to the input
      values[i].classList.add("is-invalid");
    }

    let validInputs = 0;

    values.forEach(value => value.classList.contains("is-valid") ? validInputs ++ : validInputs -= 1 );

    if (validInputs === values.length) {
      let success = new bootstrap.Modal(document.getElementById("paymentAccepted"));
      success.show();
    }
  }
}
//End of validation script

//Close successful purchase modal, clear Local Storage and go back to homepage
function closeSuccessfulPurchaseModal() {
  let success = new bootstrap.Modal(document.getElementById("paymentAccepted"));
  localStorage.removeItem("cart");
  success.hide();
  setTimeout(
    () => window.location.href = "index.html",
    400
  )
}

//Fetch products from API and populate product cards on index.html
let products = [];
async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
    console.log(products);
    
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function populateProducts() {
  await fetchProducts();
  let output = `<div class="row">`;
  for (let i in products){
    if (i % 4 == 0 && i != 0)
      output += `</div><div class="row">`;

    output += `
        <div class="col-sm-6 col-lg-3 my-3">
            <div class="card h-100 shadow scale-on-hover cursor-pointer rounded-5" role="button">
                <div class="card-body" data-bs-toggle="modal" data-bs-target="#productModal" onclick="populateProductPopUp(${i})">
                    <!-- pics -->
                    <div class="position-relative mt-3 card-image-container">
                        <img src="${products[i].image}" class="card-img-top card-image-custom position-absolute top-50 start-50 translate-middle img-fluid w-75 object-fit-contain" alt="${products[i].title}">
                    </div>
                    <!-- info -->
                    <div class="mt-4 ms-2">
                        <h5 class="product-title">${getFirstFiveWords(products[i].title)}</h5>
                    </div>
                </div>
                <!-- bottom section -->
                <div class="d-flex justify-content-between align-items-center mx-4 mb-4">
                    <span class="price-text">€${products[i].price.toFixed(2)}</span>
                    <button class="btn btn-custom px-4 py-2 rounded-5" onclick="addToCart(${i})">Add to cart</button>
                </div>
            </div>
        </div>`
  }

  output += `</div>`;
  document.getElementById('prod-container').innerHTML = output;
}
// END fetch products

//Add to cart
function addToCart(index){
  let cart = [];
  if (localStorage.getItem("cart") === null){
    cart.push(products[index])
  } else {
    cart = JSON.parse(localStorage.getItem("cart"))
    cart.push(products[index])
  }
  console.log(cart); //TODO: ta bort
  localStorage.setItem("cart", JSON.stringify(cart)); 
}

function getFirstFiveWords(text) {
  const words = text.split(" ");
  return words.length > 5 ? words.slice(0, 6).join(" ") + "..." : text;
}

function scrollToBottom(){
  const scrollHeight = document.body.scrollHeight;
  window.scrollTo(0, scrollHeight);
}

function populateProductPopUp(index){
  document.getElementById('modal-title').textContent = products[index].title;
  document.getElementById('modal-price').textContent = `€${products[index].price.toFixed(2)}`;
  document.getElementById('modal-desc').textContent = products[index].description;
  document.getElementById('modal-img').src = products[index].image;
  document.getElementById('buy-button').innerHTML = `<button class="btn btn-custom px-4 py-2 rounded-5" onclick="addToCart(${index})">Add to cart</button>`;
}

