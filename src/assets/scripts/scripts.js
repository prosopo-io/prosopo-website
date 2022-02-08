/* Description: Custom JS file */


(function($) {
    "use strict";
	$(document).ready(function() {

		/* Navbar Scripts */
		// jQuery to collapse the navbar on scroll
		$(window).on('scroll load', function () {
			if ($(".navbar").offset().top > 60) {
				$(".fixed-top").addClass("top-nav-collapse");
			} else {
				$(".fixed-top").removeClass("top-nav-collapse");
			}
		});

		// offcanvas script from Bootstrap + added element to close menu on click in small viewport
		$('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle)').on('click', function () {
			console.log("toggling class")
			$('.offcanvas-collapse').toggleClass('open')
		})

	});

})(jQuery);