// ===============================
// VADILAL ICE CREAM SHOP
// PREMIUM JAVASCRIPT
// ===============================

// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// ===============================
// BACK TO TOP BUTTON
// ===============================
const backTop = document.querySelector(".back-top");

if (backTop) {

window.addEventListener("scroll", () => {

if (window.scrollY > 400) {

backTop.style.display = "flex";

} else {

backTop.style.display = "none";

}

});

}
// ===============================
// PRODUCT CART
// ===============================

let cart=[];

function addToCart(name,price){

cart.push({

name:name,

price:price,

qty:1

});

localStorage.setItem("cart",JSON.stringify(cart));

alert(name+" added to cart.");

updateCart();

}

// ===============================
// UPDATE CART
// ===============================

function updateCart(){

const cartCount=document.querySelector(".cart-count");

if(cartCount){

cartCount.innerHTML=cart.length;

}

}

// ===============================
// LOAD CART
// ===============================

window.onload=function(){

const saved=localStorage.getItem("cart");

if(saved){

cart=JSON.parse(saved);

}

updateCart();

};

// ===============================
// BUY NOW
// ===============================

function buyNow(product){

alert("Proceeding to checkout for "+product);

}

// ===============================
// WHATSAPP ORDER
// ===============================

function whatsappOrder(product){

const number="9779822108898";

const msg="Hello, I want to order "+product;

window.open(

"https://wa.me/"+number+"?text="+encodeURIComponent(msg),

"_blank"

);

}// ===============================
// CART RENDER
// ===============================

function renderCart(){

const cartContainer=document.getElementById("cart-items");

const totalElement=document.getElementById("cart-total");

if(!cartContainer) return;

cartContainer.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

total += item.price * item.qty;

cartContainer.innerHTML += `

<div class="cart-item">

<h4>${item.name}</h4>

<p>NPR ${item.price}</p>

<div class="qty-box">

<button onclick="decreaseQty(${index})">-</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

<button onclick="removeItem(${index})">

Remove

</button>

</div>

`;

});

if(totalElement){

totalElement.innerHTML="NPR "+total;

}

updateCart();

}

// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQty(index){

cart[index].qty++;

localStorage.setItem("cart",JSON.stringify(cart));

renderCart();

}

// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQty(index){

if(cart[index].qty>1){

cart[index].qty--;

}else{

cart.splice(index,1);

}

localStorage.setItem("cart",JSON.stringify(cart));

renderCart();

}

// ===============================
// REMOVE ITEM
// ===============================

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

renderCart();

}

// ===============================
// CLEAR CART
// ===============================

function clearCart(){

cart=[];

localStorage.removeItem("cart");

renderCart();

}

// ===============================
// CHECKOUT
// ===============================

function checkout(){

if(cart.length===0){

alert("Your cart is empty.");

return;

}

alert("Thank you for your order!");

clearCart();

}

// ===============================
// LOAD CART AFTER PAGE LOAD
// ===============================

window.addEventListener("load",()=>{

renderCart();

});// ===============================
// FAVORITE (WISHLIST)
// ===============================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleFavorite(name){

    const index = wishlist.indexOf(name);

    if(index === -1){
        wishlist.push(name);
        alert(name + " added to Wishlist ❤️");
    }else{
        wishlist.splice(index,1);
        alert(name + " removed from Wishlist");
    }

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

}

// ===============================
// PRODUCT SEARCH
// ===============================

const searchInput=document.getElementById("searchProduct");

