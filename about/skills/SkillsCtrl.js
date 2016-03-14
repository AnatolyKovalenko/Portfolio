(function () {
	'use strict';
	app
		.controller('SkillsCtrl',SkillsCtrl)
			.directive('onFinishRender', function ($timeout) {
				return {
					restrict: 'A',
					link: function (scope, element, attr) {
						if (scope.$last === true) {
							scope.$evalAsync(attr.onFinishRender);
						}
					}
				}; 
			});

		function SkillsCtrl(SkillService, $scope) {
			SkillService
				.getInfoSkills()
					.then(function (response) {
						$scope.skills = response.data;
					});

			$scope.countUp = function () {
				angular.forEach(document.querySelectorAll('.skill'), function(e) {
					var count = 0,
							counter = setInterval(function() { 
								count++;
								e.innerHTML = count+"%";
								if (count >= e.getAttribute('data-percent'))
									clearInterval(counter);
							},30);
				});
			};
		}
			
})();