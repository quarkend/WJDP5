// // ne pas modifier la suite sauf si vous désirez modifier le code
// var MonPanier = (function () {
//   panier = [];
//   function Item(nom, prix, count) {
//     this.nom = nom;
//     this.prix = prix;
//     this.count = count;
//   }

//   function savepanier() {
//     sessionStorage.setItem('MonPanier', JSON.stringify(panier));
//   }

//   function loadpanier() {
//     panier = JSON.parse(sessionStorage.getItem('MonPanier'));
//   }
//   if (sessionStorage.getItem("MonPanier") != null) {
//     loadpanier();
//   }

//   var obj = {};

//   obj.ajouter_produit_dans_panier = function (nom, prix, count) {
//     for (var item in panier) {
//       if (panier[item].nom === nom) {
//         panier[item].count++;
//         savepanier();
//         return;
//       }
//     }
//     var item = new Item(nom, prix, count);
//     panier.push(item);
//     savepanier();
//   }

//   obj.setCountForItem = function (nom, count) {
//     for (var i in panier) {
//       if (panier[i].nom === nom) {
//         panier[i].count = count;
//         break;
//       }
//     }
//   };

//   obj.enlever_produit_de_panier = function (nom) {
//     for (var item in panier) {
//       if (panier[item].nom === nom) {
//         panier[item].count--;
//         if (panier[item].count === 0) {
//           panier.splice(item, 1);
//         }
//         break;
//       }
//     }
//     savepanier();
//   }

//   obj.enlever_produit_de_panier_tous = function (nom) {
//     for (var item in panier) {
//       if (panier[item].nom === nom) {
//         panier.splice(item, 1);
//         break;
//       }
//     }
//     savepanier();
//   }

//   obj.clearpanier = function () {
//     panier = [];
//     savepanier();
//   }

//   obj.totalCount = function () {
//     var totalCount = 0;
//     for (var item in panier) {
//       totalCount += panier[item].count;
//     }
//     return totalCount;
//   }

//   obj.totalpanier = function () {
//     var totalpanier = 0;
//     for (var item in panier) {
//       totalpanier += panier[item].prix * panier[item].count;
//     }
//     return Number(totalpanier.toFixed(2));
//   }

//   obj.listpanier = function () {
//     var panierCopy = [];
//     for (i in panier) {
//       item = panier[i];
//       itemCopy = {};
//       for (p in item) {
//         itemCopy[p] = item[p];
//       }
//       itemCopy.total = Number(item.prix * item.count).toFixed(2);
//       panierCopy.push(itemCopy)
//     }
//     return panierCopy;
//   }

//   return obj;
// })();

// $('.ajouter-panier').click(function (event) {
//   event.preventDefault();
//   var nom = $(this).data('nom');
//   var prix = Number($(this).data('prix'));
//   MonPanier.ajouter_produit_dans_panier(nom, prix, 1);
//   afficherpanier();
// });

// $('.clear-panier').click(function () {
//   MonPanier.clearpanier();
//   afficherpanier();
// });

// function afficherpanier() {
//   var panierArray = MonPanier.listpanier();
//   var output = "";
//   for (var i in panierArray) {
//     output += "<tr>"
//       + "<td>" + panierArray[i].nom + "</td>"
//       + "<td>(" + panierArray[i].prix.toFixed(2) + ")</td>"
//       + "<td class='form-inline'><div><button class='btn btn-primary moins-item' data-nom='" + panierArray[i].nom + "'>-</button>"
//       + "<input type='number' min='1' class='form-control item-count' data-nom='" + panierArray[i].nom + "' value='" + panierArray[i].count + "'>"
//       + "<button class='btn btn-primary plus-item' data-nom='" + panierArray[i].nom + "'>+</button></div></td>"
//       + "<td><button class='btn btn-danger effacer-item' data-nom='" + panierArray[i].nom + "'>X</button></td>"
//       + " = "
//       + "<td>" + panierArray[i].total + "</td>"
//       + "</tr>";
//   }
//   $('.show-panier').html(output);

//   $('.total-panier-modal').html(MonPanier.totalpanier());
//   $('.total-count').html(MonPanier.totalCount());

// }

// $('.show-panier').on("click", ".effacer-item", function (event) {
//   var nom = $(this).data('nom')
//   MonPanier.enlever_produit_de_panier_tous(nom);
//   afficherpanier();
// })

