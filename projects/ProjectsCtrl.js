(function () {
  'use strict';

  app
    .controller('ProjectsCtrl', projectsCtrl);

  function projectsCtrl() {
    var phone = document.getElementById("phone_1"),
        iframe = document.getElementById("frame_1"),
        phones = document.getElementById("phones"),
        views = document.getElementById("views"),
        phone_width,
        phone_height;

    function updateView(view) {
      if (view) {
        phone.className = "phone view_" + view;
      }
    }

    views.addEventListener("click", function(evt) {
      updateView(evt.target.value);
    });

    phones.addEventListener("click", function(evt) {      
      switch(parseInt(evt.target.value)) {
        case 1:
          phone_width = 375;
          phone_height = 667;
        break;

        case 2:
          phone_width = 400;
          phone_height = 640;
        break; 
        
        case 3:
          phone_width = 320;
          phone_height = 480;
        break;
        
        case 4:
          phone_width = 360;
          phone_height = 640; 
        break;

        case 5:
          phone_width = 768;
          phone_height = 1024;
        break;
      }

    phone.style.width = phone_width + "px";
    phone.style.height = phone_height + "px"; 
    
    });

    if (iframe.attachEvent) {
      iframe.attachEvent("onload", function() {
        afterLoading();
      });
    } else {
      iframe.onload = function() {
        afterLoading();
      };
    }

    function afterLoading() {
      setTimeout(function() {
        phone.className = "phone view_1";
        setTimeout(function() {
          phone.className = "phone view_1 rotate";
        }, 1000);
      }, 1000);
    }

  }
    
})();