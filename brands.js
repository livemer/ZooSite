let grid = document.querySelector(".brands__grid")

fetch('https://oliver1ck.pythonanywhere.com/api/get_brands_list/')
.then((response) => {
  return response.json();
})
.then((data) => {
  let res = data['results']
  for(let i = 0; i < 18; i++) {
    let elem = document.createElement("div");
    elem.className = "brands-grid__item"
    elem.innerHTML = `<img>`
    elem.children[0].src = res[i]['image']
    
    grid.append(elem)
  }
});