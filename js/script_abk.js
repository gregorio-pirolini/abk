// prettier-ignore
const testMe = [{subject_id:0, subject_name: "name 0"},
{subject_id:1, subject_name: "name 1"},
{subject_id:2, subject_name: "name 2"}];

const imgKlass = ["img", "col-md-6", "col-sm-12", "mb-5"];
const subKlass = ["sub", "col-md-3", "col-sm-12"];
const themeKlass = ["theme", "col-md-3", "col-sm-12"];

const longNameKlass = ["longName", "col-md-3", "col-sm-12", "mb-5"];
const shortNameKlass = ["shortName", "col-md-2", "col-sm-12"];
const definitionKlass = ["definition", "col-md-7", "col-sm-12"];

const linkKlass = ["link", "col-md-12", "col-sm-12"];

let createSubsAndThemes = (arrClass, elements, table, id) => {
  let sub = document.createElement("div");
  sub.classList.add(...arrClass);
  if (elements == null) {
    elements = "addMe";
  }
  viewMode = document.createElement("div");
  viewMode.classList.add("view-mode");
  viewMode.textContent = elements;

  let arrSub = elements.split(";").map((sub) => sub.trim());

  sub.append(viewMode);

  if (admin == "admin") {
    let input = document.createElement("input");
    input.classList.add("mt-2");
    input.placeholder = "enter new";

    let arrClass = ["btn", "btn-primary", "btn-sm", "btnToogle", "mt-2"];
    let btnSub = createButton(
      arrClass,
      id,
      "modify Entry",
      "click",
      function (event) {
        // Reset the text and toggle back to view mode
        modifyEntry(event, table);
      }
    );

    arrClass = ["btn", "btn-success", "btn-sm", "btnOk", "d-none", "mt-2"];
    let btnOk = createButton(arrClass, id, "OK", "click", function () {
      // Save the edited text and toggle back to view mode
      saveEditedTags(id, table);
    });

    arrClass = [
      "btn",
      "btn-secondary",
      "btn-sm",
      "btnCancel",
      "d-none",
      "mt-2",
      "ms-1",
    ];
    let btnCancel = createButton(arrClass, id, "Cancel", "click", function () {
      // Reset the text and toggle back to view mode
      resetEditText(id, table);
      toggleEditMode(id, table);
    });

    let br = document.createElement("br");

    let subSub = document.createElement("div");
    subSub.classList.add("edit-mode", "d-none");

    sub.append(br);

    let checkboxContainer = document.createElement("div");
    if (table == "theme") {
      allFachs.forEach((theme) => {
        let label = document.createElement("label");
        label.innerHTML = `
      <input type="checkbox" name="${table}" value="${theme.theme_id}" ${
          arrSub.includes(theme.theme_name) ? "checked" : ""
        }>
          ${theme.theme_name}
      `;
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
      });
    }
    if (table == "sub") {
      allSubs.forEach((sub) => {
        let label = document.createElement("label");
        label.innerHTML = `
      <input type="checkbox" name="${table}" value="${sub.subject_id}" ${
          arrSub.includes(sub.subject_name) ? "checked" : ""
        }>
          ${sub.subject_name}
      `;
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
      });
    }
    subSub.append(checkboxContainer);
    subSub.append(input); // Add the input field for editing

    sub.append(subSub);
    sub.append(btnSub);
    sub.append(btnOk);
    sub.append(btnCancel);
  }
  return sub;
};

function modifyEntry(clickedEvent, row) {
  const dataId = clickedEvent.target.getAttribute("data-id");

  // Toggle between view and edit modes
  toggleEditMode(dataId, row);
}

