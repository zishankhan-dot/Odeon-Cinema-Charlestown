document.addEventListener("DOMContentLoaded",()=>{
    fetchMovies();
})




// function to delete movie from DB

function deletemovie(btn){
            const father=btn.closest("tr.cart-father");
            const name=father.querySelector('td.cart-movie').textContent.trim();
            fetch("/cart/delete",{
                method:"DELETE",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({
                    name:name})
                }
            
            ).then(data=>{console.log(data)
                     fetchMovies();})    //its going to use fetchMovie fxn -> return updated table
            .catch(err=>console.error(err))
}





//will send patch request to backend to update particular movie qty on the movie cart 
function updateqty(btn){
            //taking input for qty using closest element 
            const father=btn.closest("tr.cart-father");
            const container=btn.closest("div");
            const name=father.querySelector('td.cart-movie').textContent.trim();
            const qty=Number(container.querySelector("input.cart-qty").value);

    fetch("/cart/patch",{
        method:"PATCH",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
           qty:qty,
           name:name,
        }),
    })
    .then(response=>console.log(response))
    .catch(err=>console.error(err));
}


//getting details from cart and dynamically rendering it on table on cart page 
async function fetchMovies(){
        const response = await fetch("/cart/get",{
            method:'get',
        }).then(async response=>{
        if (response.status==200){
            try{
            const movie= await response.json("cart");
            console.log(movie.cart);


            const container=document.getElementById("container");
            container.innerHTML="";


            movie.cart.forEach(element => {
                const card=document.createElement("tr");
                card.classList.add("cart-father");
                card.innerHTML=`
                    <td scope="row" class="cart-movie">${element.MovieName}</td>
                    <td scope="row">${element.price}</td>
                    <td>
                    <div scope='row' class="w-50 btn-group h6 d-flex justify-content-middle w-100 " >
                                <button type="button" class="btn btn-dark btn-sm plus" >+</button>
                                <input type="text" style="width:20%;text-align: center;" class="input-number cart-qty" value="${element.qty}">
                                <button type="button" class="btn btn-dark minus" >-</button>
                                <button type="button" class="btn btn-danger btn-update" onclick="updateqty(this)">UPDATE</button>
                                <button type="button" class="btn btn-danger btn-update container-fluid" onclick="deletemovie(this)">DELETE</button>
                        </div>
                    </td>`;
                container.appendChild(card);
            })}
            catch(err){
                console.error(err)
            }

            }
        else{  
            const container=document.getElementById("table")
            container.innerHTML=""
            container.innerHTML=`<h1 class="fw-bolder"style="color:red">LOGIN TO SEE CART ITEMS !!</h1>`;
        }})
        }
