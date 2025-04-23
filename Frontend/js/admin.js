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
                    <td scope="row" class="cart-email text-center">${element.Email}</td>
                    <td scope="row" ><input type="text" Placeholder="Update Email"><button onclick="update(this)">Update</button></td>
                    <td scope="row"><button onclick="deleteuser(this)">Delete</button>
                   
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


// function to delete user from database 
function deleteuser(btn){
    const container=btn.closest(".cart-father");
    const Email=container.querySelector(".cart-email").innerText;
    console.log(Email)
    fetch("/User/deleteUser",{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({Email})
    }).then(response=>{
        if(response.status==200){
            alert("User DELETED");
            loaduserdata();
        }
        else{
            alert("ERROR OCCURRED!! ")
        }
    })
    

}