#Mix-Critic

  Mix-Critic is a community of artists, audiophiles, producers, and anyone else interested in helping improve their own work, as well as the work of others.
  https://www.pivotaltracker.com/n/projects/1559045


#Front End

##Services

###Alert
  User alerts are displayed in the `<alerts>` element directive, and can be added via `Alert.add("Alert Text")`


###ApiService
  ApiService provides an easy way to access models from the Back End

####Users
  `ApiService.users.show(userId);`

  `ApiService.users.profile(userId)`

  `ApiService.users.critiques(userId)`

  `ApiService.users.mixes(userId)`


####Mixes
  `ApiService.mixes.index(); //Warning: retrieves all mixes`

  `ApiService.mixes.create(newMix);`

  `ApiService.mixes.show(mixId);`

####Mix Revisions

  `ApiService.revisions.show(id);`


####Mix Critiques
  `ApiService.critiques.index(revisionId);`

  `ApiService.critiques.show(critiqueId);`

  `ApiService.critiques.create(revisionId, newCritique);`


####Mix Critique Comments
  This is currently being updated.

####Genres
  `ApiService.genres.index();`

###Session
  Session is where the current user data can be accessed and modified.

  This is meant to be used in conjunction with the angular-devise authentication module.

####Adding new session data
    ```javascript
    $scope.$on('devise:login', function(event, currentUser) {
        Session.changeSession({
          loggedIn: true,
          user: currentUser
        });
    });
    ```
####Reading Session Data
  You can check to see if you are logged in with `UserService.session.loggedIn`

  Current user model data can be accessed through `UserService.session.user`
