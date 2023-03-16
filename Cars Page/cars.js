//wishlist icon link for both transparent and red
let favourites_default_icon =
  "https://icon-library.com/images/wishlist-icon/wishlist-icon-19.jpg";
let favourites_red_icon =
  "https://uxwing.com/wp-content/themes/uxwing/download/relationship-love/red-heart-icon.png";

let cars_container = document.querySelector(".cars_container");
cars_container.innerHTML = "<h1>Loading....</h1>";
let price_sortas = "";
let kms_sortas = "";
let filter_brand = "";
function appendData(data) {
  cars_container.innerHTML = "";
  data.map((item, i) => {
    let car_div = document.createElement("div");
    let image = document.createElement("img");
    let icon = document.createElement("img");
    icon.classList.add("icon");
    icon.src = favourites_default_icon;

    //adding functionality to favourites icon
    icon.addEventListener("click", () => {
      if (icon.src === favourites_default_icon) {
        icon.src = favourites_red_icon;
        postData(
          "https://mock-json-server-ax9s.onrender.com/wishlisted_cars",
          item
        );
      } else {
        deleteData(
          `https://mock-json-server-ax9s.onrender.com/wishlisted_cars/${item.id}`
        );
        icon.src = favourites_default_icon;
      }
    });

    image.src =
      "http://majorspoilers.com/wp-content/uploads/2014/01/image007.jpg";

    let year_name = document.createElement("h2");
    year_name.innerText = `${item.year} ${item.brand}`;

    let type = document.createElement("h4");
    type.innerText = item.type;

    let kms = document.createElement("span");
    kms.innerText = `${item.kms} km`;

    let owner = document.createElement("span");
    owner.innerText = "1st Owner";

    let engine_type = document.createElement("span");
    engine_type.innerText = "Petrol";

    let span_div = document.createElement("div");
    span_div.classList.add("span");
    span_div.append(kms, owner, engine_type);

    let per_month = document.createElement("h3");
    per_month.innerText = "Rs 11,439/month";

    let price = document.createElement("h4");
    price.innerText = `Rs ${item.price}`;

    let price_div = document.createElement("div");
    price_div.classList.add("price");
    price_div.append(per_month, price);

    let p = document.createElement("p");
    p.innerText = "Zero Down Payment";

    let remove_btn = document.createElement("button");
    remove_btn.classList.add("remove");
    remove_btn.innerText = "Remove";
    remove_btn.addEventListener("click", async () => {
      await deleteData(
        `https://mock-json-server-ax9s.onrender.com/cars/${item.id}`
      );
      alert("Deleted Successfully");
      fetchData();
    });

    let edit_btn = document.createElement("button");
    edit_btn.classList.add("edit");
    edit_btn.innerText = "Edit";
    edit_btn.addEventListener("click", () => {});

    let details_div = document.createElement("div");
    details_div.classList.add("details");
    details_div.append(
      year_name,
      icon,
      type,
      span_div,
      price_div,
      p,
      edit_btn,
      remove_btn
    );

    car_div.append(image, details_div);
    cars_container.append(car_div);
  });
}

//for sorting
function sortingByPrice() {
  let price = document.querySelector("#price");
  if (price.value === "LH") {
    price_sortas = "asc";
  } else if (price.value === "HL") {
    price_sortas = "desc";
  } else {
    price_sortas = "";
  }
  fetchData();
}

function sortingByKms() {
  let kms = document.querySelector("#kms");
  if (kms.value === "10000") {
    kms_sortas = "kms_lte=10000";
  } else if (kms.value === "20000") {
    kms_sortas = "kms_lte=20000";
  } else if (kms.value === "50000") {
    kms_sortas = "kms_lte=50000";
  } else if (kms.value === "100000") {
    kms_sortas = "kms_lte=100000";
  } else {
    kms_sortas = "";
  }
  fetchData();
}

//for filtering
function filterByBrand() {
  let brand = document.querySelector("#filter");
  console.log(brand.value);
  if (brand.value === "Maruti") {
    filter_brand = "brand=Maruti";
  } else if (brand.value === "Hyundai") {
    filter_brand = "brand=Hyundai";
  } else if (brand.value === "Mahindra") {
    filter_brand = "brand=Mahindra";
  } else if (brand.value === "Tata") {
    filter_brand = "brand=Tata";
  } else {
    filter_brand = "";
  }
  fetchData();
}

//function to do post request
async function postData(url, data) {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

//function to do a delete request
async function deleteData(url) {
  try {
    let res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
}

fetchData();
async function fetchData() {
  try {
    let response = await fetch(
      `https://mock-json-server-ax9s.onrender.com/cars?_sort=price&_order=${price_sortas}&kms_gte=1&${kms_sortas}&${filter_brand}`
    );
    let data = await response.json();
    console.log(data);
    appendData(data);
  } catch (err) {
    console.log(err);
  }
}
