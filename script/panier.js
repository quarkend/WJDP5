const section = document.querySelector(".cart-section");
let total = 0;
showCart();

/* Affichage du contenu du panier, des boutons de suppression et d'annulation du panier ainsi que du formulaire forcontact */

function showCart() {
  if (localStorage.getItem("panier") !== null) {
    let products = JSON.parse(localStorage.getItem("panier"));
    // <tbody> : l'élément de corps d'un tableau

    section.insertAdjacentHTML(
      "afterbegin",
      `
            <h2>Teddies</h2>
             <div class="container mb-4">
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
            <table class="table table-striped cart-section__table">
              <thead>
              <th scope="col">En stock</th>
                <th scope="col">Produit</th>
                 <th scope="col">Coleur</th>
                <th class="text-center"scope="col">prix</th>
                <th  class="text-right"scope="col">Quantite</th>
                <th class="text-right" scope="col" >supprimer</th>
             </thead>
         <tbody class="cart-section__tbody">
             </tbody>
              </table>
            </div>
            </div>
            </div>
            </div>
    `
    );
    let tbody = document.querySelector(".cart-section__tbody");

    products.forEach((product, l) => {
      total = total + parseInt(product.price) * parseInt(product.quantity);
      /* La classe product-l nous permet de garder la valeur de l'l du produit. 
      Il sera récupéré dans la fonction deleteProduct */
      tbody.insertAdjacentHTML(
        "beforeend",
        `
                  <tr>
                   <td><img width = "50"  id="img-product"  src="${
                     product.imageUrl
                   }"alt=""> </td>
                    <td>${product.name}</td>
               
<td>${product.selectedColor}</td>
                     <td class="text-center">${(
                       (product.price * product.quantity) /
                       100
                     )
                       .toFixed(2)
                       .replace(".", ",")} €</td>
                            <td class="text-right"><button class="cart-section__remove
                              product-${l}">-
                    </button>${
                      product.quantity
                    }<button class="cart-section__add product-${l}">+</button>
                    </td>
               
                      <td class="text-right"><button class="btn btn-sm btn-danger 
                      cart-section__delete product-${l}"><i class="fa fa-trash"></i> </button>
                        </td>
                    </tr>

            `
      );
    });

    section.insertAdjacentHTML(
      "beforeend",
      `
             <p class="">Veuillez remplir le formulaire suivant afin de valider la commande : </p>
        <form id="form1" method="post">
         <div class="container mb-4">
    <div class="row  d-flex justify-content-center">
      <div class="col-6 ">
        <div class="table-responsive">
            <table class="table table-striped cart-section__table">
          <br>
          <input class="form-control" id="firstname" type="text" placeholder="Votre prénom" maxlength="30"
            pattern="[A-Za-z]{2,}" required />

          <br>

          <input class="form-control" id="name" type="text" placeholder="Votre nom" maxlength="50"
            pattern="[A-Za-z]{2,}" required />

          <br>

          <input class="form-control" id="address" type="text" placeholder="Votre adresse" maxlength="200" required />

          <br>

          <input class="form-control" id="city" type="text" placeholder="Votre ville" maxlength="30" required />
          <br>
          <input class="form-control" id="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}"
            placeholder="exemple@email.com" maxlength="30" required />
          <br>

           <button class="order btn btn-success float-right" type="submit">Place Order</button>
                  </table>
            </div>
            </div>

            </div>
            </div>
        </form>
    `
    );
    const supprimerUnBtn = document.querySelectorAll(".cart-section__remove");
    supprimerUnBtn.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        decrementerProduct(event, products);
      });
    });

    const supprimerBtn = document.querySelectorAll(".cart-section__delete");
    supprimerBtn.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        supprimerProduct(event, products);
      });
    });

    const ajouter_produit_dans_panier = document.querySelectorAll(
      ".cart-section__add"
    );
    ajouter_produit_dans_panier.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        incrementerProduct(event, products);
      });
    });

    const form1 = document.querySelector("#form1");

    form1.addEventListener("submit", (e) => {
      e.preventDefault();
      submitFormControl();
    });
  } else {
    section.insertAdjacentHTML(
      "afterbegin",
      `
            <h2>Panier</h2>
            <p class="cart-section__empty">
                Votre panier est vide ! 
                <br/>
                <a href="../index.html">Revenir à la page d'accueil</a>
            </p>
        `
    );
  }
}

