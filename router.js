app
  .config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider  
    .otherwise("/about");

  $stateProvider
      .state('about', {
        url: "/about",
        templateUrl: "about/AboutView.html",
        controller: 'AboutCtrl'
      })
      .state('about.skills', {
        url: "/skills",
        templateUrl: "about/skills/SkillsView.html",
        controller: 'SkillsCtrl'
      })
      .state('projects', {
        url: "/projects",
        templateUrl: "projects/ProjectsView.html",
        controller: "ProjectsCtrl"
      })
      .state('connect', {
        url: "/connect",
        templateUrl: "connect/ConnectView.html",
        controller: "ConnectCtrl"
      });
  });
