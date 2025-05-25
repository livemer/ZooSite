let arrows = document.querySelectorAll(".arrows button")
let mainDiv = document.querySelector(".box__main")


function main(){
  let item = document.querySelector(".item")
  let itemNum = document.querySelectorAll(".item").length;

  let count = 0;
  let step = item.clientWidth+30;
  
  let minCount = 0;
  let maxCount = -itemNum/2*step+step+step;
  
  arrows.forEach(element => {
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
    let elem = document.createElement("article");
    elem.className = "item"
    elem.innerHTML = `<div class="item__header">
            <img src="${res[i]['image_prev']}" alt="">
            <h3 class="article__header">${res[i]['title']}</h3>
          </div>
          <div class="item_main">
            <div class="count">
              
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
            <button class="big__btn"><p class="btn__text">Купить в 1 клик</p></button>
          </div>`
    res[i]['countitemproduct_set'].forEach(element => {
      elem.children[1].children[0].innerHTML = `${elem.children[1].children[0].innerHTML}<div class="cnt">${element.value} ${element.unit}</div>`
    });
    for (let i = 0; i < elem.children[1].children[0].childElementCount; i++) {
      child = elem.children[1].children[0].children[i]
      console.log(child);
      

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
    mainDiv.append(elem)
  }
  main()
});