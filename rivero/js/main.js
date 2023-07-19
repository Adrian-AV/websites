	// Speed up calls to hasOwnProperty
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function isEmpty(obj) {

		// null and undefined are "empty"
		if (obj == null) return true;

		// Assume if it has a length property with a non-zero value
		// that that property is correct.
		if (obj.length > 0)    return false;
		if (obj.length === 0)  return true;

		// If it isn't an object at this point
		// it is empty, but it can't be anything *but* empty
		// Is it empty?  Depends on your application.
		if (typeof obj !== "object") return true;

		// Otherwise, does it have any properties of its own?
		// Note that this doesn't handle
		// toString and valueOf enumeration bugs in IE < 9
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) return false;
		}

		return true;
	}  

jQuery(function($) {
	
	// Mobile full-width && disable animation
	if(is_mobile()) {
				
		$('.header-dots').removeClass('no-show');
		
		$('.cre-animate').css({'visibility' : 'visible', 'top' : 0, 'left' : 0, 'transform': 'none', '-webkit-transform': 'none', '-moz-transform': 'none', '-ms-transform': 'none', '-o-transform': 'none', 'scale' : 1, 'opacity' : 1}).removeClass('.cre-animate');
		
	}else{
	
		$('header, #usp, #history').addClass('no-mobile');
	
	}
	
	// Init all plugins and scripts
	$.fn.SIInit = function() {
	
		// Modal photos
		$('a[data-rel]').each(function() {$(this).attr('rel', $(this).data('rel'));});
		$('a[rel^=fancybox]').fancybox();
			
		// Mask phone
		$('.client-phone').mask('+1 (999) 999-9999');

		// IE placeholders
		$('input[placeholder], textarea[placeholder]').placeholder();
		
		// Form validate 
		$('.send-form').unbind('submit').bind('submit', function() {
			
			var name = $(this).find('.client-name');
			var mail = $(this).find('.client-mail');
			var phone = $(this).find('.client-phone');
			var mess = $(this).find('.client-message');
			var button = $(this).find('input[type=submit], button');
			
			if (button.hasClass('disabled')) return false;
			
			button.addClass('disabled');
			
			send = 1;
			
			if (name.val() == '') {
				name.si_show_message('Enter your name');
				send = 0;
			}
					
			if (phone.size() > 0 && phone.val() == '') {
				phone.si_show_message('Enter your phone');
				send = 0;
			}
							
			if (mail.size() > 0 && mail.val() == '') {
				mail.si_show_message('Enter your E-mail');
				send = 0;
			}
									
			if (mess.size() > 0 && mess.val() == '') {
				mess.si_show_message('Enter your message');
				send = 0;
			}
			
			if (send == 0) {
				button.removeClass('disabled');
				return false;
			}
			
			$.post($(this).prop('action'), $(this).serialize(), function(res) {
			
				if (res.success == 1) {
		
					$('.si-modal').fadeOut(500);
					
					setTimeout(function() {
					
						$('.si-modals-wrapper, .si-success-modal').fadeIn(500);
						$('.si-overlay').css({'height': $(document).height(), 'width' : $(document).width()}).fadeIn(500);
					
					},510)

					
					name.val('');
					if (phone.size() > 0) phone.val('');
					if (mail.size() > 0) mail.val('');
					if (mess.size() > 0) mess.val('');
					
					
				}else{
					alert(res.text);
				}
				
				button.removeClass('disabled');
				
			}, 'json');
			
			return false;
		
		});
	
	};
	
	$.fn.SIInit();

	// Header animation
	$('.header-dots').removeClass('no-show');
	
	// Catalog
		
		// Image sliders
		$('.product-photos').each(function() {
			if ($(this).find('.product-photo-link').size() > 1)
				$(this).owlCarousel({nav:true, items:1})
		});
		
		// Autho-height
		var mh = 0;
		var mh2 = 0;
		$('.category-row').each(function() {
		
			var $elems = $(this).find('.product-text');
			var $elems2 = $(this).find('.product-title');
			
			$elems.each(function(){
				mh = Math.max($(this).height(), mh);
			});
						
			$elems2.each(function(){
				mh2 = Math.max($(this).height(), mh2);
			});
			
			$elems.animate({'min-height' : mh}, 500);
			$elems2.animate({'min-height' : mh2}, 500);
			
		});

		
		// History
		$('#history-go').seainside_screen_control(800);
		$('#history-go').on('start-animation', function(){
			//$('.countTo').countTo({speed:3000,refreshInterval:20});
		});

	// Jump links
	$('.si-jump').si_jump();

	
	// Modals
	SIModal.init();
		
		// Init modals
		SIModal.attachModal('.open-phone-modal', '.phone-modal', {'.send-extra' : 'extra'});
		SIModal.attachModal('.open-product-modal', '.product-modal', false, function(){$('.product-modal').empty();$('.product-modal').load(template_url + 'load.php?product_id=' + $(this).data('id') + '&ids=' + $(this).data('ids'), function(){$.fn.SIInit();if ($('.product-modal').find('.product-photo-link').size() > 1) $('.product-modal').find('.product-photos').owlCarousel({nav:true, items:1})});});
			
			$(document).on('click', '.modal-prev, .modal-next', function() {
				$('.modal-overlay').fadeIn(300);
				return false;
			});
			
		// Modal controls
		SIModal.attachClose('.si-close');



	//header
  var $header = $("article#top"),
      $clone = $header.before($header.clone().addClass("clone"));

  var attach_menu = function(){
    var scroll = $(this).scrollTop();
    $('body').toggleClass("down", (scroll > 150));
  }
  $(window).on("scroll", function() {
    attach_menu();
  });

  //mobile
  /*if($(window).width() <= 768){
    $('body').addClass('down');
  }*/

  $('article#top .fa-bars').on('click', function() {
    $('body.down article#top.clone > .centered').toggle();
  });


  //services
  $("#node487 .portfolio").hover(function(){
    $(this).children(".overlay").css("box-shadow","rgba(0, 0, 0, 0.701961) 0px 0px 30px 0px inset");
    $(this).children(".title").css("bottom","33.3333%");
  },
  function(){
    $(this).children(".overlay").css("box-shadow","none");
    $(this).children(".title").css("bottom","0");
  });  

  
  $('article#services .services_carousel').owlCarousel({
    "items": 3,
    "nav": true,
    "navText": [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>'
    ],
    "responsive": {
      768: {"items": 3},
      559: {"items": 2},
      0: {"items": 1},
    }
  });

  // ===================================================== mobile
  var mobileBtn = $('.btn-mobile');

  mobileBtn.click(function(){
    var mobileNav = $('.nav-mobile');

    if($(this).hasClass('active')) {
      $(this).removeClass('active');
      closeMobileNav(200);
    } else {
      $(this).addClass('active');
      mobileNav.addClass('visible');
      $('html').addClass('si-lock2');
    }
  }); 

  function closeMobileNav(timeout) {
    timeout = 0;
    var mobileNav = $('.nav-mobile');

    $('html').removeClass('si-lock2');
    mobileBtn.removeClass('active');
    setTimeout(function(){
      mobileNav.removeClass('visible')
    }, timeout);
  }

  $('.nav-mobile').click(function () {
        closeMobileNav(200);
  });

  $('.nav-mobile a').click(function () {
        closeMobileNav(1200);
  });
  
  $('.menu-close').click(function () {
        closeMobileNav(200);
  });

});


function initMap() {
  var sussex = {lat: 25.867011262169058, lng: -80.28785638978293};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: sussex,
    zoom: 15,
    mapTypeControl: false
  });
  map.setOptions({styles: [{"elementType":"geometry","stylers":[{"color":"#1d2c4d"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#8ec3b9"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#1a3646"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#64779e"}]},{"featureType":"administrative.locality","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#334e87"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#023e58"}]},{"featureType":"poi","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#283d6a"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#6f9ba5"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"poi.attraction","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#023e58"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#3C7680"}]},{"featureType":"poi.place_of_worship","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#304a7d"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2c6675"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#255763"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#b0d5ce"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#023e58"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#283d6a"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#3a4762"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0e1626"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#4e6d70"}]}]});

  var marker = new google.maps.Marker({
    position: sussex,
    map: map
  });
}