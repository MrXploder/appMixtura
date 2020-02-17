<?php require $_SERVER['DOCUMENT_ROOT'] . '/app'  . '/php/enviroment.php'; ?>
<!DOCTYPE html>
<html ng-app="angularApp" ng-controller="mainController as mc" ng-strict-di>

<head>
  <title>supportApp</title>
  <!--META-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <base href="http://www.tecnomixtura.cl/" target="_blank">
  <!--NOSCRIPT-->
  <noscript>
    <meta http-equiv="Refresh" content="0; URL=./nojs.html">
  </noscript>
  <link rel="manifest" href="../manifest.json">
  <!--No descuidar el orden de los archivos CCS y JS-->
  <!--CSS DEPENDENCIES-->
  <?php
  if (constant("envBranch") == "development") {
    $globsJS = ["{/src/vendor/*.js}", "{/src/module/support/*.js}", "{/src/directive/**/*.js}", "{/src/filter/**/*.js}", "{/src/factory/**/*.js}", "{/src/module/support/route/**/*.js}", "{/src/module/support/modal/**/*.js}"];

    $files = glob("{/css/*.css}", GLOB_BRACE);
    for ($i = 0; $i < count($files); $i++) {
      echo '<link rel="stylesheet" href="..' . $files[$i] . '?v=' . constant("envSHA") . '">', PHP_EOL;
    }
    unset($i);

    foreach ($globsJS as $glob) {
      $files = glob($glob, GLOB_BRACE);
      for ($i = 0; $i < count($files); $i++) {
        echo '<script src="..' . $files[$i] . '?v=' . constant("envSHA") . '"></script>', PHP_EOL;
      }
      unset($i);
    }
  } else if (constant("envBranch") == "master") {
    echo '<link rel="stylesheet" href="../dist/' . constant('envSHA') . '.min.css">', PHP_EOL;
    echo '<script src="../dist/' . constant('envSHA') . '.min.obs.js"></script>', PHP_EOL;
  }
  ?>
  <!--<script src='https://www.google.com/recaptcha/api.js'></script>-->
</head>

<body>
  <header>
    <ul id="login-side-nav" class="side-nav fixed">
      <li>
        <div class="user-view grey darken-3">
          <a><img class="circle" src="img/default-avatar.png"></a>
          <br>
        </div>
      </li>
      <ng-form name="lg">
        <li>
          <div input-field class="container row">
            <i class="fas fa-user-tie prefix"></i>
            <label for="userName" class="active">Nombre de Usuario</label>
            <input type="text" id="userName" ng-model="mc.form.name" required>
          </div>
        </li>
        <li>
          <div input-field class="container row">
            <i class="fas fa-key prefix"></i>
            <label for="userPass" class="active">Contraseña</label>
            <input type="password" id="userPass" ng-model="mc.form.pass" required>
          </div>
        </li>
        <li>
          <div class="container">
            <a class="btn waves-effect waves-light blue" ng-click="mc.logIn()" ng-disabled="!lg.$valid">LogIn</a>
          </div>
        </li>
      </ng-form>
    </ul>
    <ul id="apps-side-nav" class="side-nav fixed grey darken-4">
      <li>
        <div class="user-view">
          <div class="background">
            <img src="img/sidenav-background.jpg">
          </div>
          <a><img class="circle center" ng-src="img/avatar{{$storage.currentUser.avatar}}.png"></a>
          <br>
        </div>
      </li>
      <li><a href="#!/createTickets" class="white-text"><i class="fas fa-ticket-alt white-text"></i>Crear Tickets</a></li>
      <li><a href="#!/viewTickets" class="white-text"><i class="fas fa-toolbox white-text"></i>Administrar Tickets</a></li>
      <li><a href="#!/billTickets" class="white-text"><i class="fas fa-money-bill-alt white-text"></i>Facturar Tickets</a></li>
      <li>
        <div class="divider"></div>
      </li>
      <li><a href="#!/exit" class="white-text"><i class="fas fa-search white-text"></i>LogOut</a></li>
    </ul>
    <a class="btn-floating btn-large btn-flat waves-effect waves-light button-collapse hide-on-med-and-up" data-activates="apps-side-nav"><i class="fas fa-plus"></i></a>

  </header>
  <main>
    <div class="row">
      <div class="col l12 s12">
        <ng-include src="'/src/module/support/include/loader/template.html'" ng-show="mc.isRouteLoading"></ng-include>
        <ng-view ng-show="!mc.isRouteLoading"></ng-view>
      </div>
    </div>
  </main>
  <footer class="footer grey darken-3" style="padding-top: 10px; padding-bottom: 10px;">
    <div class="container">
      <div class="footer-copyright grey darken-3 right">
        <a class="grey-text text-lighten-4" href="mailto: l.arancibiaf@gmail.com">© <?php echo constant("envAuthor") ?> AngularJS Dev</a><br>
        <a class="grey-text text-lighten-4" href="#!/">Compilación: <?php echo constant("envShortSHA") ?></a><br>
        <a class="gre-text text-lighten-4" href="#!/">Modo: <?php echo constant("envBranch") ?></a>
      </div>
    </div>
  </footer>
</body>

</html>