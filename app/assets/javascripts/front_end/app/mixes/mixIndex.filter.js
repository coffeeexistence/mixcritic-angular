function mixIndex(){
  return function(mixesArray, search){

    if (mixesArray && search){

      var match = function(search, variable){
        return variable == search || !search;
      };

      return mixesArray.filter(function(mix){

        return (
          match(search.genre_id, mix.genre.id)
          &&
          (
            mix.title.toLowerCase().indexOf(search.stringQuery.toLowerCase()) >= 0
            ||
            mix.description.toLowerCase().indexOf(search.stringQuery.toLowerCase()) >= 0
          )
        );

      });

    } else {
      return mixesArray;
    }

  };
}

angular
    .module('app')
    .filter('mixIndex', mixIndex);
