let val; //! values from forms
let table; // !table to upload to
let parentDiv; // ! parent div
let where; //! where to do somthing

let longName = document.getElementById("longName");
let shortName = document.getElementById("shortName");
let def = document.getElementById("def");
let link = document.getElementById("link");
let subject = document.getElementById("subject");
let aSNew = document.getElementById("aSNew");
let aS = document.getElementById("aS");
let aSButton = document.getElementById("resetSubjects");
let theme = document.getElementById("theme");
let aTNew = document.getElementById("aTNew");
let aT = document.getElementById("aT");
let aTButton = document.getElementById("resetThemes");
let image = document.getElementById("image"); //the input
const images = document.getElementById("images"); //the preview pix
const preview = images.getElementsByTagName("img")[0];
const src = document.getElementById("imageLink");
const resetimagePath = "images/download.jpg";
// let whereInput = e.target.id;
let allSubjects;
// = aS.querySelectorAll('input[type="checkbox"]');
let allThemes;
// = aT.querySelectorAll('input[type="checkbox"]');

let addNewTheme = document.getElementById("addNewTheme");
let addNewSubject = document.getElementById("addNewSubject");
const imageInput = document.getElementById("image");
let resetImage = document.getElementById("resetImage");

let uploadMe = document.getElementById("uploadMe");
let resetMe = document.getElementById("resetMe");

//length and patterns
longName.setAttribute("maxlength", "255");
shortName.setAttribute("maxlength", "100");
def.setAttribute("maxlength", "65535");
link.setAttribute("maxlength", "500");
subject.setAttribute("maxlength", "100");
theme.setAttribute("maxlength", "100");
image.setAttribute("maxlength", "100");

// invalid
let invalid_display = "block";
let invalid_border = "2px solid #dc3545";
let invalid_paddingRight = "calc(1.5em + .75rem)";
let invalid_backgroundImage =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\")";
let invalid_backgroundRepeat = "no-repeat";
let invalid_backgroundPosition = "right calc(.375em + .1875rem) center";
let invalid_backgroundSize = "calc(.75em + .375rem) calc(.75em + .375rem)";

// valid
let valid_display = "none";
let valid_border = "1px solid #ced4da";
let valid_paddingRight = "0.75rem";
let valid_backgroundImage = "none";
let valid_backgroundRepeat = "no-repeat";
let valid_backgroundPosition = "right calc(.375em + .1875rem) center";
let valid_backgroundSize = "calc(.75em + .375rem) calc(.75em + .375rem)";

// all textsInputs
const textInputs = document.querySelectorAll(
  'input[type="text"], input[type="url"], input[type="file"]'
);

const textAreas = document.querySelectorAll("textarea");
const validFeedbacks = document.querySelectorAll(".valid-feedback");
const invalidFeedbacks = document.querySelectorAll(".invalid-feedback");

const error = document.getElementById("error-alert");
const success = document.getElementById("success-alert");
const form = document.getElementById("myForm");
let defaultImage = (e) => {
  e.preventDefault();
  e.stopPropagation();
  image.value = "";
  preview.src = "images/download.jpg";
  validFeedBack(document.getElementById("image"));
};

// ! EVENTS

resetImage.addEventListener("click", function (event) {
  defaultImage(event);
});
// Loop through all text input elements and add the focus event listener
textInputs.forEach(function (textInput) {
  textInput.addEventListener("focus", function () {
    // Your code to handle the input being focused or clicked
    console.log("Input is focused or clicked.");
  });
});

image.addEventListener("click", function () {
  // Your code to handle the input being focused or clicked
  console.log("Input is focused or clicked.");
  validFeedBack(image);
});

