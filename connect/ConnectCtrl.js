(function () {
	'use strict';

	app
		.controller('ConnectCtrl', connectCtrl);

	function connectCtrl ($scope, $timeout){
		var star_color = ["#ffffff", "#ffe9c4", "#d4fbff","#a7ffdc"],
				space_height = window.innerHeight, 
				space_width = window.innerWidth; 

		function random (min, max) {
			return Math.round((Math.random() * max - min) + min);
		}

		function star_field (context, star_number) {
			var x_position, 
					y_position, 
					star_bright, 
					star_radius; 

			context.fillStyle = "#000";
			context.fillRect(0, 0, space_width, space_height);
			context.save();
		
			for (var i = 0; i < star_number; i++) {
				x_position = Math.random() * space_width; 
				y_position = Math.random() * space_height; 
				star_radius = Math.random() * 1.5;
				star_bright = random(80, 100) / 100;

				context.beginPath();
				context.globalAlpha = star_bright;
				context.fillStyle = star_color[random(0, star_color.length)];
				context.arc(x_position, y_position, star_radius, 0, Math.PI * 2, true);
				context.fill();
				context.closePath();
			}

			context.restore();
		}

		function init () {
			var canvas = document.getElementsByTagName('canvas')[0],
					context = canvas.getContext('2d');
			
			canvas.width = space_width;
			canvas.height = space_height;

			star_field(context, 3000);
			
			canvas.addEventListener ("click", function () {
				star_field(context, 3000);
			}, false);
		}
		init();
	}	
})();