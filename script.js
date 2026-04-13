let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount(){
  let count = cart.reduce((a,b)=>a+b.qty,0);
  let el = document.getElementById('cart-count');
  if(el) el.innerText = count;
}

function addToCart(name, price) {
  let found = cart.find(p=>p.name===name);
  if(found){ found.qty++; }
  else { cart.push({name, price, qty:1}); }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Sepete eklendi');
}

function loadCart() {
  let list = document.getElementById('cartList');
  let total = 0;
  list.innerHTML='';

  cart.forEach((item,i)=>{
    total += item.price * item.qty;
    let li=document.createElement('li');
    li.innerHTML = `${item.name} (${item.qty}) - ${item.price*item.qty} TL 
    <button onclick="changeQty(${i},1)">+</button>
    <button onclick="changeQty(${i},-1)">-</button>
    <button onclick="removeItem(${i})">Sil</button>`;
    list.appendChild(li);
  });

  document.getElementById('total').innerText='Toplam: '+total+' TL';
  updateCartCount();
}

function changeQty(i,d){
  cart[i].qty+=d;
  if(cart[i].qty<=0) cart.splice(i,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function toggleDark(){
  document.body.classList.toggle('dark');
}

function goDetail(name,price,img){
  localStorage.setItem('detail', JSON.stringify({name,price,img}));
  window.location='product-detail.html';
}

function loadDetail(){
  let d = JSON.parse(localStorage.getItem('detail'));
  document.getElementById('detail').innerHTML=`
  <img src="${d.img}" style="width:300px">
  <h2>${d.name}</h2>
  <p>${d.price} TL</p>
  <button onclick="addToCart('${d.name}',${d.price})">Sepete Ekle</button>`;
}