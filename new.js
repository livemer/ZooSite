const modal_wrapper = document.querySelector(".modal__wrapper")

const modal_call = document.querySelector(".modal__call")
const modal_ok = document.querySelector(".modal__ok")
const modal_buy = document.querySelector(".modal__buy")

const call__btn = document.querySelectorAll(".call__btn")
const ok__btn = document.querySelectorAll(".ok__btn")

const cross = document.querySelectorAll(".close__btn")
let newArrows = document.querySelectorAll(".newArrows button")
let newDiv = document.querySelector(".box__main__new")

function mainNew(){
  let item = document.querySelector(".item")
  let itemNum = document.querySelectorAll(".item").length;

  let count = 0;
  let step = item.clientWidth+30;
  
  let minCount = 0;
  let maxCount = -itemNum/2*step+step+step;
  
  newArrows.forEach(element => {
    element.addEventListener("click", function(e){
      
      if(element.className == "left"){
        count += step
      }
      else{
        count -= step
      }
      if(count>minCount){
        count = maxCount
      }
      else if(count<maxCount){
        count = minCount
      }
      SetPos(count)
    })
  });
  
  function SetPos(num){
    newDiv.style.transform = "translateX("+num+"px)"
  }
}


fetch('https://oliver1ck.pythonanywhere.com/api/get_products_list/')
.then((response) => {
  return response.json();
})
.then((data) => {
  let res = data['results']
  for(let i = 0; i < res.length; i++) {
    let elem = document.createElement("article");
    elem.className = "item"
    elem.style.backgroundColor = "rgb(250, 251, 251)"
    elem.innerHTML = `<div class="item__header">
            <img src="${res[i]['image_prev']}" alt="">
            <h3 class="article__header">${res[i]['title']}</h3>
          </div>
          <div class="item_main">
            <div class="count">
              ${
      
      res[i]['countitemproduct_set'].map(element => `<div class="cnt">${element.value} ${element.unit}</div>`).join("")}
            </div>
          </div>
          <div class="item__footer">
            <div>
              <p class="text">${res[i]['price']} BYN</p>
              <button class="cart" style="background:none;">
                <p class="text">+</p>
                <img src="./img/Primary fill(2).svg" alt="">
              </button>
            </div>
            <button class="big__btn buy__btn"><p class="btn__text">Купить в 1 клик</p></button>
          </div>`
    
    for (let i = 0; i < elem.children[1].children[0].childElementCount; i++) {
      child = elem.children[1].children[0].children[i]
      

      child.addEventListener("click", function(e){
        cn = elem.children[1].children[0].children[i].className
        for (let j = 0; j < elem.children[1].children[0].childElementCount; j++) {
          elem.children[1].children[0].children[j].className = "cnt"
        }
        if(cn == "selected__cnt"){
          elem.children[1].children[0].children[i].className = "cnt"
        }
        else{
          elem.children[1].children[0].children[i].className = "selected__cnt"
        }
      })
    }
    console.log(elem)
    newDiv.append(elem)
    event_btn(elem.children[2].children[1])
  }
  mainNew()
});

function event_btn(item){
    item.addEventListener("click", function(e){
      const target = e.target
      const item = target.closest(".item")

      let obj = {}

      obj["img"] = item.querySelector(".item__header img").src
      obj["title"] = item.querySelector(".item__header .article__header").innerText
      obj["price"] = item.querySelector(".item__footer div .text").innerText
      obj["count"] = item.querySelector(".item_main .count").children
      console.log(obj['count'])

      document.body.style.overflow = "hidden"
      modal_wrapper.style.display = "flex";
      modal_buy.style.display = "flex";
      modal_call.style.display = "none";
      modal_ok.style.display = "none";  

      modal_buy.querySelector(".buy__list img").src = obj['img']
      modal_buy.querySelector(".buy__list div .text").innerText = obj['title']
      modal_buy.querySelector(".buy__list .price p").innerText = obj['price']
      modal_buy.querySelector(".buy__list .count").innerHTML = ""
      for(let i = 0; i < obj['count'].length; i++){
        modal_buy.querySelector(".buy__list .count").append(obj['count'][i].cloneNode(true))
      }
    })
}

function close_modal(){
  document.body.style.overflow = "auto"
  modal_wrapper.style.display = "none";
  modal_buy.style.display = "none";
  modal_call.style.display = "none";
  modal_ok.style.display = "none";
}

function call_modal(){
  document.body.style.overflow = "hidden"
  modal_wrapper.style.display = "flex";
  modal_buy.style.display = "none";
  modal_call.style.display = "flex";
  modal_ok.style.display = "none";
}

function ok_modal(){
  document.body.style.overflow = "hidden"
  modal_wrapper.style.display = "flex";
  modal_buy.style.display = "none";
  modal_ok.style.display = "flex";
  modal_call.style.display = "none";
}

for(let i = 0; i < cross.length; i++){
  cross[i].addEventListener("click", function(e){
    close_modal()
  })
}

for(let i = 0; i < call__btn.length; i++){
  call__btn[i].addEventListener("click", function(e){
    call_modal()
  })
}

for(let i = 0; i < ok__btn.length; i++){
  ok__btn[i].addEventListener("click", function(e){
    ok_modal()
  })
}

