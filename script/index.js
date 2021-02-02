/*
const apiUrl = 'http://localhost:3000/api/teddies?';

//fonction apppel des ours
async function askTeddies() {
    let promise = await fetch(apiUrl);
    let response = await promise.json();
    return response;
}

function askAndCreateTeddies() {
    askTeddies().then(function (response){
        console.log("test");
        console.log(response);
        // response = liste de nounours
        //boucle pour gérer chaque résultat de la liste
        response.forEach((product)=> {
            console.log(product);
            let result = createHtmlForProduct(product);
            console.log(result);
            document.getElementById("produit").appendChild(result);
            //a partir de chaque élément extrait de la liste 
            //crée du code html à injecter dans la page 

        })
    });
}


//fonction de création du code html
function createHtmlForProduct(product){
    let container = document.createElement("div");
    container.classList.add("col-lg-4","col-md-6", "mb-4");
    container.classList.add("card");
    let card = document.createElement("div");
    card.classList.add("card","h-100");
    let link = document.createElement("a");
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    let newDiv = document.createElement('div')

    newDiv.classList.add('card-body')
   
  
   
    const h2 = document.createElement('h2')
    h2.textContent = product.name;
    
    const p = document.createElement('p')
    p.classList.add('moreInfo')
   
    p.textContent= product.price;   
    p.textContent= product.description;   
    const button = document.createElement('button')
    button.classList.add('btn')
    button.textContent= 'Click to read  more about me '
   
    document.body.appendChild(newDiv)
  
    newDiv.appendChild(h2)
    newDiv.appendChild(p)
    newDiv.appendChild(button)
   
   // Adding event handlers
   
    function showMore(){
      document.querySelector('.card-title').style.display ='block'
   }
   
   document.querySelector('.btn').addEventListener('click', showMore)




 
 //remplir avec des infos de la bdd
    img.alt = product.name;
    img.src = product.imageUrl;
    link.appendChild(img);
    card.appendChild(link);
    container.appendChild(card);
    card.appendChild(newDiv)
    return container;
}

//appel à l'ouverture du site
askAndCreateTeddies();

/*<div class="card-body">
<h4 class="card-title">
  <a href="#">Arnold</a>
</h4>
<h5>39.00€</h5>
<p class="card-text">Lorem ipsum amet.</p>
</div>*/

//const { response } = require("express")

// {/* <div class=""> */}
// {/* <div class="card h-100"> */}
//   <a href="#"><img class="card-img-top" src="http://localhost:3000/images/teddy_1.jpg" alt=""></a>  
//   <div class="card-body">
//     <h4 class="card-title">
//       <a href="#">Norbert</a>
//     </h4>
//     <h5>29.00€</h5>
//     <p class="card-text">Lorem ipsum !
//     </p>
//   </div>
// {/* </div> */}
// {/* </div> */}*/
const apiUrl = "http://localhost:3000/api/teddies"
/* permet de recuperer les produits depuis le serveur*/
fetch(apiUrl)
.then((response) => response.json())
.then(products => {
    console.log(products)
    askTeddies(products);
})
.catch(e => displayError());

/* 
Affichage de tous les produits sous forme de liste 
À l'aide de la balise <a> : envoi de l'id du produit sélectionné vers la page product.html
*/
function askTeddies(products) {

    const productList = document.getElementById("productList"); 

    products.forEach( product => {

        productList.insertAdjacentHTML("beforeend",`
            <li class="product">
                <h2 class="product__name">${product.name}</h2>
                <img class="product__img" src="${product.imageUrl}" alt="Photo Teddy">
                <div class="product__price">${(product.price).toFixed(2).replace(".",",")}€</div>
                <a class="product__btn" href="../pages/produit.html?${product._id}">Voir l'offre</a>
              
            </li>
     `
     )
     
 });
}