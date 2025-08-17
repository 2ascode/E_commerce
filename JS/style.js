class IphoneStock {
  constructor() {
    this.iphoneStock = [];
    this.shoppingCartList = [];
    this.count = 0;
  }

  initCount() {
    const count = localStorage.getItem("count");
    if (!count) {
      localStorage.setItem("count", JSON.stringify(0));
    } else {
      this.count = JSON.parse(count);
    }
  }

  initProduct() {
    const getIphoneStock = localStorage.getItem("iphoneStock");
    if (!getIphoneStock) {
      localStorage.setItem("iphoneStock", JSON.stringify([]));
    } else {
      this.iphoneStock = JSON.parse(getIphoneStock);
    }
  }

  initShoppingCartList() {
    const shoppingCartList = localStorage.getItem("shoppingCartList");
    if (!shoppingCartList) {
      localStorage.setItem("shoppingCartList", JSON.stringify([]));
    } else {
      this.shoppingCartList = JSON.parse(shoppingCartList);
    }
  }

  addProduct() {
    const addForm = document.querySelector(".addForm");
    if (addForm) {
      const name = addForm.querySelector("input[name='name']");
      const color = addForm.querySelector("input[name='color']");
      const price = addForm.querySelector("input[name='price']");
      const image = addForm.querySelector("#image");

      //Conversion de l'image en base64

      image.addEventListener("change", (event) => {
        const file = event.target.files[0];

        addForm.addEventListener("submit", (e) => {
          e.preventDefault();
          console.log(file.name);
          if (file) {
            const ios = {
              nom: name.value,
              couleur: color.value,
              prix: price.value,
              imageURl: "/images/" + file.name,
            };
            this.iphoneStock.push(ios);
            localStorage.setItem(
              "iphoneStock",
              JSON.stringify(this.iphoneStock)
            );
          }
        });
      });
    }
  }

  displayIos() {
    const productBlock = document.getElementById("shopProductsBlock");
    let content = "";
    this.iphoneStock.forEach((element) => {
      content += `
            <div class="productItem">
                <img src=${element.imageURl} alt="Iphone12">
                <h3 class="productName">${element.nom}</h3>
                <p class="color">Couleur: ${element.couleur}</p>
                <p class="productPrice">${element.prix} FCFA</p>
                <span class="hoverText"><button class="addBtn">Ajouter au pannier</button></span>
            </div>
        `;
      productBlock.innerHTML += content;
    });
  }

  displayCouunt() {
    const shopping = document.querySelector(".shopping");
    shopping.innerHTML = `${this.count}`;
  }

  addToShoppingCartList() {
    const productItem = document.querySelectorAll(".productItem");
    if (productItem) {
      productItem.forEach((element) => {
        if (element) {
          const hoverText = element.querySelector(".hoverText");
          hoverText.addEventListener("click", (e) => {
            let getCount = localStorage.getItem("count");
            this.count = JSON.parse(getCount);
            this.count++;
            localStorage.setItem("count", JSON.stringify(this.count));
            const name = element.querySelector(".productName");
            let color = element.querySelector(".color");
            color = color.textContent.split(" ");
            color = color[1];

            let price = element.querySelector(".productPrice");
            price = price.textContent.split(" ");
            price = price[0];
            let qte = 1;
            const iosAdd = {
              id: this.shoppingCartList.length + 1,
              nom: name.textContent,
              couleur: color,
              prix: price,
              qte: qte,
              prixTotal: qte * price,
            };

            this.shoppingCartList.push(iosAdd);
            localStorage.setItem(
              "shoppingCartList",
              JSON.stringify(this.shoppingCartList)
            );
            iphoneStock.displayCouunt();
          });
        }
      });
    }
  }

  displayShoppingCartList() {
    const addList = document.querySelector(".shoppingCartList");
    if (this.shoppingCartList.length <= 0) {
      addList.innerHTML = `
            <tr>
                <td colspan="6">
                <p class="emptydata">Aucune information disponible</p>
                </td>
            </tr>
        `;
    } else {
      let content = "";
      this.shoppingCartList.forEach((element) => {
        content += `
                  <tr>
                      <td>${element.nom}</td>
                      <td>${element.couleur}</td>
                      <td>${element.prix}</td>
                      <td>${element.qte}</td>
                      <td>${element.prixTotal}</td>
                      <td class="action">
                        <button class="lessBtn" less-id=${element.id}>-</button>
                        <button class="moreBtn" more-id=${element.id}>+</button>
                        <button class="deletBtn" data-ios-id=${element.id}>Supprimer</button>
                        <button class="payBtn" data-transaction-amount="${element.prixTotal}" data-transaction-description="Achat de ${element.nom}">Payer</button>
                      </td>
                  </tr>
                    
                `;
        addList.innerHTML = content;
      });
    }
  }

  deletIos() {
    const deletIosTag = document.querySelectorAll(".deletBtn");
    if (deletIosTag) {
      deletIosTag.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          let getCount = localStorage.getItem("count");
          this.count = JSON.parse(getCount);
          this.count = this.count - 1;
          localStorage.setItem("count", JSON.stringify(this.count));
          const currentAttribute = e.target.getAttribute("data-ios-id");
          const filtershoppingCartList = this.shoppingCartList.filter(
            (p) => p.id != currentAttribute
          );
          localStorage.setItem(
            "shoppingCartList",
            JSON.stringify(filtershoppingCartList)
          );
          location.reload();
        });
      });
    }
  }

  moreQte() {
    const IosTag = document.querySelectorAll(".moreBtn");
    if (IosTag) {
      IosTag.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          let getshoppingCartList = localStorage.getItem("shoppingCartList");
          this.shoppingCartList = JSON.parse(getshoppingCartList);
          const currentAttribute = e.target.getAttribute("more-id");
          const filtershoppingCartList = this.shoppingCartList.filter(
            (p) => p.id == currentAttribute
          );
          filtershoppingCartList[0].qte = filtershoppingCartList[0].qte + 1;
          filtershoppingCartList[0].prixTotal =
            filtershoppingCartList[0].prix * filtershoppingCartList[0].qte;
          localStorage.setItem(
            "shoppingCartList",
            JSON.stringify(this.shoppingCartList)
          );
          location.reload()
        });
      });
    }
  }

  lessQte() {
    const IosTag = document.querySelectorAll(".lessBtn");
    if (IosTag) {
      IosTag.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          let getshoppingCartList = localStorage.getItem("shoppingCartList");
          this.shoppingCartList = JSON.parse(getshoppingCartList);
          const currentAttribute = e.target.getAttribute("less-id");
          const filtershoppingCartList = this.shoppingCartList.filter(
            (p) => p.id == currentAttribute
          );
          if (filtershoppingCartList[0].qte == 1) {
            item.disabled = true;
            item.classList.toggle("button");
          } else {
            item.disabled = false;
            item.classList.toggle("button", false);
            filtershoppingCartList[0].qte = filtershoppingCartList[0].qte - 1;
            filtershoppingCartList[0].prixTotal =
              filtershoppingCartList[0].prix * filtershoppingCartList[0].qte;
            localStorage.setItem(
              "shoppingCartList",
              JSON.stringify(this.shoppingCartList)
            );
            location.reload()
          }
        });
      });
    }
  }
}

const iphoneStock = new IphoneStock();
iphoneStock.initProduct();
iphoneStock.initShoppingCartList();
iphoneStock.initCount();

const pathname = window.location.pathname;
if (pathname == "/admin.html") {
  iphoneStock.addProduct();
  iphoneStock.displayCouunt();
}

if (pathname == "/shop.html") {
  iphoneStock.displayCouunt();
  iphoneStock.displayIos();
  iphoneStock.addToShoppingCartList();
}

if (pathname == "/index.html") {
  iphoneStock.displayCouunt();
  iphoneStock.addToShoppingCartList();
}

if (pathname == "/shopping_cart.html") {
  iphoneStock.displayCouunt();
  iphoneStock.displayShoppingCartList();
  iphoneStock.initShoppingCartList()
  iphoneStock.deletIos();
  iphoneStock.moreQte();
  iphoneStock.lessQte();
}
