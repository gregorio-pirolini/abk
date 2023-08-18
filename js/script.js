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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function checkPageTitle() {
  // Get the current page title
  let pageTitle = document.title;

  // Compare the page title with "index" (case-insensitive)
  if (pageTitle.toLowerCase() === "index") {
    // The page title is "index"
    console.log('Page title is "index"');
    // Do something here, e.g., call a function or perform specific actions
    // Call the function to fetch and display the data
    getValues();
  } else {
    // The page title is not "index"
    console.log('Page title is not "index"');
    // Do something else or just ignore this case
  }
}

// Call the function to check the page title
checkPageTitle();
