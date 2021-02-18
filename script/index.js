
const apiUrl = "http://localhost:3000/api/teddies"
/* permet de recuperer les produits depuis le serveur*/
fetch(apiUrl)
    .then((response) => response.json())
    .then(products => {
        console.log(products)
        askTeddies(products);
    })


/* 
Affichage de tous les produits sous forme de liste 
À l'aide de la balise <a> : envoi de l'id du produit sélectionné vers la page product.html
*/
function askTeddies(products) {

    const productCard = document.getElementById("productCard");

    products.forEach(product => {

        productlist.insertAdjacentHTML("beforeend", `
      
   <div id="product-card" class="col-sm-6 col-md-4 ">
        <article class=" card nav-bg-color  border-dark">
            <img id="img-product" class="img-top" src="${product.imageUrl}"alt="">
                <aside class="card-body">
                    <h3 id="nom-product" class="card-title">${product.name}
                    </h3>
                    <button class="btn btn-primary font-weight-bold">
                        ${(product.price / 100).toFixed(2).replace(".", ",")}€
                        </button>
                    <button class="btn btn-success float-right font-weight-bold">

         
           <a class="product__btn" href="../pages/produit.html?${product._id}">
           Voir l'offre</a>
                    </button>
                </aside>
                </article>
          
        </div>
     `
        )

    });
}
/* <section id="main-product" class="row d-flex justify-content-center">
    <div id="product-card" class="col-sm-6 col-md-4 ">
        <article class=" card nav-bg-color  border-dark">
            <img id="img-product" class="img-top" src="${product.imageUrl}" alt="">
                <aside class="card-body">
                    <h3 id="nom-product" class="card-title">${product.name}
                    </h3>
                    <button class="btn btn-primary font-weight-bold">
                        ${(product.price / 100).toFixed(2).replace(".", ",")}€
                        </button>
                    <button class="btn btn-success float-right font-weight-bold">

                        <span class="text-add-panier">Ajouter au Panier</span>
                        <a class="product__btn" href="../pages/produit.html?${product._id}">Voir l'offre</a>
                    </button>
                </aside>
                </article>
            </div>  */
/* <main class="container">
    <section id="main-produit" class="row">
        <div id="produit-card" class="col-12 col-lg-6 mb-5">
            <article class=" card bg-ligt border-dark">
                <img id="img-produit" class="img-top" src="./images/oak_1.jpg" alt="">
                    <aside class="card-body">
                        <h3 id="nom-produit" class="card-title">
                        </h3>
                        <button class="btn btn-primary font-weight-bold">
                            Details Produit
                        </button>
                        <button class="btn btn-success float-right font-weight-bold">

                            <span class="text-add-panier">Ajouter au Panier</span>
                        </button>
                    </aside>
                </article>
            </div>
            <div id="produit-card" class="col-12 col-lg-6 mb-5">
                <article class=" card bg-ligt border-dark">
                    <img id="img-produit" class="img-top" src="./images/oak_1.jpg" alt="">
                        <aside class="card-body">
                            <h3 id="nom-produit" class="card-title">
                            </h3>
                            <button class="btn btn-primary font-weight-bold">
                                Details Produit
                        </button>
                            <button class="btn btn-success float-right font-weight-bold">

                                <span class="text-add-panier">Ajouter au Panier</span>
                            </button>
                        </aside>
                </article>
            </div>
                <div id="produit-card" class="col-12 col-lg-6 mb-5">
                    <article class=" card bg-ligt border-dark">
                        <img id="img-produit" class="img-top" src="./images/oak_1.jpg" alt="">
                            <aside class="card-body">
                                <h3 id="nom-produit" class="card-title">
                                </h3>
                                <button class="btn btn-primary font-weight-bold">
                                    Details Produit
                        </button>
                                <button class="btn btn-success float-right font-weight-bold">

                                    <span class="text-add-panier">Ajouter au Panier</span>
                                </button>
                            </aside>
                </article>
            </div>
                    <!-- test -->
            <div id="produit-card" class="col-sm-6 col-md-4 my-y">
                        <article class="card  border-danger">
                            <img id="img-produit" src="./images/oak_1.jpg" alt="">
                                <aside class="card-body">
                                    <h3 id="nom-produit" class="card-title">
                                    </h3>
                                    <button class="btn btn-primary font-weight-bold">
                                        Details Produit
                        </button>
                                    <button class="btn btn-danger float-right font-weight-bold">

                                        <span class="text-add-panier">Ajouter au Panier</span>
                                    </button>
                                </aside>
                </article>
            </div>
                        <!-- </div>end test --> */