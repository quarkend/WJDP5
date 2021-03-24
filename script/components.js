let cart = document.querySelector(".cart");

reinisialiserCart();

/* Vérifie s'il y a un produit dans le panier, notamment au chargement chaque page. Affiche le nombre de produits dans le panier. Affiche 0 s'il n'y en a pas */
function reinisialiserCart() {
  div = document.querySelector(".cart_small_nb");
  let nb = 0;

  if (localStorage.getItem("panier") !== null) {
    let cartp = JSON.parse(localStorage.getItem("panier"));

    cartp.forEach((produit) => {
      nb = nb + produit.quantity;
    });
  }
  div.textContent = nb;
}
/* Affichage d'un message d'erreur si la connexion n'a pas pu se faire correctement avec le serveur */
function displayError() {
  const section = document.querySelector(".section");
  section.innerHTML = "";
  section.insertAdjacentHTML(
    "beforeend",
    `
          <p class="section__error">Suite à un problème technique nous ne pouvons afficher correctement la page. </br> Veuillez rééssayer plus tard.</p>
      `
  );
}
