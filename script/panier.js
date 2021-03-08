const section = document.querySelector(".cart-section");
let total = 0;

showCart();

/* Affichage du contenu du panier, des boutons de suppression et d'annulation du panier ainsi que du formulaire de contact */

function showCart() {

    if (localStorage.getItem('cartItems') !== null) {
        let products = JSON.parse(localStorage.getItem('cartItems'));
        total = 0; // Réinitialisation du total à 0
        // <tbody> : l'élément de corps d'un tableau

        section.insertAdjacentHTML("afterbegin", `
            <h2>Teddies</h2>
            <table class="cart-section__table">
              <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col">Produit</th>
                <th scope="col">prix</th>
                <th scope="col" class="text-center">Quantite</th>
                <th scope="col" class="text-right">supprimer</th>
                <th> </th>
              </tr>
            </thead>
         <tbody class="cart-section__tbody">
             </tbody>
            </table>
    `);
        let tbody = document.querySelector(".cart-section__tbody");

        products.forEach((product, l) => {

            total = total + isNaN(product.price * product.quantity) ? 0 : (product.price * product.quantity);

            /* <td><input class="form-control" type="text" value="" />${l}</td>*/
            //   <td>In stock</td>
            //        <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
            /* La classe product-l nous permet de garder la valeur de l'l du produit. Il sera récupéré dans la fonction deleteProduct */
            tbody.insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${product.name}</td>
               
                    <td class="text-right"><button class="cart-section__remove  product-${l}">-
                    </button>${product.quantity}<button class="cart-section__add product-${l}">+</button></td>
                 
                    <td>${(product.price * product.quantity / 100).toFixed(2).replace(".", ",")} €</td>
                    <td><button class="cart-section__delete product -${l}">${product.quantity}</button></td>
                <td class="text-right"><button class="btn btn-sm btn-danger cart-section__delete product-${l}"><i class="fa fa-trash"></i> </button>
                </td>
                    </tr>
            `);
        })





        section.insertAdjacentHTML("beforeend", `
   <div class="row">
        <div class="col-md-12 mt-3">
          <h4>Votre commande</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 mt-3">
                        Nombre de produit(s) dans le panier : <span class="total-count"></span>
          <br /><br />
          <table width="100%" class="show-panier" id="product-card"></table>
          <br />
          <br />
          <div>*Prix total: <b><span class="total-panier  cart-section__total" id="prix_total">${(total / 100).toFixed(2).replace(".", ",")} €</p></span></b></div>
          <br />
          <i id="livraison-detail">*Livraison incluse</i>
          <div class="text-right"><button class="clear-panier cart-section__cancelCart btn btn-danger">Vider le panier</button></div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 mt-3">
          <h4>Adresse de livraison</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 mt-3">
          <input class="form-control" type="text" name="nom" value="" id="nom" placeholder="Nom">
          <br>
          <input class="form-control" type="text" name="prenom" value="" id="prenom" placeholder="Prénom">
          <br>
          <input class="form-control" type="text" name="cp" value="" id="cp" placeholder="Code postal">
          <br>
          <input class="form-control" type="text" name="ville" value="" id="ville" placeholder="Ville">
          <br>
          <input class="form-control" type="text" name="email" value="" id="email" placeholder="e-Mail">
          <br>
          <textarea class="form-control" id="message" placeholder="Message Optionnel"></textarea>
          <br>
          <div class="text-right"><button type="button" class="btn btn-success" id="commander">Commander</button></div>
          <br>
          <div id="qte_minimum_report"></div>
        </div>
      </div>
      <div class="modal" id="mymodal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Commande confirmée</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div id="commande_report">Merci de votre commande</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal" id="mymodal_erreur" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Erreur de commande</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div id="commande_report">Une erreur est survenue</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  `);
        const supprimerUnBtn = document.querySelectorAll(".cart-section__remove");
        supprimerUnBtn.forEach((btn) => {
            btn.addEventListener('click', event => {
                decrementerProduct(event, products);
            })
        })

        const supprimerBtn = document.querySelectorAll(".cart-section__delete");
        supprimerBtn.forEach((btn) => {
            btn.addEventListener('click', event => {
                supprimerProduct(event, products);
            });
        });


        const ajouter_produit_dans_panier = document.querySelectorAll(".cart-section__add");
        ajouter_produit_dans_panier.forEach((btn) => {
            btn.addEventListener('click', event => {
                incrementerProduct(event, products);
            })
        })

        const cancelCartBtn = document.querySelector(".cart-section__cancelCart");
        cancelCartBtn.addEventListener('click', () => {
            clearCart();
        });


    } else {
        section.insertAdjacentHTML("afterbegin", `
            <h2>Panier</h2>
            <p class="cart-section__empty">
                Votre panier est vide ! 
                <br/>
                <a href="../index.html">Revenir à la page d'accueil</a>
            </p>
        `)
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
            localStorage.removeItem('cartItems');
        } else {
            localStorage.setItem('cartItems', JSON.stringify(products));
        }
    } else {
        localStorage.setItem('cartItems', JSON.stringify(products));
    }
    refreshSectionAndCart();
}
/*Augmente de 1 la quantité d'un même produit. */
function incrementerProduct(event, products) {
    let l = event.target.classList[1].slice(-1);
    products[l].quantity++;
    localStorage.setItem('cartItems', JSON.stringify(products));
    refreshSectionAndCart();
}

// Permet de supprimer le produit sélectionné.
// On récupère l'index correspondant grâce au dernier caractère du nom de la classe.
// On se sert ensuite de cet index pour supprimer le bon produit dans le tableau products du localStorage
//  */
function supprimerProduct(event, products) {
    let l = event.target.classList[1].slice(-1);
    products.splice(l, 1);
    localStorage.setItem('cartItems', JSON.stringify(products));
    if (products.length === 0) {
        localStorage.removeItem('cartItems');
    }
    refreshSectionAndCart();
}


/* Annulation de tout le panier */
function clearCart() {
    localStorage.removeItem('cartItems');
    refreshSectionAndCart();
}





/* Réinitialise la section "cart-section" ainsi que le nombre de produits du panier (header) */
function refreshSectionAndCart() {
    section.innerHTML = "";
    showCart();
    reinisialiserCart();
}