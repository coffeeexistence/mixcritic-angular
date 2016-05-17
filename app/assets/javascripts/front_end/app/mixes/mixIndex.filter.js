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
            mix.title.toLowerCase().includes(search.stringQuery.toLowerCase())
            ||
            mix.description.toLowerCase().includes(search.stringQuery.toLowerCase())
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
