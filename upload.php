<?php include 'header.php'; ?>
  <h1 id="hello">Abkürzungen!!</h1>
   <h2>Abkürzungen hochladen!!</h2>
     <div class="row">
      <div class="col-sm mb-3 ">
        <label class="form-label" for="customFile"> 1 Upload one file:</label>
          <input id="fileupload" class="form-control" type="file" name="fileupload" />
        </div>
        <div class="row">
        <div class="col-sm">
          <button id="upload-button" onclick="uploadFile()" class="btn btn-primary">Upload</button>
          </div>
          <p id="response">response: <span id="phpSays"> * span * </span></p>
          </div>
          </div>
    
       
    
         
        </div>
   
        <?php include 'footer.php'; ?>