app
	.factory('SkillService',SkillService);

	function SkillService($http) {
		var skills = {};

		skills.getInfoSkills = function() {
			return $http
				.get('api/skills.json')
				.then(function(response) {
					return response;
				});
		};
		return skills;
	}
