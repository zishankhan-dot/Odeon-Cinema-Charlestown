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


//sending post request on clicking submit button 
document.getElementById("cards").addEventListener("click",e=>{
if(e.target.classList.contains('submit-btn')){
const MovieName=e.target.closest(".card-body").querySelector(".card-title").innerText;
const qty=parseInt(e.target.closest('.card-body').querySelector('.input-number').value);
console.log(MovieName,qty);

    fetch("/cart/post",{
        method:"POST",
        headers:{"content-type":'application/json'},
        body:JSON.stringify({MovieName,qty})
    }).then(data=>console.log(data))
    .catch(err=>console.error(err));
    }
})