// $('.show-panier').on("click", ".moins-item", function (event) {
//   var nom = $(this).data('nom')
//   MonPanier.enlever_produit_de_panier(nom);
//   afficherpanier();
// })

// $('.show-panier').on("click", ".plus-item", function (event) {
//   var nom = $(this).data('nom')
//   MonPanier.ajouter_produit_dans_panier(nom);
//   afficherpanier();
// })

// $('.show-panier').on("change", ".item-count", function (event) {
//   var nom = $(this).data('nom');
//   var count = Number($(this).val());
//   MonPanier.setCountForItem(nom, count);
//   afficherpanier();
// });

// // afficherpanier();
// const section = document.querySelector(".cart-section");
// let total = 0;

// displayCart();

// /* Affichage du contenu du panier, des boutons de suppression et d'annulation du panier ainsi que du formulaire de contact */

// function displayCart() {

//   if (localStorage.getItem('cartProducts') !== null) {
//     let products = JSON.parse(localStorage.getItem('cartProducts'));
//     total = 0; // Réinitialisation du total à 0

//     section.insertAdjacentHTML("afterbegin", `
//             <h2>Panier</h2>
//             <table class="cart-section__table">
//                 <thead>
//                     <tr>
//                         <th>Nom</th>
//                         <th>Couleur</th>
//                         <th>Quantité</th>
//                         <th>Prix</th>
//                         <th>Supprimer</th>
//                     </tr>
//                 </thead>
//                 <tbody class="cart-section__tbody">
//                 </tbody>
//             </table>
//         `);

//     let tbody = document.querySelector(".cart-section__tbody");

//     products.forEach((product, index) => {

//       total = total + (product.price * product.quantity);

//       /* La classe product-index nous permet de garder la valeur de l'index du produit. Il sera récupéré dans la fonction deleteProduct */
//       tbody.insertAdjacentHTML("beforeend", `
//                 <tr>
//                     <td>${product.name}</td>
//                     <td>${product.selectedColor}</td>
//                     <td><button class="cart-section__remove product-${index}">-</button>${product.quantity}<button class="cart-section__add product-${index}">+</button></td>
//                     <td>${(product.price * product.quantity / 100).toFixed(2).replace(".", ",")} €</td>
//                     <td><button class="cart-section__delete product-${index}">X</button></td>
//                 </tr>
//             `);
//     })

//     section.insertAdjacentHTML("beforeend", `
//             <p class="cart-section__total">Total : ${(total / 100).toFixed(2).replace(".", ",")} €</p>
//             <button class="cart-section__cancelCart">Annuler le panier</button>
//         `);

//     section.insertAdjacentHTML("beforeend", `
//             <p class="">Veuillez remplir le formulaire suivant afin de valider la commande : </p>
//             <form class="cart-form" action="post" type="submit">
//                 <div class="cart-form__group">
//                     <label for="firstname">Prénom : </label>
//                     <input id="firstname" type="text" placeholder="Votre prénom" maxlength="30" pattern="[A-Za-z]{2,}" required />
//                 </div>
//                 <div class="cart-form__group">
//                     <label for="name">Nom : </label>
//                     <input id="name" type="text" placeholder="Votre nom" maxlength="50" pattern="[A-Za-z]{2,}" required />
//                 </div>
//                 <div class="cart-form__group">
//                     <label for="address">Adresse  : </label>
//                     <input id="address" type="text" placeholder="Votre adresse" maxlength="200" required />
//                 </div>
//                 <div class="cart-form__group">
//                     <label for="city">Ville : </label>
//                     <input id="city" type="text" placeholder="Votre ville" maxlength="30" required />
//                 </div>
//                 <div class="cart-form__group">
//                     <label for="email">Email : </label>
//                     <input id="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}" placeholder="exemple@email.com" maxlength="30" required />
//                 </div>
//                 <button id="submit-btn">Valider le panier</button>
//             </form>
//         `);

//     const removeOneBtn = document.querySelectorAll(".cart-section__remove");
//     removeOneBtn.forEach((btn) => {
//       btn.addEventListener('click', e => {
//         removeOneProduct(e, products);
//       })
//     })

//     const addOneBtn = document.querySelectorAll(".cart-section__add");
//     addOneBtn.forEach((btn) => {
//       btn.addEventListener('click', e => {
//         addOneProduct(e, products);
//       })
//     })

