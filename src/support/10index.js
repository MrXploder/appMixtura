(function(angular, undefined) {
'use strict';

angular.module('support', ['ngStorage', 'ngResource', 'angular-loading-bar', 'angularUtils.directives.dirPagination', 'ui.materialize'])

.constant('ENV', {lastCommitNumber:'9',lastCommitAuthor:'"Luis Arancibia"',lastCommitMessage:'"fix\n\n"',lastCommitTime:'"2020-02-17 15:13:42 -0300"',currentUser:'MrXploder',shortSHA:'5cd05f8',SHA:'5cd05f820ade70f0db926380ff90b47291c90695',name:'hotfix/stabilize'})

;
})(angular);