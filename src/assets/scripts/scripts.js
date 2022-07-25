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

		function showElem(id) {
            document.getElementById(id).style["visibility"] = "visible";
            document.getElementById(id).style["position"] = "relative";
        }

        function hideElem(id) {
            document.getElementById(id).style["visibility"] = "hidden";
            document.getElementById(id).style["position"] = "absolute";
        }

        hideElem("subscribe-loader");
        hideElem("subscribe-success");

        function setEmailError(err) {
            document.getElementById("subscribe-error").textContent = err;
        }

        window.onEmailFormSubmit = async (event) => {
            event.preventDefault();
            showElem("subscribe-loader");
            try {
                window.loader = true;
                const formData = new FormData(event.target);
                const formProps = Object.fromEntries(formData);
                const res = await fetch("/.netlify/functions/subscribe", {
                    body: JSON.stringify(formProps),
                    method: "POST",
                });

				// 499 - set as Mongo error on backend
                if (res.status === 404 || res.status === 499) {
                    throw new Error(
                        "Something went wrong! Please try again later!"
                    );
                }

                const json = await res.json();
                if (res.status != 200) {
                    throw new Error(json.message);
                }

                hideElem("subscribe-form");
                showElem("subscribe-success");
            } catch (err) {
                setEmailError(err.message);
            }
            hideElem("subscribe-loader");
        };
	});

})(jQuery);