let addCheckboxesNew = (themeSubject) => {
  console.log("addCheckboxesNew...");
  if (themeSubject == "theme") {
    allFachs.forEach((theme) => {
      let div = document.createElement("div");
      div.classList.add("form-check-inline");

      let label = document.createElement("label");
      label.classList.add("me-3", "mb-3", themeSubject, "myLabel");
      label.setAttribute("for", "theme_" + theme.theme_id);
      label.innerHTML = " " + theme.theme_name;

      let input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("name", "theme_" + theme.theme_id);
      input.id = "theme_" + theme.theme_id;
      input.classList.add("myCheckbox", "theme");

      input.value = theme.theme_id;

      input.addEventListener("change", () => {
        // Your event handling code here
        checkRadioStatus("theme");
      });

      div.appendChild(input);
      div.appendChild(label);
      let placeHere = document.querySelector("#aT .checkbox-container");
      placeHere.appendChild(div);
    });
  } else if (themeSubject == "subject") {
    allSubs.forEach((sub) => {
      let div = document.createElement("div");
      div.classList.add("form-check-inline");

      let label = document.createElement("label");
      label.classList.add("me-3", "mb-3", themeSubject, "myLabel");
      label.setAttribute("for", "subject_" + sub.subject_id);
      label.innerHTML = " " + sub.subject_name;

      let input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("name", "subject_" + sub.subject_id);
      input.id = "subject_" + sub.subject_id;
      input.classList.add("myCheckbox", "subject");

      input.value = sub.subject_id;

      input.addEventListener("change", () => {
        // Your event handling code here
        checkRadioStatus("subject");
      });

      div.appendChild(input);
      div.appendChild(label);
      let placeHere = document.querySelector("#aS .checkbox-container");
      placeHere.appendChild(div);
    });
  } else {
    console.log("Unknown themeSubject: " + themeSubject);
  }
};

let checkRadioStatus = (subTheme) => {
  console.log("............................." + subTheme);
  let arr;
  let atleastOneChecked;
  let div;

  switch (subTheme) {
    case "theme":
      arr = aT.querySelectorAll('input[type="checkbox"]');
      div = aT;

      break;
    case "subject":
      arr = aS.querySelectorAll('input[type="checkbox"]');
      div = aS;

      break;
    default:
      break;
  }
  arr.forEach((el) => {
    if (el.checked) {
      atleastOneChecked = true;
    }
  });

  // is it on validation?

  if (form.classList.contains("was-validated")) {
    if (!atleastOneChecked) {
      console.log("getting htere...");
      // Display an error message or take the desired action
      div.querySelector(".greg-valid-feedback").classList.remove("d-none");
      div.querySelector(".greg-invalid-feedback").classList.remove("d-none");
      div.querySelector(".greg-valid-feedback").classList.add("d-none");
    } else {
      div.querySelector(".greg-valid-feedback").classList.remove("d-none");
      div.querySelector(".greg-invalid-feedback").classList.remove("d-none");
      div.querySelector(".greg-invalid-feedback").classList.add("d-none");
    }
  }
  return atleastOneChecked;
};

let validFeedBack = (id) => {
  console.log("validFeedBack(" + id + ")");
  let divElement = id.parentNode;
  let validDiv = divElement.querySelector(".invalid-feedback");
  validDiv.style.display = valid_display;
  id.style.border = valid_border;
  id.style.paddingRight = valid_paddingRight;
  id.style.backgroundImage = valid_backgroundImage;
  id.style.backgroundRepeat = valid_backgroundRepeat;
  id.style.backgroundPosition = valid_backgroundPosition;
  id.style.backgroundSize = valid_backgroundSize;
};

let invalidFeedBack = (id) => {
  let divElement = id.parentNode;
  console.log("1nvalidFeedBack");
  // Access the vali1d-feedback and invalid-feedback elements

  let invalidDiv = divElement.querySelector(".invalid-feedback");
  invalidDiv.style.display = invalid_display;
  id.style.border = invalid_border;
  id.style.paddingRight = invalid_paddingRight;
  id.style.backgroundImage = invalid_backgroundImage;
  id.style.backgroundRepeat = invalid_backgroundRepeat;
  id.style.backgroundPosition = invalid_backgroundPosition;
  id.style.backgroundSize = invalid_backgroundSize;
};

