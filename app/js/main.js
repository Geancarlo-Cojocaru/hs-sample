$(document).ready(function() {


	
	// COMPORTAMENT MENIU
	$('.buton-meniu').click(function() {
		$('body, .buton-meniu').toggleClass('meniu-activ');
		
		// ADAUGĂ BACKDROP; clasa 'show' e pt tranzitie
		if($("#backdrop-meniu").length) {// dacă există
			$("#backdrop-meniu").removeClass('show');
			setTimeout(function () {$("#backdrop-meniu").remove();}, 250);
		} else {
			$('<div id="backdrop-meniu" class="modal-backdrop fade"></div>').appendTo(".navbar");
			setTimeout(function () {$("#backdrop-meniu").addClass('show');}, 10);
		}		
	});

	// ÎNCHIDE MENIU LA CLICK PE BACKDROP
	$('body').on('click', '#backdrop-meniu', function() {
	  $('body, .buton-meniu').toggleClass('meniu-activ');
	  $("#backdrop-meniu").removeClass('show');
		setTimeout(function () {$("#backdrop-meniu").remove();}, 250);
	});
	// END COMPORTAMENT MENIU


	// DROPDOWN WITH SUBMENU
	$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
	  if (!$(this).next().hasClass('show')) {
	    $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
	  }
	  var $subMenu = $(this).next(".dropdown-menu");
	  $subMenu.toggleClass('show');
	  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
	    $('.dropdown-submenu .show').removeClass("show");
	  });
	  return false;
	});

	// FACEM SUPERMENIU SĂ NU SE ÎNCHIDĂ
	$(document).on('click', '.navbar-nav .dropdown-menu, .navbar-nav .dropdown-submenu, .extra-info-meniu .dropdown-menu', function (e) {
	  e.stopPropagation();
	});

	// MENU BACK FUNCTION
	$('.navbar-nav .back-element, .extra-info-meniu .back-element').click(function(e){
	  $(this).parent().removeClass('show');
	  e.stopPropagation();
	})


	// adaugă clasa imagine listing - animeaza imaginea la hover pe titlu
	$('article.list a.link-title').hover(function() {
		$(this).closest('article.list').toggleClass('cu-hover');
	});



	// CARUSEL NUMERE
	var totalItems = $('#carouselMultimedia .carousel-item').length;
	var currentIndex = $('#carouselMultimedia .carousel-item.active').index() + 1;
	$('.numere').html(+currentIndex+' / '+totalItems+'');

	$('#carouselMultimedia').on('slid.bs.carousel', function() {
		currentIndex = $('.carousel-item.active').index() + 1;
		$('.numere').html(+currentIndex+' / '+totalItems+'');
	});
	// END CARUSEL NUMERE


	// COOKIES
	$('.info-cookies .ok-cookies, .info-cookies .no-cookies').click(function(){
		$('.info-cookies').addClass('d-none');
	})

});


// BOOTSTRAP CAROUSEL TOUCH
(function ($) {

  var touchStartX = null;

  $('.carousel').each(function () {
    var $carousel = $(this);
    $(this).on('touchstart', function (event) {
      var e = event.originalEvent;
      if (e.touches.length == 1) {
        var touch = e.touches[0];
        touchStartX = touch.pageX;
      }
    }).on('touchmove', function (event) {
      var e = event.originalEvent;
      if (touchStartX != null) {
        var touchCurrentX = e.changedTouches[0].pageX;
        if ((touchCurrentX - touchStartX) > 60) {
          touchStartX = null;
          $carousel.carousel('prev');
        } else if ((touchStartX - touchCurrentX) > 60) {
          touchStartX = null;
          $carousel.carousel('next');
        }
      }
    }).on('touchend', function () {
      touchStartX = null;
    });
  });

})(jQuery);