document.addEventListener('DOMContentLoaded',()=>{
    loaduserdata();
})

//function to load userdata 
function loaduserdata(){
    fetch("/User/dataload",{
        method:"Get",
    }).then(async response=>{
        if(response.status!==200){alert("not authorized")
            window.location.href="/"
        }
        else if (response.status==200){
            try{
            const Users= await response.json()
            console.log(Users);
            console.log("typeof user:",typeof(Users))

            const container=document.getElementById("container");
            container.innerHTML="";


            Users.users.forEach(element => {
                const card=document.createElement("tr");
                card.classList.add("cart-father");
                card.innerHTML=`
                    
                    <td scope="row" class="cart-movie text-center">${element.Name}</td>
                    <td scope="row" class="text-center">${element.Email}</td>
                   
                    `;
                container.appendChild(card);
            })}
            catch(err){
                console.error(err)
            }

            }
        else{  
            const container=document.getElementById("table")
            container.innerHTML=""
            container.innerHTML=`<h1 class="fw-bolder"style="color:red">NOT ADMIN !!</h1>`;
        }})
        }
