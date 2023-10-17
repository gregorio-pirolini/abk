function showAlert(message) {
  alert(message);
}

let allSubs = [];
let allFachs = [];

async function getAllSubFach(subFach) {
  const formData = new FormData();
  formData.append("subFach", subFach);

  try {
    const response = await fetch("php/getAllSubFach.php", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Usage example
getAllSubFach("subject").then((subs) => {
  console.log(subs);
  allSubs = subs;
  if (pageTitle == "new") {
    // addCheckboxesNew(subFach);
    addCheckboxesNew("subject");
    allSubjects = aS.querySelectorAll('input[type="checkbox"]');
  }

  // Assign the fetched data to the outer array
  // You can process the allSubs array here
});

getAllSubFach("theme").then((fachs) => {
  console.log(fachs);
  allFachs = fachs; // Assign the fetched data to the outer array
  // You can process the allFachs array here
  if (pageTitle == "new") {
    // addCheckboxesNew(subFach);
    addCheckboxesNew("theme");
  }
});

// what do you want  to do?
let pageTitle;
function checkPageTitle() {
  // Get the current page title
  pageTitle = document.title.toLowerCase();
  console.log(pageTitle);
  switch (pageTitle) {
    case "abkürzungen":
      break;
    case "new":
      break;
    default:
      break;
  }
}

// Call the function to check the page title
checkPageTitle();

const searchInput = document.querySelector(".form-control.me-2");

function setPlaceholderByScreenSize() {
  if (window.matchMedia("(max-width: 575.98px)").matches) {
    searchInput.placeholder = "Search on XS screens";
  } else if (window.matchMedia("(max-width: 767.98px)").matches) {
    searchInput.placeholder = "Search on SM screens";
  } else if (window.matchMedia("(max-width: 991.98px)").matches) {
    searchInput.placeholder = "Search on MD screens";
  } else if (window.matchMedia("(max-width: 1199.98px)").matches) {
    searchInput.placeholder = "Search on LG screens";
  } else if (window.matchMedia("(max-width: 1399.98px)").matches) {
    searchInput.placeholder = "Search on XL screens";
  } else {
    searchInput.placeholder = "Search on XXL screens";
  }
}

// Initial call
setPlaceholderByScreenSize();
let $user = "";
let $id = "";
let admin = "";

let getUserInfo = () => {
  fetch("php/getuserinfo.php")
    .then((res) => res.json())
    .then((d) => {
      // console.log(d);
      const greetings = findGreetings();
      const hello = document.getElementById("hello");
      hello.innerText = greetings + " " + d.user;
      admin = d.id === 3 ? "admin" : "notAdmin";
    });
};

let findGreetings = () => {
  const d = new Date();
  let time = d.getHours();
  // console.log(time);
  let hello = "Good evening";
  if (time < 12) {
    hello = "Good morning";
  }
  if (time >= 12 && time < 19) {
    hello = "good afternoon";
  }

  return hello;
};

if (pageTitle !== "log in") {
  getUserInfo();
}

// Call again when the window is resized

console.log("getUserInfo");
window.addEventListener("resize", setPlaceholderByScreenSize);