if(searchInput){

searchInput.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

let name=card.querySelector("h3").innerText.toLowerCase();

if(name.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

// ===============================
// CATEGORY FILTER
// ===============================

function filterCategory(category){

document.querySelectorAll(".product-card").forEach(card=>{

let type=card.dataset.category;

if(category==="all"){

card.style.display="block";

}else if(type===category){

card.style.display="block";

}else{

card.style.display="none";

}

});

}

// ===============================
// GALLERY LIGHTBOX
// ===============================

document.querySelectorAll(".gallery-grid img").forEach(img=>{

img.addEventListener("click",()=>{

const overlay=document.createElement("div");

overlay.style.position="fixed";
overlay.style.top="0";
overlay.style.left="0";
overlay.style.width="100%";
overlay.style.height="100%";
overlay.style.background="rgba(0,0,0,.9)";
overlay.style.display="flex";
overlay.style.alignItems="center";
overlay.style.justifyContent="center";
overlay.style.zIndex="9999";

const image=document.createElement("img");

image.src=img.src;

image.style.maxWidth="90%";
image.style.maxHeight="90%";
image.style.borderRadius="15px";

overlay.appendChild(image);

overlay.onclick=()=>{

overlay.remove();

};

document.body.appendChild(overlay);

});

});

// ===============================
// FADE ANIMATION
// ===============================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section").forEach(sec=>{

observer.observe(sec);

});// ===============================
// AUTO REVIEW SLIDER
// ===============================

let reviewIndex = 0;

function autoReviewSlider() {

    const reviews = document.querySelectorAll(".review-card");

    if (reviews.length === 0) return;

    reviews.forEach(review => {
        review.style.display = "none";
    });

    reviewIndex++;

    if (reviewIndex > reviews.length) {
        reviewIndex = 1;
    }

    reviews[reviewIndex - 1].style.display = "block";

    setTimeout(autoReviewSlider, 4000);

}

window.addEventListener("load", autoReviewSlider);

// ===============================
// ANIMATED COUNTERS
// ===============================

function animateCounters() {

    document.querySelectorAll(".counter").forEach(counter => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const step = Math.ceil(target / 100);

        const timer = setInterval(() => {

            current += step;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            counter.innerText = current;

        }, 20);

    });

}

window.addEventListener("load", animateCounters);

// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if(menuBtn){

menuBtn.onclick = () =>{

nav.classList.toggle("active");

};

}

// ===============================
// PAGE LOADER
// ===============================

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},600);

}

});

// ===============================
// TOAST MESSAGE
// ===============================

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerText=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.remove();

},3000);

}

// ===============================
// COPY PHONE NUMBER
// ===============================

function copyPhone(){

navigator.clipboard.writeText("+9779821208898");

showToast("Phone Number Copied");

}

// ===============================
// COPY ADDRESS
// ===============================

function copyAddress(){

navigator.clipboard.writeText("Adarsh Nagar Road, Birgunj 44300, Nepal");

showToast("Address Copied");

}// ======================================
// VADILAL ICE CREAM SHOP
// SCRIPT.JS - PART 5 (FINAL)
// ======================================

// Lazy Loading Images
document.querySelectorAll("img").forEach(img=>{
    img.setAttribute("loading","lazy");
});

// Navbar Active Link
const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-120;

if(pageYOffset>=sectionTop){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

// Newsletter
const newsletter=document.querySelector(".newsletter form");

if(newsletter){

newsletter.addEventListener("submit",(e)=>{

e.preventDefault();

const email=newsletter.querySelector("input").value.trim();

if(email===""){

showToast("Please enter your email.");

return;

}

showToast("Thank you for subscribing!");

newsletter.reset();

});

}

// Contact Form
const contactForm=document.querySelector(".contact form");

if(contactForm){

contactForm.addEventListener("submit",(e)=>{

e.preventDefault();

showToast("Message Sent Successfully.");

contactForm.reset();

});

}

// Buy Buttons
document.querySelectorAll(".buy-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

const card=btn.closest(".product-card");

const name=card.querySelector("h3").innerText;

buyNow(name);

});

});

// WhatsApp Buttons
document.querySelectorAll(".wa-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

const card=btn.closest(".product-card");

const name=card.querySelector("h3").innerText;

whatsappOrder(name);

});

});

// Favorite Buttons
document.querySelectorAll(".fav-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

const card=btn.closest(".product-card");

const name=card.querySelector("h3").innerText;

toggleFavorite(name);

btn.classList.toggle("active");

});

});

// Reveal Animation
const revealObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".product-card,.review-card,.stat-box,.gallery-grid img").forEach(item=>{

revealObserver.observe(item);

});

// Console Message
console.log("Vadilal Ice Cream Shop Website Loaded Successfully");

// End
