let newArrows = document.querySelectorAll(".newArrows button")
let newDiv = document.querySelectorAll(".box__main")[1]

function main(){
  let item = document.querySelector(".item")
  let itemNum = document.querySelectorAll(".item").length;

  let count = 0;
  let step = item.clientWidth+30;
  
  let minCount = 0;
  let maxCount = -itemNum*step+step+step;
  
  newArrows.forEach(element => {
    element.addEventListener("click", function(e){
      
      console.log(element);
      
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
    mainDiv.style.transform = "translateX("+num+"px)"
  }
}


fetch('https://oliver1ck.pythonanywhere.com/api/get_products_list/')
.then((response) => {
  return response.json();
})
.then((data) => {
  let res = data['results']
  for(let i = 0; i < res.length; i++) {
    console.log(res[i]);
    let elem = document.createElement("div");
    elem.className = "item"
    elem.style.backgroundColor = "rgb(250, 251, 251)"
    elem.innerHTML = `<div class="item__header">
            <img src="${res[i]['image_prev']}" alt="">
            <p class="text">${res[i]['title']}</p>
          </div>
          <div class="item_main">
            <div class="count">
              
            </div>
          </div>
          <div class="item__footer">
            <div>
              <p class="text">${res[i]['price']} BYN</p>
              <button class="cart__button" style="background:none;">
                <p class="text">+</p>
                <img src="./img/Primary fill(2).svg" alt="">
              </button>
            </div>
            <button class="big__btn"><p class="btn__text">Купить в 1 клик</p></button>
          </div>`
    res[i]['countitemproduct_set'].forEach(element => {
      elem.children[1].children[0].innerHTML = `${elem.children[1].children[0].innerHTML}<div class="cnt">${element.value} ${element.unit}</div>`
      
    });
    
    newDiv.append(elem)
  }
  main()
});