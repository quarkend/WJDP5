/* Récupération des différents éléments dans le localStorage afin de les afficher au chargement de la page */

const confirmation = document.querySelector(".confirmation-section");
const objFormulaire = JSON.parse(localStorage.getItem("objFormulaire"));
const total = JSON.parse(localStorage.getItem("total"));

confirmation.insertAdjacentHTML(
  "beforeend",
  `
    <h2>Confirmation de la commande : </h2>
    <ul>
        <li class="confirmation-section__coord">Vos coordonnées : </li>
          <li>Prénom : ${objFormulaire.prenom}</li>

        <li>Email : ${objFormulaire.email}</li>

      
    </ul>
    <h3>Total : ${(total / 100).toFixed(2).replace(".", ",")} €</h3>

    
`
);
localStorage.removeItem("objFormulaire");
localStorage.removeItem("total");