function toggleEditMode(dataId, row) {
  console.log(`toggleEditMode: ${dataId} .${row}`);

  // Use proper selectors to find the view-mode and edit-mode elements
  let viewMode = document.querySelector(`#row${dataId} .${row} .view-mode`);

  let btnToogle = document.querySelectorAll(`#row${dataId} .${row} .btnToogle`);

  let btnOks = document.querySelectorAll(`#row${dataId} .${row} .btnOk`);
  let btnCancels = document.querySelectorAll(
    `#row${dataId} .${row} .btnCancel`
  );
  let btnDeleteSingles = document.querySelectorAll(
    `#row${dataId} .${row} .btnDeleteSingle`
  );
  let textAreaInputs = document.querySelectorAll(
    `#row${dataId} .${row} .edit-mode`
  );

  // Toggle the visibility of elements
  textAreaInputs.forEach(function (textAreaInput) {
    textAreaInput.classList.toggle("d-none");
  });
  viewMode.classList.toggle("d-none");

  btnToogle.forEach(function (btnT) {
    btnT.classList.toggle("d-none");
  });
  btnOks.forEach(function (btnOk) {
    btnOk.classList.toggle("d-none");
  });
  btnCancels.forEach(function (btnCancel) {
    btnCancel.classList.toggle("d-none");
  });
  btnDeleteSingles.forEach(function (btnDeleteSingle) {
    btnDeleteSingle.classList.toggle("d-none");
  });
  // Update the editMode state explicitly
  textAreaInputs.forEach(function (textAreaInput) {
    editMode = !textAreaInput.classList.contains("d-none");
  });
}

let createLinksAndDef = (arrlist, value, table, id) => {
  let div = document.createElement("div");
  div.classList.add(...arrlist);

  let viewMode = document.createElement("div");
  viewMode.classList.add("view-mode");

  if (table == "definition") {
    viewMode.textContent = value;
  }

  if (table == "link") {
    let anchorElement = document.createElement("a");
    // Set the text content of the anchor element
    anchorElement.innerText = value;
    // Set the href attribute for the anchor element
    anchorElement.href = value; // Replace with your desired URL
    // Append the anchor element to the document body or another container
    anchorElement.target = "_blank";
    viewMode.appendChild(anchorElement);
  }

  div.append(viewMode);

  if (admin == "admin") {
    let textArea = document.createElement("textarea");
    textArea.classList.add("edit-mode", "d-none");
    textArea.value = value;

    let arrClass = ["btn", "btn-primary", "btn-sm", "btnToogle", "mt-2"];
    let btnDef = createButton(
      arrClass,
      id,
      "modify Entry",
      "click",
      function (event) {
        // Reset the text and toggle back to view mode
        modifyEntry(event, table);
      }
    );
    arrClass = ["btn", "btn-success", "btn-sm", "btnOk", "d-none", "mt-2"];
    let btnOk = createButton(arrClass, id, "OK", "click", function () {
      // Save the edited text and toggle back to view mode
      saveEditedText(id, table);
    });

    arrClass = [
      "btn",
      "btn-secondary",
      "btn-sm",
      "btnCancel",
      "d-none",
      "mt-2",
      "ms-1",
    ];
    let btnCancel = createButton(arrClass, id, "Cancel", "click", function () {
      // Reset the text and toggle back to view mode
      resetEditText(id, table);
      toggleEditMode(id, table);
    });

    let br = document.createElement("br");
    div.append(br);
    div.append(textArea); // Add the input field for editing

    div.append(btnDef);
    div.append(btnOk);
    div.append(btnCancel);
  }
  return div;
};

