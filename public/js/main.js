console.log('connected...');
const order = {
    price: null,
    toppings: [],
    total: 0
};

const toppings = document.querySelector('.popop-modal');

toppings.addEventListener('click', (e) => {
    // console.log(e.target.value);
    addTopping(e.target.value);
});


// check if added
function addTopping(event){

    let toppings = {};
    if (toppings.hasOwnProperty('event')){
        console.log('Already added');
        return 'Added';
    }

    else{
    
        toppings[event] = event;
        console.log(toppings);
       
    }

    while(order.toppings.length > 0){
        console.log('yes');
    };
    // Check if topping was already added
    
    // let count = 0;
   
    
    // console.log(Object.keys(toppings));
    // while (order.toppings.length > 0){

    //     for (let topping of order.toppings){
    //         if (topping === event){
    //             continue;
    //         }

    //     }

    // };
};

// quantity
let quantities = document.querySelectorAll('.quantity');
for (let quantity of quantities){
  quantity.addEventListener('change', quantityChanged)
}

// Add to cart
let addToCartButton = document.querySelectorAll('.add');
for (let button of addToCartButton){
  console.log(button, 'test');
  button.addEventListener('click', addToCart);
};


function addToCart(event){
  let button = event.target;
  let menu = button.parentElement.parentElement;
  let price = menu.querySelector('.price');
  let title = menu.querySelector('.title');
  // let qty = 0;
  // quantity.addEventListener('change', (val) => {
  //   console.log(val);
  // });
  
  let p = price.innerText;
  let t = title.innerText;
  console.log('clicked');
  console.log(price);
  console.log(title);
  appendNewRow(t, p);
  updateTotal();
};

function appendNewRow(title, price, qty){
  let cart = document.querySelector('.cart');
  // let cartRows = document.querySelector('.cartRows');
  // let newRow = document.createElement('tr');
  let titles = document.querySelectorAll('.cartTitle');
  
  for (let value of titles){
    console.log(value);
    if (value.innerText === title){
      console.log(value.innerText);
      alert('Item already added');
      return;
    };
  };

  let newRowContent = 
  `<tr class="cartRows">
      <td  class="cartTitle">${title}</td>
      <td class="price">${price}</td>
      <td> 
        <input class="quantity" type="number" name="" id="" value="" class="quantity">
        <button class="removed"> delete </button>
      </td>
    </tr>`;
// newRow.innerHTML = newRowContent;
// cart.append(newRow);
cart.insertAdjacentHTML('afterbegin', newRowContent);
cart.querySelector('.removed').addEventListener('click', removeItem);
cart.querySelector('.quantity').addEventListener('change', quantityChanged);
};
  

// Removed buttons
const removed = document.getElementsByClassName('removed');

for (let button of removed){
    button.addEventListener('click', removeItem);
};

function removeItem(event){
  let btn = event.target;
  console.log('clicked');
  btn.parentElement.parentElement.remove();
  updateTotal();
};



function quantityChanged(event){
  let input = event.target;
  console.log('QTY clicked');
  if (isNaN(input.value) || input.value <= 0){
    console.log('QTY Changed');
    input.value = 1;
  }
  updateTotal();
};



// Update cart total 
function updateTotal() {
  let cart = document.querySelector('.menu');
  // console.log(cart);
  let cartRows = cart.querySelectorAll('.cartRows');
  let total = 0;

  for (let row of cartRows){
      // console.log(row);
      let price = row.querySelector('.price');
      console.log(price);
      let quantity = row.querySelector('.quantity');
      let priceNum = parseInt(price.innerText.replace('$', ''));
      let quanNum = quantity.value;
      console.log(priceNum);
      console.log(quanNum);
      total = total + (priceNum * quanNum);
      console.log(total);
  };

  // query class of total and set its innerText
  document.querySelector('.total').innerText = `$${total}`;
  
}

document.querySelector('.buy').addEventListener('click', buyClicked);
function buyClicked(){
  let cart = document.querySelector('.cart');
  alert('Thank you');
  
  while (cart.hasChildNodes()) {
    cart.removeChild(cart.firstChild);
  };
  // updateCartTotal();
};