let addNewthemeSubject = (e) => {
  let SubTheme;

  if (e.target.id === "addNewTheme") {
    val = theme.value.trim();
    table = "theme";
    parentDiv = aT;
    SubTheme = theme;
  } else if (e.target.id === "addNewSubject") {
    val = subject.value.trim();
    table = "subject";
    parentDiv = aS;
    SubTheme = subject;
  }

  if (val.length < 1) {
    invalidFeedBack(SubTheme);
  }

  // If the value is not empty, you can reset the input style
  SubTheme.classList.remove("custom-invalid-style");

  // Continue with your logic for adding the new theme or subject

  //send to db with fetch
  fetch("php/addNewTag.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `val=${val}&table=${table}`,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // Assuming the server responds with text data
    })
    .then((data) => {
      // Handle the response data as needed
      console.log("Server response:", data);
      let arr = JSON.parse(data);
      console.log(arr);
      console.log(arr.success);

      if (arr.success == true) {
        addToListAndChecked(val, arr.id, parentDiv, table);
        showSuccessMessageThere(SubTheme, arr.message);
      } else {
        showErrorMessageThere(SubTheme, arr.message);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

function areAllTrue(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== true) {
      return false;
    }
  }
  return true;
}

let addToListAndChecked = (val, id, div, table) => {
  console.log(
    "addToListAndChecked: " + val + " " + id + " " + div + " " + table
  );
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = table + "_" + id; // Use the provided 'id' argument
  checkbox.id = table + "_" + id;
  checkbox.className = "myCheckbox";
  checkbox.checked = true; // Set the checkbox as checked
  checkbox.value = id; // Use the provided 'id' argument

  // Create a label element
  let label = document.createElement("label");
  label.className = "me-3 mb-3 myLabel";
  label.htmlFor = table + "_" + id; // Use the provided 'id' argument
  label.textContent = " " + val; // Use the provided 'val' argument

  // Create a new div container and append the checkbox and label
  let container = document.createElement("div");
  container.className = "form-check-inline";
  container.appendChild(checkbox);
  container.appendChild(label);

  // Find the 'fieldset' element in the specified 'div' and append the container
  let fieldSet = div.querySelector("fieldset");
  fieldSet.appendChild(container);
};

let showErrorMessageThere = (where, message) => {
  invalidFeedBack(where);
  divElement = where.parentNode;
  let invalidDiv = divElement.querySelector(".invalid-feedback");
  invalidDiv.textContent = message;
};
let showSuccessMessageThere = (where, message) => {
  console.log(".valid-feedback");

  validFeedBack(where);
  divElement = where.parentNode;
  let validDiv = divElement.querySelector(".valid-feedback");
  validDiv.textContent = message;
  validDiv.style.display = "block";
};
function uploadImageToDb() {
  const selectedImage = imageInput.files[0];

  if (selectedImage) {
    const formData = new FormData();
    formData.append("image", selectedImage);

    fetch("php/uploadImageToDb.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the PHP script here
        console.log(data);

        if (data.success == true) {
          preview.src = data.path;
          src.textContent = data.path;
          showSuccessMessageThere(image, data.message);
        } else if (data.success == false) {
          preview.src = "images/download.jpg";
          src.textContent = "";
          showErrorMessageThere(image, data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.log("No image selected.");
  }
}

let reset = (subjectTheme) => {
  console.log("reset");
  let array;
  if (subjectTheme == "theme") {
    array = aT.querySelectorAll("input[type='checkbox']");
  } else if (subjectTheme == "subject") {
    array = aS.querySelectorAll("input[type='checkbox']");
  } else {
    alert("error");
    return;
  }

  array.forEach((element) => {
    element.checked = false;
  });

  checkRadioStatus(subjectTheme);
};

aSButton.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  reset("subject");
});

aTButton.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  reset("theme");
});

addNewTheme.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  addNewthemeSubject(e);
});
addNewSubject.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  addNewthemeSubject(e);
});

image.addEventListener("change", uploadImageToDb);

