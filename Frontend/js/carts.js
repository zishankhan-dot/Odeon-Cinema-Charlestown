document.addEventListener("DOMContentLoaded",()=>{
    fetchMovies();
})

async function fetchMovies(){
try{
const response = await fetch("/cart/get",{
    method:'get',
})
const movie= await response.json("cart");
console.log(movie.cart);


const container=document.getElementById("container");
container.innerHTML="";


movie.cart.forEach(element => {
    const card=document.createElement("div");
    card.classList.add("card")
    card.innerHTML=`
    <img src="" alt="${element.MovieName}" class="card-img-top">
    <div class="card-body">
    <h2 class="card-header">MOVIE: ${element.MovieName}</h2>
    <h3 class="card-header">QTY: ${element.qty}</h3>
    </div>`;
    container.appendChild(card);
});

}
catch(err){
    console.error(err)
}
}