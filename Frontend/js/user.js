function Func1(){
let Email=document.getElementById("user").value ;
let password=document.getElementById("passwd").value ;


//fetch api ...
fetch('/User/new',{
    method:'Post',
    headers:{
        "content-type":"application/json",
    },
    body:JSON.stringify({Email,password})
})
}