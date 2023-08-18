<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Favicon -->
   
   <?php include 'favicons.php'; ?>
   
    <!-- css -->
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
    crossorigin="anonymous"
  />
  <?php
    $random = time() ;
    echo
    "<script src='js/script.js?v=1.".$random."' defer></script>
    <link rel='stylesheet' href='sass/style.css?v=1.".$random."' />
    ";
    ?>
     
    <title>Document</title>
  </head>
  <body>
    <div class="container">
      <!-- nav -->
    <?php include 'nav.php'; ?>
    
        
        <h1 id="hello">Abkürzungen!!</h1>
        
     
    
       
       
          <h2>Abkürzungen hochladen!!</h2>
       
          <div class="row">
        <div class="col-sm mb-3 ">
        <label class="form-label" for="customFile"> 1 Upload one file:</label>
        <input id="fileupload" class="form-control" type="file" name="fileupload" />
        </div>
        <div class="row">
        <div class="col-sm">
          <button id="upload-button" onclick="uploadFile()" class="btn btn-primary"">Upload</button>
          </div>
          <p id="response">response: <span id="phpSays"> * span * </span></p>
          </div>
          </div>
    
       
    
         
        </div>
   

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