/* Diminue de 1 la quantité d'un même produit. S'il passe à 0 alors le produit est supprimé du panier */
function decrementerProduct(event, products) {
  let l = event.target.classList[1].slice(-1);
  products[l].quantity--;

  if (products[l].quantity <= 0) {
    // Array.prototype.splice()
    // La méthode splice() modifie le contenu d'un tableau en retirant
    // des éléments et/ou en ajoutant de nouveaux éléments à même le tableau.
    // On peut ainsi vider ou remplacer une partie d'un tableau.
    products.splice(l, 1);
    if (products.length === 0) {
      localStorage.removeItem("panier");
    } else {
      localStorage.setItem("panier", JSON.stringify(products));
    }
  } else {
    localStorage.setItem("panier", JSON.stringify(products));
  }

  console.log(localStorage.getItem("panier"));
  refreshSectionAndCart();
}
/*Augmente de 1 la quantité d'un même produit. */
function incrementerProduct(event, products) {
  let l = event.target.classList[1].slice(-1);
  products[l].quantity++;
  localStorage.setItem("panier", JSON.stringify(products));
  refreshSectionAndCart();
}

// Permet de supprimer le produit sélectionné.
// On récupère l'index correspondant grâce au dernier caractère du nom de la classe.
// On se sert ensuite de cet index pour supprimer le bon produit dans le tableau products du localStorage
//  */
function supprimerProduct(event, products) {
  let l = event.target.classList[1].slice(-1);
  products.splice(l, 1);
  localStorage.setItem("panier", JSON.stringify(products));
  if (products.length === 0) {
    localStorage.removeItem("panier");
  }
  refreshSectionAndCart();
}

/* Annulation de tout le panier */
function clearCart() {
  localStorage.removeItem("panier");
  refreshSectionAndCart();
}

/* Réinitialise la section "cart-section" ainsi que le nombre de produits du panier
 (header) */
function refreshSectionAndCart() {
  section.innerHTML = "";
  showCart();
  reinisialiserCart();
}

// Récupération des valeurs de l'input dans l'objet contact
// Récupération des id des produits du panier dans le tableau products
// L'objet contact et le tableau products sont formattés en string avant d'être envoyé dans la fonction postCmd
function submitFormControl() {
  let contact = {
    firstName: document.getElementById("firstname").value,
    lastName: document.getElementById("name").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  let products = [];
  if (localStorage.getItem("panier") !== null) {
    let produitObj = JSON.parse(localStorage.getItem("panier"));

    produitObj.forEach((produit) => {
      products.push(produit._id);
    });
  }

  let formulaireProduit = JSON.stringify({
    contact,
    products,
  });

  postCmd(formulaireProduit);
  // console.log(formulaireProduit);
}

/*
    Requête POST
    Envoi au server l'objet contact et le tableau d'id products au format string
    Enregistrement de l'objet contact reçus du serveur, le total de la commande sur le localStorage.
    Changement de page -> confirmation.html
*/
function postCmd(formulaireProduit) {
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: formulaireProduit,
  })
    .then((response) => {
      return response.json();
    })

    .then((res) => {
      localStorage.setItem("contact", JSON.stringify(res.contact));
      // localStorage.setItem("products", JSON.stringify(res.products));
      localStorage.setItem("orderId", JSON.stringify(res.orderId));
      localStorage.setItem("total", JSON.stringify(total));
      localStorage.removeItem("panier");
      window.location.replace("./confirmation.html");
    })
    .catch((e) => {
      displayError();
      console.log(e);
    });
}
