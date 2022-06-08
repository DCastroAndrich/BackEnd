import axios from "axios";

let url = "http://localhost:8080/api/productos/";

axios
  .get(url)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

axios
  .post(url, {
    name: "Mouse",
    description: "Mouse wireless Bangho",
    thumbnail:
      "https://www.iconfinder.com/icons/2824437/lab_school_science_tube_icon",
    price: "17,50",
    stock: "10",
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

axios
  .delete(`${url}/ZmVSUP1QfRG8SEUiXNDd`)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
