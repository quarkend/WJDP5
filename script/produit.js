/* Récupération de l'id du produit sélectionné dans la page précédente */
const productId = window.location.search.substr(1);

const apiUrl = `http://localhost:3000/api/teddies/${productId}`;

/* Récupération du produit avec l'id associé depuis le serveur */

fetch(apiUrl)
    .then((response) => response.json())
    .then((product) => {
        displayProduct(product);
    })
    .catch((e) => {
        displayError();
        console.log(e);
    });

/* 
    Fonction d'affichage du produit
*/
function displayProduct(product) {
    const productCard = document.querySelector(".product-card");

    productCard.insertAdjacentHTML(
        "afterbegin",
        `
       
        <article class=" card nav-bg-color  border-dark">
            <img id="img-product" class="img-top" src="${product.imageUrl
        }"alt="">
                <aside class="card-body">
                    <h3 id="nom-product" class="card-title">${product.name}
                    </h3>
                     <p>${product.description}</p>
                    <button class="btn btn-primary font-weight-bold">
                        ${(product.price / 100).toFixed(2).replace(".", ",")}€
                        </button>
                  
               
            <button class="btn btn-success  addToCar float-right font-weight-bold">

              <span class="text-add-panier addToCar">Ajouter au Panier</span>
            </button>
                </aside>
                </article>    
                   
         
                
          
        </div>
        `
    );

}
