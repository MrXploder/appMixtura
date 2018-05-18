<?php require $_SERVER['DOCUMENT_ROOT'].'/php/enviroment.php'; ?>
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
  if(constant("envDebug") == "development"){
    $globsJS = ["{/src/vendor/*.js}", "{/src/support/*.js}", "{/src/directives/**/*.js}", "{/src/filters/**/*.js}", "{/src/factories/**/*.js}", "{/src/support/tab/**/*.js}", "{/src/support/modal/**/*.js}"];

    $files = glob("{/css/*.css}",GLOB_BRACE);
    for($i = 0; $i < count($files); $i++){
      echo '<link rel="stylesheet" href="..'.$files[$i].'?v='.constant("envSHA").'">', PHP_EOL;
    }
    unset($i);

    foreach($globsJS as $glob){
      $files = glob($glob,GLOB_BRACE);
      for($i = 0; $i < count($files); $i++){
        echo '<script src="..'.$files[$i].'?v='.constant("envSHA").'"></script>', PHP_EOL;
      }
      unset($i);
    }
  }
  else if(constant("envDebug") == "production"){
    echo '<link rel="stylesheet" href="../dist/'.constant('envSHA').'.min.css">', PHP_EOL;
    echo '<script src="../dist/'.constant('envSHA').'.min.obs.js"></script>', PHP_EOL;
  }
  ?>
  <script src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>
  <header>
    <ul id="slide-out" class="side-nav fixed">
      <li class="center-align"><img src="img/support-logo.png"></li>
      <li><a href="#!"><i class="fas fa-ticket-alt"></i> Crear Ticket</a></li>
      <li><a href="#!/viewTickets"><i class="fas fa-search"></i> Administrar Tickets</a></li>
    </ul>
    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
  </header>
  <main>
    <div class="row">
      <div class="col l12">
        <ng-view></ng-view>
      </div>
    </div>
  </main>
  <footer class="page-footer footer grey darken-3">
    <div class="container">
      <div class="footer-copyright grey darken-3">
        <div class="container">
          <a href="mailto: l.arancibiaf@gmail.com">© <?php echo constant("envAuthor") ?> AngularJS Dev</a>
          <a class="grey-text text-lighten-4 right" href="#!">Compilación: <?php echo constant("envShortSHA") ?></a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>