let resetAll = (e) => {
  e.preventDefault();
  e.stopPropagation();
  success.classList.add("d-none");
  error.classList.add("d-none");
  //remove was validated

  form.classList.remove("was-validated");

  // reset picture

  preview.src = resetimagePath;
  src.textContent = "";
  var feedbackElementsAs = aS.querySelectorAll(
    ".valid-feedback, .invalid-feedback"
  );
  var feedbackElementsAt = aT.querySelectorAll(
    ".valid-feedback, .invalid-feedback"
  );

  // Loop through the found elements and set their display property to 'none'
  for (var i = 0; i < feedbackElementsAs.length; i++) {
    feedbackElementsAs[i].style.display = "none";
  }
  // Loop through the found elements and set their display property to 'none'
  for (var i = 0; i < feedbackElementsAt.length; i++) {
    feedbackElementsAt[i].style.display = "none";
  }

  textInputs.forEach((textInput) => {
    textInput.value = "";
  });
  // all check boxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  textAreas.forEach((textArea) => {
    textArea.value = "";
  });
};

resetMe.addEventListener("click", function (e) {
  resetAll(e);
});

// Example starter JavaScript for disabling form submissions if there are invalid fields

console.log("check the form before");
// Loop over them and prevent submission

form.addEventListener("submit", function (event) {
  processForm(event, form);
});

//! what to do when button is clicked
function processForm(e, form) {
  e.preventDefault();
  e.stopPropagation();

  // Check if at least one checkbox is checked

  // check validity
  if (!form.checkValidity()) {
    // form.classList.add("was-validated");
    form.classList.add("was-validated");
  }

  let isAtLeastOneCheckedSubject = checkRadioStatus("subject");
  let isAtLeastOneCheckedTheme = checkRadioStatus("theme");
  if (!isAtLeastOneCheckedTheme || !isAtLeastOneCheckedSubject) {
    return;
  }
  var invalidFeedbackElements = form.querySelectorAll(".invalid-feedback");

  for (var i = 0; i < invalidFeedbackElements.length; i++) {
    var computedStyle = window.getComputedStyle(invalidFeedbackElements[i]);
    if (computedStyle.display === "block") {
      console.log("...There is an error in the form....");

      return; // If one error is found, you can break the loop
    }
  }
  // one radio checked at least?

  console.log("ポスト !!");

  const subjectCheckboxes = document.querySelectorAll(
    'input[name^="subject"]:checked'
  );

  const selectedSubject = Array.from(subjectCheckboxes).map((cb) => cb.value);
  localStorage.setItem("selectedSubject", JSON.stringify(selectedSubject));

  const themeCheckboxes = document.querySelectorAll(
    'input[name^="theme"]:checked'
  );

  const selectedTheme = Array.from(themeCheckboxes).map((cb) => cb.value);
  localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));

  let longName = document.getElementById("longName").value;
  let shortName = document.getElementById("shortName").value;
  let def = document.getElementById("def").value;
  let link = document.getElementById("link").value;
  let img = document.getElementById("imageLink").textContent;

  sendToPhp(
    longName,
    shortName,
    def,
    link,
    selectedSubject,
    selectedTheme,
    img
  );
}

// send to php
let sendToPhp = (
  longName,
  shortName,
  def,
  link,
  selectedSubject,
  selectedTheme,
  src
) => {
  // Create an object to hold the data you want to send
  const data = {
    longName,
    shortName,
    def,
    link,
    selectedSubject,
    selectedTheme,
    src,
  };

  success.classList.add("d-none");
  error.classList.add("d-none");

  // Define the URL of your PHP script
  const url = "php/addNewEntry.php";

  // Define the fetch options
  const options = {
    method: "POST",
    body: JSON.stringify(data), // Convert data to JSON and send it in the request body
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Make the fetch request
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // Assuming the server responds with text data
    })
    .then((data) => {
      console.log("Server response:", data);
      let arr = JSON.parse(data);
      console.log(arr);
      console.log(arr.success);

      if (arr.success == true) {
        console.log("superber");
        // showSuccessMessageThere
        success.classList.remove("d-none");
        success.innerText = arr.message;
      } else {
        console.log("no good");
        error.classList.remove("d-none");
        error.innerText = arr.message;
        // showErrorMessageThere??
      }
    })
    .catch((error) => {
      console.error("Error sending data to PHP:", error);
    });
};
