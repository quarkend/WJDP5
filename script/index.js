const apiUrl = "http://localhost:3000/api/teddies";
/* permet de recuperer les produits depuis le serveur*/
fetch(apiUrl)
  .then((response) => response.json())
  .then((products) => {
    console.log(apiUrl);
    askTeddies(products);
  });
function setProduct(product) {
  return `
   <div id="product-card" class="col-sm-6 col-md-4 m-2">
        <article class=" card nav-bg-color  border-dark">
           <h3  id="nom-product" class="text-center card-title">${product.name}
                    </h3>
            <img id="img-product" class="img-top" src="${product.imageUrl
    }"alt="Photo Teddy">
                <aside class="card-body ">
                 
                    <div class="text-center">
                        ${(product.price / 100).toFixed(2).replace(".", ",")}€
                        </div>
                       <div class="text-center"> 
                    <button class=" btn btn-success font-weight-bold">
           <a class="product__btn" href="../pages/produit.html?${product._id}">
           Voir l'offre</a>
                    </button>
                    </div>
                </aside>
                </article>
        </div>
     `;
}
/*
Affichage de tous les produits sous forme de liste
À l'aide de la balise <a> : envoi de l'id du produit sélectionné vers la page produit.html
*/
function askTeddies(products) {
  const productlist = document.getElementById("productlist");
  products.forEach((product) => {
    productlist.insertAdjacentHTML("beforeend", setProduct(product));
  });
}
