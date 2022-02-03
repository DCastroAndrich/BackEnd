const socket = io.connect();

const sendMsg = () => {
  const name = document.querySelector("#name");
  const msg = document.querySelector("#msg");
  socket.emit("newMsg", { author: name.value, msg: msg.value });
  return false;
};

socket.on("messages", (messages) => {
  console.log(messages);

  let conMsgHtml = "";
  messages.forEach((message) => {
    conMsgHtml += `<span><b>${message.author}: </b>${message.msg}</span><br>`;
  });
  document.getElementById("msgContainer").innerHTML = conMsgHtml;
});
