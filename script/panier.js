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
                <th scope="col">Product</th>
                <th scope="col">Available</th>
                <th scope="col" class="text-center">Quantity</th>
                <th scope="col" class="text-right">Price</th>
                <th> </th>
              </tr>
            </thead>
         <tbody class="cart-section__tbody">
             </tbody>
            </table>
    `);
        let tbody = document.querySelector(".cart-section__tbody");

        products.forEach((product, l) => {

            total = total + (product.price * product.quantity);

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
            <p class="cart-section__total">Total : ${(total / 100).toFixed(2).replace(".", ",")} €</p>
            <button class="cart-section__cancelCart ">Annuler le panier</button>
        `);


        const supprimerBtn = document.querySelectorAll(".cart-section__remove");
        supprimerBtn.forEach((btn) => {
            btn.addEventListener('click', event => {
                decrementerProduct(event, products);
            })
        })
        const ajouter_produit_dans_panier = document.querySelectorAll(".cart-section__add");
        ajouter_produit_dans_panier.forEach((btn) => {
            btn.addEventListener('click', event => {
                incrementerProduct(event, products);
            })
        })
    } else {
        section.insertAdjacentHTML("afterbegin", `
            <h2>Panier</h2>
            <p class="cart-section__empty">
                Votre panier est vide ! 
                <br/>
                <a href="./index.html">Revenir à la page d'accueil</a>
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

/* Réinitialise la section "cart-section" ainsi que le nombre de produits du panier (header) */
function refreshSectionAndCart() {
    section.innerHTML = "";
    showCart();
    reinisialiserCart();
}