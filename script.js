let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* CART SAYACI */
function updateCartCount(){
  let count = cart.reduce((a,b)=>a+b.qty,0);
  let el = document.getElementById("cart-count");
  if(el) el.innerText = count;
}

/* SEPETE EKLE */
function addToCart(name, price){
  let item = cart.find(p=>p.name===name);
  if(item) item.qty++;
  else cart.push({name, price, qty:1});

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/* SEPET YÜKLE */
function loadCart(){
  let list = document.getElementById("cartList");
  let total = 0;
  list.innerHTML = "";

  cart.forEach((item,i)=>{
    total += item.price * item.qty;

    let li = document.createElement("li");
    li.style = `
      list-style:none;
      background:white;
      margin:10px 0;
      padding:15px;
      border-radius:12px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      box-shadow:0 5px 15px rgba(0,0,0,0.1);
    `;

    li.innerHTML = `
      <div>
        <b>${item.name}</b><br>
        <small>${item.price} TL x ${item.qty}</small>
      </div>

      <div style="display:flex; gap:5px;">
        <button onclick="changeQty(${i},1)">+</button>
        <button onclick="changeQty(${i},-1)">-</button>
        <button onclick="removeItem(${i})" style="background:red;">Sil</button>
      </div>
    `;

    list.appendChild(li);
  });

  document.getElementById("total").innerText =
    "Toplam: " + total + " TL";

  updateCartCount();
}

/* ADET */
function changeQty(i, d){
  cart[i].qty += d;
  if(cart[i].qty <= 0) cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

/* SİL */
function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

/* DARK MODE */
function toggleDark(){
  document.body.classList.toggle("dark");
}

/* ÜRÜN DETAY */
function goDetail(name,price,img){
  localStorage.setItem("detail", JSON.stringify({name,price,img}));
  window.location="product-detail.html";
}

function loadDetail(){
  let d = JSON.parse(localStorage.getItem("detail"));

  document.getElementById("detail").innerHTML = `
    <img src="${d.img}" style="width:300px;border-radius:10px">
    <h2>${d.name}</h2>
    <p>${d.price} TL</p>
    <button onclick="addToCart('${d.name}',${d.price})">Sepete Ekle</button>
  `;
  function getTotal(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((a,b)=>a + (b.price*b.qty),0);
}

function clearCart(){
  localStorage.removeItem("cart");
  alert("Sepet temizlendi");
  window.location = "index.html";
}
}