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
            <img id="img-product" src="${product.imageUrl}"alt="">
                <aside class="card-body">
                    <h3 id="nom-product" class="card-title">${product.name}
                    </h3>
                     <p> Ce nounours en peluche super doux est fabriqué avec 
                     des matériaux de haute qualité.</p>
                   <div class="btn btn-primary font-weight-bold">
                        ${(product.price / 100).toFixed(2).replace(".", ",")}€
                        </div>
                  <label for="color-select">Choisir une couleur</label>
        <select class="product-section__select" name="colors" id="color-select"></select>
        <button class="addToCart btn btn-success float-right">Ajouter au panier <i class="fas fa-shopping-cart"></i></button> 
                </aside>
                </article>  
                </div> 
                
                
                `
  );

  let addToCartBtn = document.querySelector(".addToCart");

  /* Évènement "click" : lance la fonction d'ajout du produit au panier */
  addToCartBtn.addEventListener("click", () => {
    let select = document.querySelector(".product-section__select");
    product.selectedColor = select.options[select.selectedIndex].value;
    addToCart(product);
  });
  let select = document.querySelector(".product-section__select");
  product.colors.forEach(function (color) {
    let option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    select.appendChild(option);
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
    imageUrl: product.imageUrl,
    price: product.price,
    quantity: 1,
    selectedColor: product.selectedColor,
  };
  let newProduct = true;
  // La méthode getItem() de l'interface Storage renvoie
  // la valeur associée à la clé passée en paramètre.

  if (localStorage.getItem("panier") === null) {
    panier.push(saveToCart);
    localStorage.setItem("panier", JSON.stringify(panier));
  } else {
    panier = JSON.parse(localStorage.getItem("panier"));

    panier.forEach((pro) => {
      if (
        product._id === pro._id &&
        product.selectedColor === pro.selectedColor
      ) {
        pro.quantity++;
        newProduct = false;
      }
    });

    if (newProduct) panier.push(saveToCart);
    // La méthode setItem() de l'interface Storage, lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage,
    // sinon elle met à jour la valeur si la clé existe déjà.

    localStorage.setItem("panier", JSON.stringify(panier));
  }
  window.location.replace("../pages/panier.html");
  reinisialiserCart();
}
