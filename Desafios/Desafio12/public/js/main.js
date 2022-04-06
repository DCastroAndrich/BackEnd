const socket = io.connect();

/* SOCKET TABLA DE PRODUCTOS */

const addNewProduct = document.querySelector("#addNewProduct");
const productName = document.querySelector("#name");
const productPrice = document.querySelector("#price");
const productThumbnail = document.querySelector("#thumbnail");

addNewProduct.addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    name: productName.value,
    price: productPrice.value,
    thumbnail: productThumbnail.value,
  };
  socket.emit("newProduct", product);
  addNewProduct.reset();
});

socket.on("products", (products) => {
  htmlTable(products).then((html) => {
    document.getElementById("productsTable").innerHTML = html;
  });
});

function htmlTable(products) {
  return fetch("../hbs/productsTable.hbs")
    .then((res) => res.text())
    .then((table) => {
      const template = Handlebars.compile(table);
      const html = template({ products });
      return html;
    });
}

/* SOCKET CHAT */
const userName = document.querySelector("#userName");
const textMsg = document.querySelector("#textMsg");
const btnSend = document.querySelector("#btnSend");

const sendMsg = () => {
  socket.emit("newMessage", { author: userName.value, msg: textMsg.value });
  textMsg.focus();
  return false;
};

socket.on("messages", (messages) => {
  let conMsdgHtml = "";
  messages.forEach((msg) => {
    conMsdgHtml += `
            <div class="container bg-light">
                <b style="color: blue;">${msg.author}</b>[<span style="color: brown;" >${msg.date} </span>] : <i style="color: green;">${msg.msg} </i>
            </div>
        
        `;
  });
  document.getElementById("chatContainer").innerHTML = conMsdgHtml;
});


userName.addEventListener("input", () => {
  const verifyEmail = userName.value.length;
  const verifyText = textMsg.value.length;
  textMsg.disabled = !verifyEmail;
  btnSend.disabled = !verifyEmail || !verifyText;
});

textMsg.addEventListener("input", () => {
  const verifyText = textMsg.value.length;
  btnSend.disabled = !verifyText;
});