let createLongNamesShortNames = (
  arrlist,
  value,
  table,
  id,
  longNamesIds,
  shortNamesIds
) => {
  // console.log(arrlist + "," + value + "," + table + "," + id);
  let div = document.createElement("div");
  div.classList.add(...arrlist);

  let viewMode = document.createElement("div");
  viewMode.classList.add("view-mode");

  viewMode.textContent = value;
  div.append(viewMode);

  if (admin == "admin") {
    //get all idS from
    let br = document.createElement("br");
    div.append(br);
    let arrClass = [
      "btn",
      "btn-danger",
      "btn-sm",
      "btnDel",
      "btnToogle",
      "mt-2",
    ];
    let btnDel;
    if (table == "longName") {
      btnDel = createButton(
        arrClass,
        id,
        "delete entry",
        "click",
        function (event) {
          deleteEntry(event);
        }
      );
    }

    arrClass = ["btn", "btn-primary", "btn-sm", "btnToogle", "mt-2"];
    let btnDef = createButton(
      arrClass,
      id,
      "modify Entry",
      "click",
      function (event) {
        // Reset the text and toggle back to view mode

        modifyEntry(event, table);
      }
    );
    if (table == "longName") {
      div.append(btnDel);
    }

    div.append(btnDef);
  }

  //separate values on ,
  let values = value.split(";");
  let trimmedValues = values.map((v) => v.trim());
  for (n = 0; n < trimmedValues.length; n++) {
    let turn = n;
    let textArea = document.createElement("textarea");
    textArea.classList.add("edit-mode", "d-none");
    textArea.id = "textarea_" + id + "_" + n;
    textArea.value = trimmedValues[n];
    textArea.placeholder = trimmedValues[n];
    textArea.setAttribute("data-long_name_id", longNamesIds);
    textArea.setAttribute("data-Short_name_id", shortNamesIds);
    arrClass = [
      "btn",
      "btn-success",
      "btn-sm",
      "btnOk",
      "d-none",
      "mt-2",
      "mb-3",
    ];
    let btnOk = createButton(arrClass, n, "OK", "click", function () {
      // Save the edited text and toggle back to view mode
      saveEditedNames(id, table, turn, longNamesIds, shortNamesIds);
    });

    arrClass = [
      "btn",
      "btn-secondary",
      "btn-sm",
      "btnCancel",
      "d-none",
      "mt-2",
      "mb-3",
      "ms-1",
    ];
    let btnCancel = createButton(arrClass, n, "Cancel", "click", function () {
      // Reset the text and toggle back to view mode
      resetEditNames(id, table, turn);
      toggleEditMode(id, table);
    });
    arrClass = [
      "btn",
      "btn-danger",
      "btn-sm",
      "btnDeleteSingle",
      "d-none",
      "mt-2",
      "mb-3",
      "ms-1",
    ];

    let btnDeleteSingle = createButton(
      arrClass,
      n,
      "del",
      "click",
      function (event) {
        deleteEntrySingle(id, table, turn, longNamesIds, shortNamesIds);
      },
      longNamesIds,
      shortNamesIds
    );

    let br = document.createElement("br");
    div.append(br);
    div.append(textArea); // Add the input field for editing

    div.append(btnOk);
    div.append(btnCancel);
    div.append(btnDeleteSingle);
  }

  return div;
};

