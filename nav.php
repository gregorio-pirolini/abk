<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand <?php if ($filename == "abk.php")
      echo "active" ?>" href="abk.php">ABK</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link <?php if (stripos($filename, "index.") !== false)
      echo "active" ?>" href="index.php">Home</a>
          </li>

          <li class="nav-item">
            <a class="nav-link <?php if (stripos($filename, "todo.") !== false)
      echo "active" ?>" href="todo.php">TO DO</a>
          </li>

          <li class="nav-item">
            <a class="nav-link <?php if (stripos($filename, "test.") !== false)
      echo "active" ?>" href="test.php">Test</a>
          </li>

        <?php if ($userId == 3) { ?>
          <li class="nav-item">
            <a class="nav-link <?php if (stripos($filename, "upload.") !== false)
              echo "active" ?>" href="upload.php">upload</a>
            </li>
            <li class="nav-item">
              <a class="nav-link <?php if (stripos($filename, "new.") !== false)
              echo "active" ?>" href="new.php">new</a>
            </li>
        <?php } ?>


        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle <?php if ((stripos($filename, "drop1.") !== false) || (stripos($filename, "drop2.") !== false)) {
            echo "active";
          } ?>" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            drop
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item <?php if (stripos($filename, "drop1.") !== false)
              echo "active" ?>" href="drop1.php">drop 1</a>
              </li>
              <li><a class="dropdown-item <?php if (stripos($filename, "drop2.") !== false)
              echo "active" ?>" href="drop2.php">drop 2</a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" href="#">Something else here</a>
              </li>

            </ul>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="signout.php" data-class="signout">sign out</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>

        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>