app.directive("showTranslator", function() {
   return {
       restrict: 'AE', //restrict to attribute, element
       templateUrl: './js/directives/show_translator.html', //relative to index.html
       //template: '<div><div class="media-left media-middle"><img class="media-object img-thumbnail" ng-src="./images/ava1.png" alt="Translator"></div><div class="media-body"><h3 class="media-heading">{{translator.firstName}}&nbsp;{{translator.lastName}}</h3><h4>Language combination</h4><ul><li ng-repeat="comb in translator.language_combination">from &nbsp;{{comb.source}}&nbsp; to {{comb.target}}</li></ul><h4>Specialization:</h4><ul><li ng-repeat="spec in translator.specialization">{{spec}}</li></ul></div></div>',
       replace: true
   }
});