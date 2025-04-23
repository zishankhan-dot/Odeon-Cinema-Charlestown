document.getElementById("cards").addEventListener("click",function(e){
    if(e.target.classList.contains("plus")){
        let input = e.target.closest(".card-body").querySelector(".input-number")
        input.value=parseInt(input.value)+1;

    }
    if(e.target.classList.contains("minus")){
        let input = e.target.closest(".card-body").querySelector(".input-number")
        currentValue=parseInt(input.value);
        if(currentValue>0){
            input.value=currentValue-1;
        }

    }
})

//capturing search btn 
function searchItem(btn){
    const container=btn.closest('.container');
    const item=container.querySelector(".form-control").value.trim()
  //  console.log(item)
  const cols=document.querySelectorAll('.col');
  cols.forEach(col=>{
    console.log(col)
    const title=col.querySelector('.card-title').innerText;
    if(title.toLowerCase().includes(item.toLowerCase())|| title.trim()===""){
        col.style.display="block";
        console.log(title)
    }
    else{
        col.style.display="none"
    }
  })
}


//sending post request on clicking submit button 
document.getElementById("cards").addEventListener("click",e=>{
if(e.target.classList.contains('submit-btn')){
const MovieName=e.target.closest(".card-body").querySelector(".card-title").innerText;
const PriceSymbol=e.target.closest(".card-body").querySelector(".card-price").innerText;
const Price=parseFloat(PriceSymbol.replace("$",""))
const qty=parseInt(e.target.closest('.card-body').querySelector('.input-number').value);
console.log(MovieName,qty,Price);

    fetch("/cart/post",{
        method:"POST",
        headers:{"content-type":'application/json'},
        body:JSON.stringify({MovieName,qty,Price})
    }).then(data=>console.log(data))
    .catch(error)(alert("login first"));
    }
})