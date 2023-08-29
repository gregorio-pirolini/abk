// alert("hello");


// 1 upload file to upload folder
async function uploadFile() {
  try {
    const formData = new FormData();
    formData.append("file", fileupload.files[0]);

    const response = await fetch("php/upload.php", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const responseText = await response.text();
      const answer = JSON.parse(responseText);
      phpSays.innerHTML = answer.text;
      console.log(`response from php: ${answer.text}, ${answer.location}`);
      loadToDb(answer.location);
      console.log(answer.location);
    } else {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error during file upload:", error);
  }
}
// 2 load to db
async function loadToDb(location) {
  try {
    console.log(`will now upload to db with php`);

    const response = await fetch("php/openFile.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `location=${encodeURIComponent(location)}`,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error("Network response was not OK.");
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

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

//modifyEntry
function modifyEntry(clickedEvent,row) {
  const dataId = clickedEvent.target.getAttribute("data-id");

  // Toggle between view and edit modes
  toggleEditMode(dataId,row);
}

  // Toggle between view and edit modes
  // function toggleEditMode(dataId,row) {
  //   console.log(`${dataId} .${row}`)
  //   editMode = !editMode; // Toggle edit mode state
  
  //   // Use proper selectors to find the view-mode and edit-mode elements
   
  //   let viewMode = document.querySelector(`#row${dataId} .${row} .view-mode`);
  //   //let viewMode = document.querySelector(`#row${dataId} .definition .view-mode`);

  //   let btnToogle = document.querySelector(`#row${dataId} .${row} .btnToogle`);
  //   let btnOk = document.querySelector(`#row${dataId} .${row} .btnOk`);
  //   let btnCancel = document.querySelector(`#row${dataId} .${row} .btnCancel`);
  
  
  //     let textAreaInput = document.querySelector(`#row${dataId} .${row} .edit-mode`);
  //     textAreaInput.classList.toggle("d-none", !editMode);
 

  //   viewMode.classList.toggle("d-none", editMode);
  //   btnToogle.classList.toggle("d-none", editMode);
  //   btnOk.classList.toggle("d-none", !editMode);
  //   btnCancel.classList.toggle("d-none", !editMode);

  // }
  
 // Toggle between view and edit modes
 function toggleEditMode(dataId, row) {
  console.log(`${dataId} .${row}`);
  
  // Use proper selectors to find the view-mode and edit-mode elements
  let viewMode = document.querySelector(`#row${dataId} .${row} .view-mode`);
  let btnToogle = document.querySelector(`#row${dataId} .${row} .btnToogle`);
  let btnOk = document.querySelector(`#row${dataId} .${row} .btnOk`);
  let btnCancel = document.querySelector(`#row${dataId} .${row} .btnCancel`);
  let textAreaInput = document.querySelector(`#row${dataId} .${row} .edit-mode`);

  // Toggle the visibility of elements
  textAreaInput.classList.toggle("d-none");
  viewMode.classList.toggle("d-none");
  btnToogle.classList.toggle("d-none");
  btnOk.classList.toggle("d-none");
  btnCancel.classList.toggle("d-none");

  // Update the editMode state explicitly
  editMode = !textAreaInput.classList.contains("d-none");
}

// Function to save the edited text
function saveEditedText(dataId, table) {
  
  let editedText = document.querySelector(`#row${dataId} .edit-mode`).value.trim();
  // Perform any action needed to save the edited text (e.g., update the server)
  // You can customize this part based on your requirements

  // Make a POST request to the deleteMe.php file with the data-id in the request body
  fetch('php/updateDef.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `dataId=${dataId}&text=${editedText}&what=${table}` // Fix the body parameter
  })
  .then(response => response.json())
  .then(result => {
    // Handle the response from the server
    console.log(result);
    document.querySelector(`#row${dataId} .view-mode`).textContent=editedText;
    toggleEditMode(dataId,table); // Use dataId instead of element.definition_id
    // You can perform additional actions here based on the server's response
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Function to reset the edited text
function resetEditText(dataId) {
  let originalText = document.querySelector(`#row${dataId} .view-mode`).textContent;
  document.querySelector(`#row${dataId} .edit-mode`).value = originalText;
}
// delete entry

function deleteEntry(e) {
  let dataId = e.target.getAttribute("data-id");
  console.log("Button clicked with data-id:", dataId);

  // Make a POST request to the deleteMe.php file with the data-id in the request body
  fetch('php/deleteMe.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `dataId=${dataId}`
  })
  .then(response => response.json())
  .then(result => {
    // Handle the response from the server
    console.log(result);
    console.log(dataId + "hidden?");
    document.getElementById("row"+dataId).style.display = 'none';
    // You can perform additional actions here based on the server's response
  }). catch(error => {
    console.error('Error:', error);
  });
}
let allSubs = [];
let allFachs = [];

function getAllSubFach(subFach) {
    const formData = new FormData();
    formData.append('subFach', subFach);

    return fetch('php/getAllSubFach.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

// Usage example
getAllSubFach("subject")
    .then(subs => {
        console.log(subs);
        allSubs = subs; // Assign the fetched data to the outer array
        // You can process the allSubs array here
    });

getAllSubFach("theme")
    .then(fachs => {
        console.log(fachs);
        allFachs = fachs; // Assign the fetched data to the outer array
        // You can process the allFachs array here
    });
 

// update img

function updateImg(e) {

  let dataId = e.target.getAttribute("data-id");
            console.log("Button clicked with data-id:", dataId);

 // Create an input element of type file
            let fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");

            // Add event listener for file selection
            fileInput.addEventListener("change", async function(event) {
                let selectedFile = event.target.files[0];
                console.log("Selected file:", selectedFile.name);

                // Send the selected file name and data-id to the PHP script using fetch
                let formData = new FormData();
                formData.append("dataId", dataId);
                formData.append("fileName", selectedFile.name);

                try {
                    let response = await fetch("php/updatePix.php", {
                        method: "POST",
                        body: formData
                    });

                    if (response.ok) {
                        let responseData = await response.text();
                        console.log("PHP script response:", responseData);
                        let img= document.getElementById("img"+dataId);
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

let createButton=(arrClass, id, text, event, func)=>{
let btn= document.createElement("Button");
 
 
  btn.classList.add(...arrClass); 
  btn.setAttribute("data-id",  id );
  btn.textContent= text;
  btn.addEventListener(event,func);
return btn
}


let editMode = false; // Initialize edit mode state
//make grid
let  makeGrid=(data) =>{

let gridHeader=document.getElementById("gridHeader")


 data.forEach(element => {
  
// console.log("adding...")
let row = document.createElement("div");
row.classList.add("row");
row.id="row"+element.definition_id;


let longName= document.createElement("div");
longName.classList.add("longName","col-md-2","col-sm-3");
longName.textContent=element.Long_Names;

if(admin=="admin"){


 // class, setAttribute, textContent, event, function
let arrClass=["btn","btn-primary","btn-sm","btnDel", "mt-2"];
let btnDel =  createButton(arrClass, element.definition_id, "delete entry", "click", deleteEntry)
let br = document.createElement("br"); // Create a <br> element
longName.append(br);
longName.append(btnDel);
  }


let shortName= document.createElement("div");
shortName.classList.add("shortName","col-md-1","col-sm-2");
shortName.textContent=element.Short_Names




//definitions
let definition= document.createElement("div");
definition.classList.add("definition","col-md-3","col-sm-5");

let viewMode= document.createElement("div");
viewMode.classList.add("view-mode"); 

viewMode.textContent=element.Definition;
definition.append(viewMode);
if(admin=="admin"){
 
let table= "definition";
  let textArea = document.createElement("textarea");
  textArea.classList.add("edit-mode", "d-none");
  textArea.value = element.Definition;

  let arrClass=["btn", "btn-primary", "btn-sm", "btnToogle", "mt-2"];
  let btnDef = createButton(arrClass, element.definition_id, "modify Entry", "click", function (event) {
    // Reset the text and toggle back to view mode
    modifyEntry(event, table);
  });
  arrClass=["btn", "btn-success", "btn-sm", "btnOk", "d-none", "mt-2"];
  let btnOk = createButton(arrClass, element.definition_id, "OK", "click", function () {
    // Save the edited text and toggle back to view mode
    saveEditedText(element.definition_id, table );
 
  });

  arrClass=["btn", "btn-secondary", "btn-sm", "btnCancel", "d-none", "mt-2", "ms-1"];
  let btnCancel = createButton(arrClass, element.definition_id, "Cancel", "click", function () {
    // Reset the text and toggle back to view mode
    resetEditText(element.definition_id,table);
    toggleEditMode(element.definition_id,table);
  });

 
 

  let br = document.createElement("br");
  definition.append(br);
  definition.append(textArea); // Add the input field for editing
 
  definition.append(btnDef);
  definition.append(btnOk);
  definition.append(btnCancel);
  }





// subject
let sub= document.createElement("div");
sub.classList.add("sub","col-md-1","col-sm-1");
 
viewMode= document.createElement("div");
viewMode.classList.add("view-mode"); 
viewMode.textContent=element.Subjects;
let arrSub=element.Subjects.split(",").map(sub => sub.trim());
sub.append(viewMode);

if(admin=="admin"){
 
  
  let table= "sub";


  let input = document.createElement("input");
  input.classList.add("mt-2");
  input.placeholder = "enter new";

  let arrClass=["btn", "btn-primary", "btn-sm", "btnToogle", "mt-2"];
  let btnSub = createButton(arrClass, element.definition_id, "modify Entry", "click", function (event) {
    // Reset the text and toggle back to view mode
    modifyEntry(event, table);
  });

  arrClass=["btn", "btn-success", "btn-sm", "btnOk", "d-none", "mt-2"];
  let btnOk = createButton(arrClass, element.definition_id, "OK", "click", function () {
    // Save the edited text and toggle back to view mode
    saveEditedText(element.definition_id, table );
 
  })

  arrClass=["btn", "btn-secondary", "btn-sm", "btnCancel", "d-none", "mt-2", "ms-1"];
  let btnCancel = createButton(arrClass, element.definition_id, "Cancel", "click", function () {
    // Reset the text and toggle back to view mode
    resetEditText(element.definition_id, table);
    toggleEditMode(element.definition_id, table);
  });

 
 

  let br = document.createElement("br");

  let subSub= document.createElement("div");
  subSub.classList.add("edit-mode", "d-none");

  sub.append(br);

  let checkboxContainer = document.createElement("div");
  allSubs.forEach(sub => {
    let label = document.createElement('label');
    label.innerHTML = `
    <input type="checkbox" name="subs" value="${sub.subject_id}" ${arrSub.includes(sub.subject_name) ? 'checked' : ''}>
        ${sub.subject_name}
    `;
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement('br'));
});
subSub.append(checkboxContainer);
subSub.append(input); // Add the input field for editing
 
  sub.append(subSub);
  sub.append(btnSub);
  sub.append(btnOk);
  sub.append(btnCancel);
  }





let theme= document.createElement("div");
theme.classList.add("theme","col-md-1","col-sm-1");
theme.textContent=element.Themes;

let img= document.createElement("div");
img.classList.add("img","col-md-4","col-sm-6");

let imgimg = document.createElement("img");
imgimg.classList.add("img-fluid");
let src=element.img;
if(src==null){src="download.jpg";}
imgimg.setAttribute("src", "images/"+src);
imgimg.id="img"+element.definition_id;
imgimg.setAttribute("alt", "Description of the image");
// console.log(admin)


img.append(imgimg);

if(admin=="admin"){



let arrClass=["btn", "btn-primary", "btn-sm", "btnImg", "mt-2"];
let btnImg = createButton(arrClass, element.definition_id, "update img", "click", updateImg);
let br = document.createElement("br"); // Create a <br> element

img.appendChild(br); 
 
  img.append(btnImg);
  }


let link= document.createElement("div");
link.classList.add("link","col-md-12","col-sm-6");
link.textContent=element.link;

row.append(longName, shortName, definition, sub, theme, img,link);
gridHeader.appendChild(row);

  });
}
// what do you want  to do?
function checkPageTitle() {
  // Get the current page title
  let pageTitle = document.title.toLowerCase();
console.log(pageTitle)
   switch (pageTitle) {
    case "abkürzungen": 
    getValues();
      break;
   
    default:
      break;
   }
}

// Call the function to check the page title
checkPageTitle();

const searchInput = document.querySelector('.form-control.me-2');
    
    function setPlaceholderByScreenSize() {
      if (window.matchMedia('(max-width: 575.98px)').matches) {
        searchInput.placeholder = 'Search on XS screens';
      } else if (window.matchMedia('(max-width: 767.98px)').matches) {
        searchInput.placeholder = 'Search on SM screens';
      } else if (window.matchMedia('(max-width: 991.98px)').matches) {
        searchInput.placeholder = 'Search on MD screens';
      } else if (window.matchMedia('(max-width: 1199.98px)').matches) {
        searchInput.placeholder = 'Search on LG screens';
      } else if (window.matchMedia('(max-width: 1399.98px)').matches) {
        searchInput.placeholder = 'Search on XL screens';
      } else {
        searchInput.placeholder = 'Search on XXL screens';
      }
    }
    
    // Initial call
    setPlaceholderByScreenSize();
let $user = "";
let $id = "";
let admin=""

    let getUserInfo = () => {
      fetch("php/getuserinfo.php")
        .then((res) => res.json())
        .then((d) => {
          // console.log(d);
          const greetings = findGreetings();
          const hello = document.getElementById("hello");
          hello.innerText = greetings + " " + d.user;
          admin = (d.id === 3) ? "admin" : "notAdmin";
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

    getUserInfo();
    // Call again when the window is resized
    window.addEventListener('resize', setPlaceholderByScreenSize);