let cart = document.querySelector(".cart");

checkCart();

/* Vérifie s'il y a un produit dans le panier, notamment au chargement chaque page. Affiche le nombre de produits dans le panier. Affiche 0 s'il n'y en a pas */
function checkCart() {
    console.log("checkCart");
    div = document.querySelector(".cart_small_nb")
    let nb = 0;

    if (localStorage.getItem('cartItems') !== null) {
        let cp = JSON.parse(localStorage.getItem("cartItems"));

        cp.forEach((prod) => {
            nb = nb + prod.quantity;
        });
    }
    div.textContent = nb;
}


