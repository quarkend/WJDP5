let cart = document.querySelector(".cart");

reinisialiserCart();

/* Vérifie s'il y a un produit dans le panier, notamment au chargement chaque page. Affiche le nombre de produits dans le panier. Affiche 0 s'il n'y en a pas */
function reinisialiserCart() {

    div = document.querySelector(".cart_small_nb")
    let nb = 0;

    if (localStorage.getItem('cartItems') !== null) {
        let cartp = JSON.parse(localStorage.getItem("cartItems"));

        cartp.forEach((produit) => {
            nb = nb + produit.quantity;
        });
    }
    div.textContent = nb;
}