function saveEditedNames(id, table, n, longNamesIds, shortNamesIds) {
  console.log(
    id +
      " , " +
      table +
      " , " +
      n +
      " , " +
      longNamesIds +
      " , " +
      shortNamesIds
  );
  let editedTexts = document.querySelectorAll(`#row${id} .${table} textarea`);
  let editedText = editedTexts[n].value.trim();
  let oldText = editedTexts[n].placeholder;
  fetch("php/updateNames.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `dataId=${id}&oldText=${oldText}&text=${editedText}&what=${table}&longNamesIds=${longNamesIds}&shortNamesIds=${shortNamesIds}`, // Fix the body parameter
  })
    .then((response) => response.json())
    .then((result) => {
      // Handle the response from the server
      console.log(result);
      //reset place holder
      editedTexts[n].placeholder = editedText;
      allEditedText = [];
      editedTexts.forEach((element) => {
        allEditedText.push(element.value.trim());
      });

      document.querySelector(`#row${id} .${table} .view-mode`).textContent =
        allEditedText.join(",");
      toggleEditMode(id, table); // Use dataId instead of element.definition_id
      // You can perform additional actions here based on the server's response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function saveEditedTags(id, table) {
  //select checkboxes
  let checkboxes = document.querySelectorAll(
    `#row${id} .${table} input[type="checkbox"]`
  );
  //array to save values
  let checkedValues = [];
  let labelTexts = [];

  //if is checked push value
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedValues.push(checkbox.value);

      let label = checkbox.parentElement; // Assuming the label is the parent element
      let labelText = label.textContent.trim(); // Get and trim the text content
      labelTexts.push(labelText);
    }
  });

  console.log(checkedValues);

  // Create a URLSearchParams object to properly encode the data
  const formData = new URLSearchParams();
  formData.append("id", id);
  formData.append("table", table);
  formData.append("checkedValues", checkedValues.join(",")); // Convert the array to a comma-separated string

  fetch("php/updateSubjectTheme.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  })
    .then((response) => response.json())
    .then((result) => {
      // Handle the response from the server
      console.log(result);
      document.querySelector(`#row${id} .${table} .view-mode`).textContent =
        labelTexts.join(", ");
      toggleEditMode(id, table); // Use dataId instead of element.definition_id
      // You can perform additional actions here based on the server's response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// Function to save the edited text
function saveEditedText(dataId, table) {
  console.log("yes: " + dataId + "," + table);

  let editedText = document
    .querySelector(`#row${dataId} .${table} textarea`)
    .value.trim();

  console.log(dataId + ", " + table + ", " + editedText);
  // Perform any action needed to save the edited text (e.g., update the server)
  // You can customize this part based on your requirements
  // Make a POST request to the deleteMe.php file with the data-id in the request body
  fetch("php/updateDef.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `dataId=${dataId}&text=${editedText}&what=${table}`, // Fix the body parameter
  })
    .then((response) => response.json())
    .then((result) => {
      // Handle the response from the server
      console.log(result);

      if (table == "definition") {
        document.querySelector(
          `#row${dataId} .${table} .view-mode`
        ).textContent = editedText;
      }

      if (table == "link") {
        console.log("link");
        let anchorElement = document.createElement("a");
        // Set the text content of the anchor element
        anchorElement.innerText = editedText;
        // Set the href attribute for the anchor element
        anchorElement.href = editedText; // Replace with your desired URL
        // Append the anchor element to the document body or another container
        anchorElement.target = "_blank";
        document.querySelector(`#row${dataId} .${table} .view-mode`).innerHTML =
          "";
        document
          .querySelector(`#row${dataId} .${table} .view-mode`)
          .appendChild(anchorElement);
      }

      toggleEditMode(dataId, table); // Use dataId instead of element.definition_id
      // You can perform additional actions here based on the server's response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function resetEditNames(id, table, n) {
  console.log(id + ", " + table + ", " + n);
  // take all place holders
  // place in
  let editedTexts = document.querySelectorAll(`#row${id} .${table} textarea`);
  let oldText = editedTexts[n].placeholder;
  editedTexts[n].value = oldText;
}

function resetEditText(dataId) {
  let originalText = document.querySelector(
    `#row${dataId} .view-mode`
  ).textContent;
  document.querySelector(`#row${dataId} .edit-mode`).value = originalText;
}

let deleteEntrySingle = (id, table, turn, longNamesIds, shortNamesIds) => {
  let editedTexts = document.querySelectorAll(`#row${id} .${table} textarea`);
  let ok = document.querySelectorAll(`#row${id} .${table} .btnOk`);
  let cancel = document.querySelectorAll(`#row${id} .${table} .btnCancel`);
  let del = document.querySelectorAll(`#row${id} .${table} .btnDeleteSingle`);

  let visibleTextareaCount = 0;

  for (let i = 0; i < editedTexts.length; i++) {
    const computedStyle = window.getComputedStyle(editedTexts[i]);
    if (computedStyle.display !== "none") {
      visibleTextareaCount++;
    }
  }

  if (visibleTextareaCount < 2) {
    showAlert("Cannot delete.");
    return;
  }

  let oldText = editedTexts[n].placeholder;

  fetch("php/deleteEntrySingle.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `dataId=${id}&oldText=${oldText}&what=${table}&longNamesIds=${longNamesIds}&shortNamesIds=${shortNamesIds}`, // Fix the body parameter
  })
    .then((response) => response.json())
    .then((result) => {
      // Handle the response from the server
      console.log(result);
      editedTexts[turn].style.display = "none";
      ok[turn].style.display = "none";
      cancel[turn].style.display = "none";
      del[turn].style.display = "none";

      toggleEditMode(id, table); // Use dataId instead of element.definition_id
      // You can perform additional actions here based on the server's response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

function deleteEntry(event) {
  console.log(event);
  let body = "";
  let dataId;
  dataId = event.target.getAttribute("data-id");

  body = `dataId=${dataId}`;

  // Make a POST request to the deleteMe.php file with the data-id in the request body
  fetch("php/deleteMe.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  })
    .then((response) => response.json())
    .then((result) => {
      // Handle the response from the server
      console.log(result);

      document.getElementById("row" + dataId).style.display = "none";

      // You can perform additional actions here based on the server's response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateImg(e) {
  let dataId = e.target.getAttribute("data-id");
  console.log("Button clicked with data-id:", dataId);

  // Create an input element of type file
  let fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");

  // Add event listener for file selection
  fileInput.addEventListener("change", async function (event) {
    let selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile.name);

    // Send the selected file name and data-id to the PHP script using fetch
    let formData = new FormData();
    formData.append("dataId", dataId);
    formData.append("fileName", selectedFile.name);

    try {
      let response = await fetch("php/updatePix.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        let responseData = await response.text();
        console.log("PHP script response:", responseData);
        let img = document.getElementById("img" + dataId);
        img.setAttribute("src", "images/" + selectedFile.name);
      } else {
        console.error("Error sending data to PHP script.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  });

  // Trigger click event on the file input to open the file picker dialog
  fileInput.click();
}

let createButton = (arrClass, id, text, event, func, longId, shortId) => {
  let btn = document.createElement("Button");

  btn.classList.add(...arrClass);
  btn.setAttribute("data-id", id);
  btn.textContent = text;
  btn.addEventListener(event, func);
  if (shortId) {
    btn.setAttribute("data-shortId", shortId);
    btn.setAttribute("data-longId", longId);
  }
  return btn;
};

let editMode = false; // Initialize edit mode state

let makeGrid = (data) => {
  let gridHeader = document.getElementById("gridHeader");

  data.forEach((element) => {
    // console.log("adding...")
    let row = document.createElement("div");
    row.classList.add("row");
    row.id = "row" + element.definition_id;

    let longName = createLongNamesShortNames(
      longNameKlass,
      element.Long_Names,
      "longName",
      element.definition_id,
      element.Long_Names_Ids,
      element.Short_Names_Ids
    );

    let shortName = createLongNamesShortNames(
      shortNameKlass,
      element.Short_Names,
      "shortName",
      element.definition_id,
      element.Long_Names_Ids,
      element.Short_Names_Ids
    );

    //definitions and buttons
    // createLinksAndDef( arrlist, value);

    let definition = createLinksAndDef(
      definitionKlass,
      element.Definition,
      "definition",
      element.definition_id
    );

    // subject

    let sub = createSubsAndThemes(
      subKlass,
      element.Subjects,
      "sub",
      element.definition_id
    );

    // theme

    let theme = createSubsAndThemes(
      themeKlass,
      element.Themes,
      "theme",
      element.definition_id
    );

    // img
    let img = document.createElement("div");
    img.classList.add(...imgKlass);

    let imgimg = document.createElement("img");
    imgimg.classList.add("img-fluid");
    let src = element.img;
    if (src == null) {
      src = "download.jpg";
    }
    imgimg.setAttribute("src", "images/" + src);
    imgimg.id = "img" + element.definition_id;
    imgimg.setAttribute("alt", "Description of the image");
    // console.log(admin)

    img.append(imgimg);

    if (admin == "admin") {
      let br = document.createElement("br"); // Create a <br> element
      img.append(br);

      let arrClass = ["btn", "btn-primary", "btn-sm", "btnImg", "mt-2"];
      let btnImg = createButton(
        arrClass,
        element.definition_id,
        "update img",
        "click",
        updateImg
      );

      img.appendChild(br);
      img.append(btnImg);
    }

    // link and its buttons
    // createLinksAndDef( arrlist, value);

    let link = createLinksAndDef(
      linkKlass,
      element.link,
      "link",
      element.definition_id
    );

    // row.append(longName, shortName, img, sub, theme, definition, link);
    row.append(img, sub, theme, longName, shortName, definition, link);

    gridHeader.appendChild(row);
  });
};
// 3 load values from db
async function getValues() {
  try {
    // Make the fetch request and wait for the response
    const response = await fetch("php/getValues.php");

    // Check if the response was successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the response as JSON and wait for the data
    const data = await response.json();

    // Handle the data received (e.g., display or process it)
    console.log(data);
    makeGrid(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getValues();
