document.addEventListener("DOMContentLoaded",()=>{
    fetchMovies();
})

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
                card.innerHTML=`
                    <td scope="row">${element.MovieName}</td>
                    <td scope="row">${element.qty}</td>
                    <td scope="row">${element.price}</td>
                    <td>
                    <div scope='row' class="w-50 btn-group h6 d-flex justify-content-middle w-100">
                                <button type="button" class="btn btn-dark btn-sm plus" >+</button>
                                <input type="text" style="width:20%;text-align: center;" class="input-number" value="${element.qty}">
                                <button type="button" class="btn btn-dark minus" >-</button>
                                <button type="button" class="btn btn-danger btn-update">UPDATE</button>
                                <button type="button" class="btn btn-danger btn-update container-fluid">DELETE</button>
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
