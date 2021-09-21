  let data;
  
  let infoContainer = document.getElementById("infoContainer");

  let namesBtn = document.querySelector(".namesBtn");

  function getValues(event) {
    let value = event.currentTarget.value;
    if(value.length > 3) {
      // currently selected dropdown item:
      let query = document.getElementById("options").value;
      let queryData = data.filter(element => element[query].toLowerCase().includes(value.toLowerCase()));
      displayData(queryData);
    } else if(value.length === 0) {
      displayData(data);
    }
  }

  document.querySelector("#searchInput").addEventListener("keyup", getValues);

  displayData = (data) => {
    infoContainer.innerHTML = "";
    
    data.forEach((data) => {
      infoContainer.innerHTML += `
      <div class="col-4 mb-2"
      <div style="padding: 2px;">
        <div class="card-body h-100 d-flex flex-column justify-content-between" style="border: 1px solid black;">
            <h5 class="card-title pt-2">${data.name}</h5>
            <p class="card-text">Username: ${data.username}</p>
            <p class="card-text pb-2">Email: ${data.email}</p>
        </div>
      </div>
      </div>`;
    }) 
  }


  const getAddress = (userObj) => {
  const address = [];
  address.push(
    userObj.address.street,
    userObj.address.suite,
    userObj.address.city,
    userObj.address.zipcode
  );
  return address.join(" ");
};


  async function getData() {
    let responsePromise = await fetch("https://jsonplaceholder.typicode.com/users");

    let responseJSON = await responsePromise.json();

    data = responseJSON;
    //console.log(data);

    displayData(data);
  }


  let orderOfNames = "asc";
  displayNames = () => {

    infoContainer.innerHTML = "";
    
    let names = data.map((person) => person.name);
    // By default sorting alphabetically:
    if(orderOfNames === "asc") {
      names.sort()
      orderOfNames = "desc";
      namesBtn.innerText = "Names - Reverse Alphabetical";
    } else {
      names.sort();
      names.reverse();
      orderOfNames = "asc";
      namesBtn.innerText = "Names - Alphabetical order";
    }
    names.forEach((Element) => { 
      infoContainer.innerHTML +=`
        <div class="col-4 mx-1 my-1">
            <p class="list-group-item">${Element}</p>
        </div>` ;})
  }

  document.querySelector(".namesBtn").addEventListener("click", displayNames);


  displayAddress = () => {
    // Manage later duplicate address from button click:
    let cards = document.querySelectorAll(".card-body");
    console.dir(cards);

    data.forEach((element,index) => {
      let {city, street, zipcode} = element.address;
      let addressElement = document.createElement("p");
      addressElement.classList.add(".addressInfo");

      addressElement.className = "card-text pb-2";
      addressElement.innerText = `Address: ${city}, ${street}, ${zipcode}`;

      cards[index].appendChild(addressElement);
    })
  }

  document.querySelector(".addressBtn").addEventListener("click", displayAddress);


  window.onload = () => {
    getData()
  }


