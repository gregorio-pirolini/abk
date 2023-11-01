<?php include 'header.php'; ?>



<h1 id="hello">New Abkurzung!!</h1>

<h2>Abkürzungen adden!!</h2>

<div class="row">
  <form action="" id="myForm" class="row needs-validation" novalidate>

    <div class="col-md-8 col-sm-12">
      <label for="longName" class="form-label">Long Name:</label>
      <input type="text" id="longName" name="longName" class="form-control" aria-label="Long Name input" required
        aria-describedby="longNameHelp">
      <div class="personal-feedback">personal message</div>
      <div class="valid-feedback">looks good!</div>
      <div class="invalid-feedback">please check last name</div>
      <small id="longNamelHelp" class="form-text text-muted">We'll never share your name with anyone else.</small>
    </div>

    <div class="col-md-4 col-sm-12">
      <label for="shortName" class="form-label">Short Name:</label>
      <input type="text" id="shortName" name="shortName" class="form-control" aria-label="short Name input" required
        aria-describedby="shortNameHelp">
      <div class="personal-feedback">personal message</div>
      <div class="valid-feedback">looks good!</div>
      <div class="invalid-feedback">please check first name</div>
      <small id="shortNameHelp" class="form-text text-muted">We'll never share your first name with anyone else.</small>
    </div>


    <div class="col-sm-12">
      <label for="def" class="form-label">Definition:</label>
      <textarea id="def" name="def" class="form-control" aria-label="Definition input"
        aria-describedby="defHelp"></textarea>
      <div class="personal-feedback">personal message</div>
      <div class="valid-feedback">looks good!</div>
      <div class="invalid-feedback">please check def</div>
      <small id="defHelp" class="form-text text-muted">We'll never share your def with anyone else.</small>
    </div>

    <div class="col-sm-12 ">
      <label for="link" class="form-label">Link:</label>
      <input type="url" id="link" name="link" class="form-control" aria-label="Link input" aria-describedby="linkHelp"
        pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?">
      <div class="personal-feedback">personal message</div>
      <div class="valid-feedback">looks good!</div>
      <div class="invalid-feedback">please check link</div>
      <small id="linkHelp" class="form-text text-muted">We'll never share your link with anyone else.</small>
    </div>






    <div id="aT" class="col-md-6 col-sm-12 mt-1">
      <label class="bigger">Themes:</label>
      <fieldset id="fieldAT" class="checkbox-container" aria-label="Select Themes" aria-describedby="checkboxThemesHelp">

      </fieldset>
      <div class="personal-feedback">personal message</div>
      <div class="greg-valid-feedback d-none">looks good!</div>
      <div class="greg-invalid-feedback d-none">please check def</div>
      <small id="checkboxThemesHelp" class="form-text text-muted">We'll never share your Themes with anyone
        else.</small>
      <button id='resetThemes' class="btn btn-primary mt-2" aria-label="Reset Themes">reset Themes</button>

    </div>

    <div id="aS" class="col-md-6 col-sm-12  mt-1">
      <label class="bigger">Subjects:</label>
      <fieldset id="fieldAS" class="checkbox-container" aria-label="Select Subjects" aria-describedby="checkboxSubjectsHelp">

      </fieldset>
      <div class="personal-feedback">personal message</div>
      <div class="greg-valid-feedback d-none">looks good!</div>
      <div class="greg-invalid-feedback d-none">please check def</div>
      <small id="checkboxSubjectsHelp" class="form-text text-muted">We'll never share your Subjects with anyone
        else.</small>
      <button id="resetSubjects" class="btn btn-primary mt-2" aria-label="Reset Subjects">reset
        Subjects</button>

    </div>
    <!-- New Theme input -->
    <div id="aTNew" class="col-md-6 col-sm-12 mt-1">
      <label for="theme" class="form-label">New Theme:</label>
      <input type="text" id="theme" name="theme" class="form-control" aria-label="Select new Theme"
        aria-describedby="newThemeHelp">
      <div class="personal-feedback">personal message</div>
      <div class="valid-feedback">looks good!</div>
      <div class="invalid-feedback">please check def</div>

      <small id="newThemeHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      <button id="addNewTheme" class="btn btn-primary mt-2">add new Theme</button>
      <br>
    </div>


    <!-- test -->
    <!-- 
    <div class="form-group">
      <label for="inputField">Field Label 1</label>
      <input type="text" class="form-control is-invalid" id="inputField" name="inputField">
      <div class="invalid-feedback">Error message goes here.</div>
    </div>
    <hr>
    <div class="alert alert-danger" role="alert">
      There was an error with your submission. Please correct the following issues:
      <ul>
        <li>Error 1: Description of the first error.</li>
        <li>Error 2: Description of the second error.</li>
      </ul>
    </div>
    <hr>
    <div class="form-group">
      <label for="inputField">Field Label</label>
      <input type="text" class="form-control is-invalid" id="inputField" name="inputField" data-toggle="tooltip"
        title="Error message goes here.">
    </div> -->


    <!-- New Subject input -->
    <div id="aSNew" class="col-md-6 col-sm-12 mt-1">
      <label for="subject" class="form-label">New Subject:</label>
      <input type="text" id="subject" name="subject" class="form-control" aria-label="Select new Subject"
        aria-describedby="newSubjectHelp">
      <div class="personal-feedback">personal message</div>
      <div class="valid-feedback">looks good!</div>
      <div class="invalid-feedback">please check def</div>
      <small id="newSubjectHelp" class="form-text text-muted">We'll never share your new Subject with anyone
        else.</small>
      <button id="addNewSubject" class="btn btn-primary mt-2">add new Subject</button>

      <br>
    </div>

    <!-- Image upload field -->
    <div class="col-md-12 mt-2" id="images">
      <label for="image" class="form-label">Upload Image:</label>
      <input type="file" id="image" name="image" class="form-control">
      <div class="personal-feedback">personal message</div>
      <div class="valid-feedback">looks good!</div>
      <div class="invalid-feedback">please check def</div>
      <small id="newPictureHelp" class="form-text text-muted">Choose a new picture on select</small>
      <button id="resetImage" class="btn btn-primary mt-2" aria-label="Reset Image">Reset image</button>
      <small id="resetImageHelp" class="form-text text-muted">Click here to remove the picture</small>


      <div id="imagePreview" class="mb-3"><span class="preview">image preview:</span>
        <img src="images/download.jpg" alt="the Picture">
      </div>
      <p id="imageLink"> imageLinkimageLinkimageLinkimageLinkimageLink
</p>
    </div>

    <div class="alert alert-success d-none " role="alert" id="success-alert">
      Your form was successfully submitted! Thank you.
    </div>
    <div class="alert alert-danger d-none" role="alert" id="error-alert">
      An error occurred while submitting the form. Please try again.
    </div>

    <div class="col-md-12">

      <small id="allFormHelp" class="form-text text-muted">Click the "Submit" button to send the form.</small>
      <button id="uploadMe" type="submit" class="btn btn-success btn-md mt-2" value="submit"
        aria-label="Submit Button">Submit</button>
      <button class="btn btn-primary mt-2" id="resetMe" aria-label="Reset Button">Reset</button>
      <small id="allResetHelp" class="form-text text-muted">Click the "Reset" button to reset the form.</small>


    </div>

  </form>


</div><!--  row -->


<?php include 'footer.php'; ?>