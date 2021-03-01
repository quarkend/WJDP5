const section = document.querySelector(".cart-section");
let total = 0;

displayCart();

/* Affichage du contenu du panier, des boutons de suppression et d'annulation du panier ainsi que du formulaire de contact */

function displayCart() {

    if (localStorage.getItem('cartItems') !== null) {
        let products = JSON.parse(localStorage.getItem('cartItems'));
        total = 0; // Réinitialisation du total à 0

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

        products.forEach((product, index) => {

            total = total + (product.price * product.quantity);

            /* La classe product-index nous permet de garder la valeur de l'index du produit. Il sera récupéré dans la fonction deleteProduct */
            tbody.insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${product.name}</td>
                     <td>In stock</td>
                       <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
                    <td class="text-right"><button class="cart-section__remove product-${index}">-</button>${product.quantity}<button class="cart-section__add product-${index}">+</button></td>
                     <td><input class="form-control" type="text" value="1" /></td>
                    <td>${(product.price * product.quantity / 100).toFixed(2).replace(".", ",")} €</td>
                    <td><button class="cart-section__delete product-${index}">X</button></td>
                <td class="text-right"><button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> </button>
                </td>
                    </tr>

                  
            `);
        })
    }

    section.insertAdjacentHTML("beforeend", `
            <p class="cart-section__total">Total : ${(total / 100).toFixed(2).replace(".", ",")} €</p>
            <button class="cart-section__cancelCart">Annuler le panier</button>
        `);





}









