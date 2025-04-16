/*   function Func1(){
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
    document.querySelector('form').addEventListener('submit',Func1);     */


//fetch api to register  using function 
    function Register(){
        let Name=document.getElementById("registerName").value;
        let Email=document.getElementById("registerEmail").value;
        let Password=document.getElementById("registerPassword").value;
        let ConfirmPassword=document.getElementById("ConfirmPassword").value;
        console.log(Name,Email,Password,ConfirmPassword)
/// addresss for post route to be used in fecth api 
        fetch('User/new',{
        method:'Post',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({Name,Email,Password,ConfirmPassword})

        }).then(data=>{console.log(data)})
        .catch(err=>{console.error(err)})
    
    }


// function to do fetch post to check user ..
function signIn(){
    const Email=document.getElementById("loginName").value;
    const Password=document.getElementById("loginPassword").value;
    fetch("User/login",{
        method:"Post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({Email,Password})
    })
    .then(res=>res.json())
    .then(data=>{console.log(data.role)
            if(data.role==="Admin"){
                window.location.href="/admin.html"
            }
            else (window.location.href="/cart.html")
    })
    .catch(err=>console.error(err));
}