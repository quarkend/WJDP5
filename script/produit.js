/* Récupération de l'id du produit sélectionné dans la page précédente */
const productId = window.location.search.substr(1);

const apiUrl = `http://localhost:3000/api/teddies/${productId}`;

/* Récupération du produit avec l'id associé depuis le serveur */

fetch(apiUrl)
  .then((response) => response.json())
  .then((product) => {
    askTeddies(product);
  })
  .catch((e) => {
    displayError();
    console.log(e);
  });

/* 
    Fonction d'affichage du produit
*/
function askTeddies(product) {
  const productSection = document.querySelector(".product-section");

  productSection.insertAdjacentHTML(
    "afterbegin",
    `
       <article class=" card nav-bg-color  border-dark ">
            <img id="img-product" class="img-top" src="${
              product.imageUrl
            }"alt="">
                <aside class="card-body">
                    <h3 id="nom-product" class="card-title">${product.name}
                    </h3>
                     <p>${product.description}</p>
                   <div class="btn btn-primary font-weight-bold">
                        ${(product.price / 100).toFixed(2).replace(".", ",")}€
                        </div>
                 
             <button class="addToCart btn btn-success float-right ">Ajouter au panier<i class="fas fa-shopping-cart"></i>
             </button>
                </aside>
                </article>  
                </div>   `
  );

  let addToCartBtn = document.querySelector(".addToCart");

  /* Évènement "click" : lance la fonction d'ajout du produit au panier */
  addToCartBtn.addEventListener("click", () => {
    addToCart(product);
  });
}

/*
    Ajout du produit au panier.
    Si le localStorage est vide elle crée un nouveau tableau panier et l'enregistre dans le localStorage
    Sinon elle récupère le tableau du localStorage, ajoute le nouveau produit, et enregistre le nouveau tableau
*/
function addToCart(product) {
  let panier = [];

  let saveToCart = {
    _id: product._id,
    name: product.name,
    price: product.price,
    quantity: 1,
  };
  let newProduct = true;
  // La méthode getItem() de l'interface Storage renvoie
  // la valeur associée à la clé passée en paramètre.

  if (localStorage.getItem("panier") === null) {
    panier.push(saveToCart);
    localStorage.setItem("panier", JSON.stringify(panier));
  } else {
    panier = JSON.parse(localStorage.getItem("panier"));

    panier.forEach((produit) => {
      if (product._id === produit._id) {
        produit.quantity++;
        newProduct = false;
      }
    });

    if (newProduct) panier.push(saveToCart);
    // La méthode setItem() de l'interface Storage, lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage,
    // sinon elle met à jour la valeur si la clé existe déjà.

    localStorage.setItem("panier", JSON.stringify(panier));
  }

  reinisialiserCart();
}
