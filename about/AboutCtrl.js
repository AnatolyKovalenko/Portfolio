(function () {
  'use strict';

  app
    .controller('AboutCtrl',aboutCtrl);

  function aboutCtrl($scope, $document) {

    $scope.show = false;
    $scope.toggle = function() {
      $document.scrollToElement(document.getElementById('scrollView'), 0, 1300);
      $scope.show = !$scope.show;
    };

    var audio = document.getElementById('audio'),
        playbtn = document.getElementById("playpausebtn"),
        AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext,
        ctx = new AudioContext(),
        analyser = ctx.createAnalyser(),
        audioSrc = ctx.createMediaElementSource(audio),
        frequencyData = new Uint8Array(analyser.frequencyBinCount),
        canvas = document.getElementById('soundWave'),
        cwidth = (canvas.width = window.innerWidth -15), 
        cheight = canvas.height,
        meterWidth = 2, 
        gap = 2, 
        capHeight = 2,
        capStyle = '#fff',
        meterNum = cwidth, 
        capYPositionArray = [];
    
    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);
    ctx = canvas.getContext('2d');

    var gradient = ctx.createLinearGradient(0, 0, 0, 300);

    gradient.addColorStop(1, '#000');
    gradient.addColorStop(0.3, '#b2b2b2');
    gradient.addColorStop(1, '#fff');

    function renderFrame() {
      var array = new Uint8Array(analyser.frequencyBinCount),
          step = Math.round(array.length / meterNum); 

      analyser.getByteFrequencyData(array);
      ctx.clearRect(0, 0, cwidth, cheight);

      for (var i = 0; i < meterNum; i++) {
        var value = array[i * step];

        if(capYPositionArray.length < Math.round(meterNum)) {
          capYPositionArray.push(value);
        }

        ctx.fillStyle = capStyle;
           
        if(value < capYPositionArray[i]) {
          ctx.fillRect(i * 4, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
        } else {
          ctx.fillRect(i * 4, cheight - value, meterWidth, capHeight);
          capYPositionArray[i] = value;
        }

        ctx.fillStyle = gradient; 
        ctx.fillRect(i * 4, cheight - value + capHeight, meterWidth, cheight); 
      }

      requestAnimationFrame(renderFrame);
    }

    function playPause() {
      if(audio.paused) {
        audio.play();
        playbtn.style.background = "url(../../assets/img/pause.png) center no-repeat";
        playbtn.style.backgroundSize = "100px auto";
      } else {
        audio.pause();
        playbtn.style.background = "url(../../assets/img/play.png) center no-repeat";
        playbtn.style.backgroundSize = "100px auto";
      }
    }
    
    playbtn.addEventListener("click",playPause);
    renderFrame();
    audio.loop = true;
    audio.play();
  }

})();