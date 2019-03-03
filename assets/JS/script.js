var basketApp = angular.module('basketApp', ['ngRoute']);

basketApp.config(['$routeProvider', function($routeProvider) {
  // Système de routage
  $routeProvider
  .when('/presentation.html', {
    templateUrl: 'views/presentation.html',
    controller: 'basketApp'
  })
  .when('/formations.html', {
    templateUrl: 'views/formations.html',
    controller: 'basketApp'
  })
  .when('/experiences.html', {
    templateUrl: 'views/experiences.html',
    controller: 'basketApp',
  })
  .when('/realisations.html', {
    templateUrl: 'views/realisations.html',
    controller: 'basketApp',
  })
  .when('/loisirs.html', {
    templateUrl: 'views/loisirs.html',
    controller: 'basketApp',
  })
  .when('/contacts.html', {
    templateUrl: 'views/contacts.html',
    controller: 'basketApp',
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

basketApp.controller('basketApp', function($scope, $http){
  $http.get('assets/JS/example.json').then(function(res){
    $scope.examples = res.data;
  });
  $scope.subTotal = 0; //Déclaration de la variable de sous-total à 0.
  $scope.basket = []; //Déclaration du panier vide.
  $scope.total = 0; //Déclaration du total à 0.
  $scope.count = 0; //Déclaration du compteur d'objet à 0

  // Fonction "ajouter au panier" lié au bouton de chaques articles.
  $scope.addBasket = function(id){
    // Ici nous déclarons les variables présent dans le Json
    $scope.name = $scope.examples[id].name;
    $scope.price = $scope.examples[id].price;
    $scope.image = $scope.examples[id].image;
    $scope.desc = $scope.examples[id].desc;
    $scope.ref = $scope.examples[id].ref;
    $scope.category = $scope.examples[id].category;
    // Vérification de la présence d'un article.
    function found(product){
      return product.name === $scope.examples[id].name;
    }
    // Je recherche si l'article sur lequel j'ai cliqué est déjà dans le panier.
    // Si c'est le cas j'ajoute de la quantité au clic et j'incrémante mon compteur.
    if($scope.basket.find(found)){
      for(var i=0; i < $scope.examples.length; i++){
        if($scope.basket[i].name === $scope.examples[id].name){
          $scope.basket[i].subTotal += $scope.examples[id].price;
          $scope.total += $scope.examples[id].price;
          $scope.basket[i].quantity ++;
          $scope.count ++;
        }}
        // Sinon je push, je recalcul le total et j'incrémante mon compteur.
      }else{
        $scope.basket.push({name: $scope.name, price: $scope.price, quantity: 1, subTotal: $scope.price, image: $scope.image, desc: $scope.desc, ref: $scope.ref, category: $scope.category });
        var basketIndex = $scope.basket.length -1;
        $scope.total += $scope.basket[basketIndex].price;
        $scope.count ++;
        // }
      }
    };
    // Fonction qui ajoute de la quantité au clic du bouton + dans la modale. Comme d'hab je recalcul et j'incrémante.
    $scope.addQuantity = function(id){
      $scope.basket[id].quantity ++;
      $scope.basket[id].subTotal += $scope.basket[id].price;
      $scope.total += $scope.basket[id].price;
      $scope.count ++;
    };
    // fonction qui enlève de la quantité au clic sur le bouton -. Blala calcul, blabla incremantation compteur.
    $scope.deleteQuantity = function(id){
      $scope.basket[id].quantity --;
      $scope.basket[id].subTotal -= $scope.basket[id].price;
      $scope.total -= $scope.basket[id].price;
      $scope.count --;
      // Ici je dis que si la quantité est égale à 0, je supprime la ligne. Le recalcul est pris en compte au dessus.
      if($scope.basket[id].quantity == 0){
        $scope.basket.splice(id, 1);
      }
    };
    //Fonction qui permet de supprimer la ligne au clic sur le bouton X. Je recalcul mon total aprés coup.
    $scope.remove = function(id) {
      $scope.total -= $scope.basket[id].price * $scope.basket[id].quantity;
      $scope.count -= $scope.basket[id].quantity; // Je déduit la quantité de la ligne au compteur quand je la supprime.
      $scope.basket.splice(id, 1);
    };
    //Francky
    /* CATÉGORIES DANS LA NAVBAR */

  });
