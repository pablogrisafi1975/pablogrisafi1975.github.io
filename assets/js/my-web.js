function routeConstants(){
	return {
		routes : {
			'bienvenido' : 'Bienvenido',	
			'contacto' : 'Contacto',	
			'experiencia' : 'Experiencia',	
			'proyectos' : 'Proyectos',	
			'redes-sociales' : 'Redes Sociales',	
			'presencia-web' : 'Presencia Web',	
			'el-pasado' : 'El pasado',
		}
	};
};

function router ($routeProvider, $locationProvider, routeConstants) {
	var routes = routeConstants.routes;
	for(var route in routes){
		$routeProvider.when('/' + route, {templateUrl: 'views/' + route + '.html'})
	}
	$routeProvider.otherwise({redirectTo: '/bienvenido'});
};
function uiSelectedSmall() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		controller : 'TabHeaderController',
		controllerAs : 'tabHeaderController',
		link : function($scope, $element, $attrs) {
		},
		template : [
		    '<ul class="nav navbar-nav visible-xs-inline-block">',
                '<li class="active"><a >{{tabHeaderController.locationName()}}</a></li>', 
            '</ul>'].join(' ')
	};
}
function uiMenuItem() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		controller : 'TabHeaderController',
		controllerAs : 'tabHeaderController',
		scope : {
			key : "@key"
		},
		link : function($scope, $element, $attrs) {
		},
		template : ['<li ng-class="{ active: tabHeaderController.isActive(\'/{{key}}\')}">',
		            	'<a href="#{{key}}">{{tabHeaderController.locationName(key)}}</a>',
		            '</li>'].join(' ')
	};
}
function uiLink() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			url : "@url"
		},
		controller : function() {

		},
		link : function($scope, $element, $attrs) {
		},
		template : '<a href="{{url}}" target="_blank" ng-transclude></a>',
	};
}
function uiSocialYes() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			url : "@url",
			iconSrc : "@iconSrc",
			iconAlt : "@iconAlt"
		},
		controller : function() {

		},
		link : function($scope, $element, $attrs) {
		},
		template : [
			'<div class="col-md-6">',
				'<div class="panel panel-info">',
					'<div class="panel-body">AAAA',
						'<ui-link url="{{url}}">',
							'<img ng-src="{{iconSrc}}" alt="{{iconAlt}}" title="{{url}}" class="pull-left">',
						'</ui-link>',
						'<span ng-transclude></span>',
					'</div>', 
				'</div>', 
			'</div>' ].join('')
	};
}
function uiSocialNo() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			url : "@url",
			iconSrc : "@iconSrc",
			iconAlt : "@iconAlt"
		},
		controller : function() {
			
		},
		link : function($scope, $element, $attrs) {
		},
		template : [
	        '<div class="col-md-4">',
	        	'<div class="panel panel-warning">',
	        		'<div class="panel-body">',
	        			'<img src="{{iconSrc}}" alt="{{iconAlt}}" class="pull-left">',
	        			'<span ng-transclude></span>',
	        		'</div>',
	        	'</div>',
	        '</div>'].join('')
	};
}

function uiProject() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			url : "@url",
			title : "@title"
		},
		controller : function() {
			
		},
		link : function($scope, $element, $attrs) {
		},
		template : [
		    '<div class="col-md-6">' +
		       '<div class="panel panel-info">' +
		           '<div class="panel-heading">' +
		             '<ui-link url="{{url}}" class="panel-title">{{title}}</ui-link>' +
		           '</div>' +
		        '<div class="panel-body">' +
		           '<span ng-transclude></span>' +
		        '</div>' +
		    '</div>' ].join('')
	};
}

function TabHeaderController($location, routeConstants) {
	var vm = this;
	vm.isActive = function(viewLocation) {
		return viewLocation === $location.path();
	};
	vm.locationName = function (key) {
		if(arguments.length === 0){
			return routeConstants.routes[$location.path().substr(1)];
		}
		return routeConstants.routes[key];
	};
}

function DialogController($location) {
	this.netfirms = function(){
		$('#iframe-modal').attr('src', 'oldwebs/netfirms/netfirms.html');
		$('#modal-title').text('Mi vieja página en NetFirms');
		$('.modal-body').css('height', 500)
		$('.modal').modal({
			show : true
		});
		$('.openifrmahere').find('iframe').load(function() {
			$('.loading').hide();
		});
		return false;
	};
	
	this.geocities = function(){
		$('#iframe-modal').attr('src', 'oldwebs/geocities/zzgeo-INDEX.HTML');
		$('#modal-title').text('Mi vieja página en GeoCities');
		$('.modal-body').css('height', 550)
		$('.modal').modal({
			show : true
		});
		$('.openifrmahere').find('iframe').load(function() {
			$('.loading').hide();
		});
	};
	
	this.foto = function(e) {
		$('#iframe-modal').attr('src', 'pic-modal.html');
		$('#modal-title').text('¡Linda foto!');
		$('.modal-body').css('height', 350)
		$('.modal').modal({
			show : true
		});
		$('.openifrmahere').find('iframe').load(function() {
			$('.loading').hide();
		});
	};
}

function ScrollController($window, $scope, $routeParams) {
	var vm = this;
	
	vm.scrollPos = 0;

    $window.onscroll = function(){
        vm.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
        $scope.$apply();
    };
    
    this.showScrollToTop = function(){
    	return vm.scrollPos > 100;
    }
    
	vm.scrollToTop = function() {
		$('html, body').animate({
			scrollTop : 0
		}, 'slow');
		return false;
	}
	vm.fastScrollToTop = function() {
		$('html, body').scrollTop(0);
		return false;
	}
	

	$scope.$on('$routeChangeSuccess', function(event) {
		vm.fastScrollToTop();
	});
}

angular.module('myWebApp', ['ngRoute'])
	.constant('routeConstants', routeConstants())
	.directive('uiLink', uiLink)
	.directive('uiSelectedSmall', uiSelectedSmall)
	.directive('uiSocialYes', uiSocialYes)
	.directive('uiSocialNo', uiSocialNo)
	.directive('uiProject', uiProject)
	.directive('uiMenuItem', uiMenuItem)
	.controller('TabHeaderController', TabHeaderController)
	.controller('DialogController', DialogController)
	.controller('ScrollController', ScrollController)
	.config(router)
	;