//     const deleteBtn = document.querySelectorAll(".cart-section__delete");
//     deleteBtn.forEach((btn) => {
//       btn.addEventListener('click', e => {
//         deleteProduct(e, products);
//       });
//     });

//     const cancelCartBtn = document.querySelector(".cart-section__cancelCart");
//     cancelCartBtn.addEventListener('click', () => {
//       cancelCart();
//     });

//     const form = document.querySelector(".cart-form");
//     form.addEventListener('submit', e => {
//       e.preventDefault();
//       submitForm();
//     });

//   } else {
//     section.insertAdjacentHTML("afterbegin", `
//             <h2>Panier</h2>
//             <p class="cart-section__empty">
//                 Votre panier est vide ! 
//                 <br/>
//                 <a href="./index.html">Revenir à la page d'accueil</a>
//             </p>
//         `)
//   }
// }

// /* Diminue de 1 la quantité d'un même produit. S'il passe à 0 alors le produit est supprimé du panier */
// function removeOneProduct(e, products) {
//   let index = e.target.classList[1].slice(-1);
//   products[index].quantity--;

//   if (products[index].quantity <= 0) {
//     products.splice(index, 1);
//     if (products.length === 0) {
//       localStorage.removeItem('cartProducts');
//     } else {
//       localStorage.setItem('cartProducts', JSON.stringify(products));
//     }
//   } else {
//     localStorage.setItem('cartProducts', JSON.stringify(products));
//   }
//   refreshSectionAndCart();
// }

// /* Augmente de 1 la quantité d'un même produit. */
// function addOneProduct(e, products) {
//   let index = e.target.classList[1].slice(-1);
//   products[index].quantity++;
//   localStorage.setItem('cartProducts', JSON.stringify(products));
//   refreshSectionAndCart();
// }

// /* 
//     Permet de supprimer le produit sélectionné. 
//     On récupère l'index correspondant grâce au dernier caractère du nom de la classe.
//     On se sert ensuite de cet index pour supprimer le bon produit dans le tableau products du localStorage
//  */
// function deleteProduct(e, products) {
//   let index = e.target.classList[1].slice(-1);
//   products.splice(index, 1);
//   localStorage.setItem('cartProducts', JSON.stringify(products));
//   if (products.length === 0) {
//     localStorage.removeItem('cartProducts');
//   }
//   refreshSectionAndCart();
// }

// /* Annulation de tout le panier */
// function cancelCart() {
//   localStorage.removeItem('cartProducts');
//   refreshSectionAndCart();
// }

// /* Réinitialise la section "cart-section" ainsi que le nombre de produits du panier (header) */
// function refreshSectionAndCart() {
//   section.innerHTML = "";
//   displayCart();
//   checkCart();
// }

// /* 
//     Récupération des valeurs de l'input dans l'objet contact
//     Récupération des id des produits du panier dans le tableau products
//     L'objet contact et le tableau products sont formattés en string avant d'être envoyé dans la fonction postOrder
// */
// function submitForm() {

//   let contact = {
//     firstName: document.getElementById("firstname").value,
//     lastName: document.getElementById("name").value,
//     address: document.getElementById("address").value,
//     city: document.getElementById("city").value,
//     email: document.getElementById("email").value
//   };

//   let products = [];
//   if (localStorage.getItem('cartProducts') !== null) {
//     let productObj = JSON.parse(localStorage.getItem('cartProducts'));

//     productObj.forEach(p => {
//       products.push(p._id);
//     })
//   }

//   let contactProducts = JSON.stringify({
//     contact,
//     products
//   })

//   postOrder(contactProducts);
// };

// /* 
//     Requête POST
//     Envoi au server l'objet contact et le tableau d'id products au format string
//     Enregistrement de l'objet contact et l'orderId reçus du serveur, ainsi que le total de la commande sur le localStorage.
//     Changement de page -> confirmation.html
// */
// function postOrder(contactProducts) {

//   fetch("http://localhost:3000/api/teddies/order", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     mode: 'cors',
//     body: contactProducts
//   }).then(response => {
//     return response.json();
//   }).then(r => {
//     localStorage.setItem('contact', JSON.stringify(r.contact));
//     localStorage.setItem('orderId', JSON.stringify(r.orderId));
//     localStorage.setItem('total', JSON.stringify(total));
//     localStorage.removeItem('cartProducts');
//     window.location.replace("./confirmation.html");
//   }).catch((e) => {
//     displayError();
//     console.log(e);
//   })
// }




