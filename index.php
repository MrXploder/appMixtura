<?php require $_SERVER['DOCUMENT_ROOT'].'/php/functions/versionControll.php'; ?>
<!DOCTYPE html>
<html ng-app="support" ng-strict-di ng-cloak>
<head>
  <title>supportApp</title>
  <!--META-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <!--NOSCRIPT-->
  <noscript><meta http-equiv="Refresh" content="0; URL=./nojs.html"></noscript>
  <link rel="manifest" href="../manifest.json">
  <!--No descuidar el orden de los archivos CCS y JS-->
  <!--CSS DEPENDENCIES-->
  <?php
  $files = glob("{/css/*.css}",GLOB_BRACE);
  for($i = 0; $i < count($files); $i++){
    echo '<link rel="stylesheet" href="..'.$files[$i].'?v='.$versionControll.'">', PHP_EOL;
  }
  unset($i);

  $files = glob("{/src/vendor/*.js}",GLOB_BRACE);
  for($i = 0; $i < count($files); $i++){
    echo '<script src="..'.$files[$i].'?v='.$versionControll.'"></script>', PHP_EOL;
  }
  unset($i);

  $files = glob("{/src/support/*.js}",GLOB_BRACE);
  for($i = 0; $i < count($files); $i++){
    echo '<script src="..'.$files[$i].'?v='.$versionControll.'"></script>', PHP_EOL;
  }
  unset($i);

  $files = glob("{/src/directives/**/*.js}",GLOB_BRACE);
  for($i = 0; $i < count($files); $i++){
    echo '<script src="..'.$files[$i].'?v='.$versionControll.'"></script>', PHP_EOL;
  }
  unset($i);

  $files = glob("{/src/factories/**/*.js}",GLOB_BRACE);
  for($i = 0; $i < count($files); $i++){
    echo '<script src="..'.$files[$i].'?v='.$versionControll.'"></script>', PHP_EOL;
  }
  unset($i);

  $files = glob("{/src/support/tab/**/*.js}",GLOB_BRACE);
  for($i = 0; $i < count($files); $i++){
    echo '<script src="..'.$files[$i].'?v='.$versionControll.'"></script>', PHP_EOL;
  }
  unset($i);

  $files = glob("{/src/support/modal/**/*.js}",GLOB_BRACE);
  for($i = 0; $i < count($files); $i++){
    echo '<script src="..'.$files[$i].'?v='.$versionControll.'"></script>', PHP_EOL;
  }
  unset($i);
  ?>
</head>
<body>
  <header>
    <div class="navbar">
      <nav class="white">
        <div class="nav-wrapper">
          <a href="#"><img src="../img/mixtura-logo.png" style="width: 150px; height: 63px"></img></a>
        </div>
      </nav>
    </div>
  </header>
  <main>
    <div class="container">
      <div class="row">
        <div class="col s12 m12 l12">
          <ul class="collapsible popout" data-collapsible="accordion" watch>
            <!-- START - ADMINISTRAR TICKETS-->
            <li ng-include="'/src/support/tab/viewTickets/template.html?v=<?php echo $versionControll ?>'" ng-controller="viewTickets as vt"></li>
          </ul>
        </div>
      </div>
    </div>
  </main>
  <footer class="page-footer footer grey darken-3">
    <div class="container">
      <div class="footer-copyright grey darken-3">
        <div class="container">
          <a href="mailto: l.arancibiaf@gmail.com">© MrXploder AngularJS Dev</a>
          <a class="grey-text text-lighten-4 right" href="#!">Compilación: <?php echo $versionControll ?></a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>












