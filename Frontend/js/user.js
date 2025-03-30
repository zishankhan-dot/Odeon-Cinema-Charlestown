function Func1(){
    let Email=document.getElementById("user").value ;
    let password=document.getElementById("passwd").value ;
    console.log(Email,password);
    console.log("functioncalled")


//fetch api ...
    fetch('/User/new',{
        method:'Post',
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({Email,password})
    })
    .then(data=>{console.log(data)})
    .catch(err=>{console.error(err)})
}
document.querySelector('form').addEventListener('submit',Func1);