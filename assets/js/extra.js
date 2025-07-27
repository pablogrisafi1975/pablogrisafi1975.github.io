$(function() {
	$('.navbar-collapse a').click(function() {
		if($('#small-screen-menu').is(':visible')){
			$(".navbar-collapse").collapse('hide');
		}
	});

});

