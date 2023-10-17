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
