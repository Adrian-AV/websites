// Check mobiles
function is_mobile() {return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));}

jQuery(function($) {
	

  //menu
  function closeGlobalNav(timeout) {
      var globalNavigation = $('.mobile-nav'),
          showMenu = $('.show-menu');

      $('html').removeClass('si-lock2');
      showMenu.removeClass('opened');
      globalNavigation.removeClass('active');
      setTimeout(function () {
          globalNavigation.removeClass('visible');
      }, timeout);
  }

  //show menu button
  $('.show-menu').click(function () {
      var globalNavigation = $('.mobile-nav');

      if ($(this).hasClass('opened')) {
          closeGlobalNav(600);
      }
      else {
          $('html').addClass('si-lock2');
          $(this).addClass('opened');
          globalNavigation.addClass('visible').addClass('active');
      }
  });

  //navigation overlay click
  $('.nav-overlay').click(function () {
      closeGlobalNav(600);
  });

  //close button click
  $('.nav-close').click(function () {
      closeGlobalNav(600);
  });

  //global link click
  $(".mobile-nav-link").click(function (e) {
      closeGlobalNav(1200);
  });

  $(window).on('scroll', function(e){
    if($(window).scrollTop() > 0)
      $('.layout-header, .show-menu').addClass('scroll');
    else
      $('.layout-header, .show-menu').removeClass('scroll');
  });

	// Mobile full-width && disable animation
	if(is_mobile()) {
		
		$('.cre-animate').css({'visibility' : 'visible', 'top' : 0, 'left' : 0, 'transform': 'none', '-webkit-transform': 'none', '-moz-transform': 'none', '-ms-transform': 'none', '-o-transform': 'none', 'scale' : 1, 'opacity' : 1}).removeClass('.cre-animate');
		
	}else{

		$('.review-item').fStepwise();
		$('.step-item').fStepwise();
		$('.faq-item').fStepwise();
	
	}

	// Modal photos
	$('a[data-rel]').each(function() {$(this).attr('rel', $(this).data('rel'));});
	$('a[rel^=fancybox]').fancybox({arrows : false});
	
	
	// Counters
	var tomorrow = new Date();
		tomorrow.setHours(24,0,0,0);
	$('.counter').countdown({
		until: tomorrow,
		layout: '<div class="counter-item"><b>{dnn}</b>{dl}</div>'+
				'<div class="counter-separator">:</div>'+
				'<div class="counter-item"><b>{hnn}</b>{hl}</div>'+
				'<div class="counter-separator">:</div>'+
				'<div class="counter-item"><b>{mnn}</b>{ml}</div>'
	});
	$('.product-modal-counter').countdown({
		until: tomorrow,
		layout: 'ДО КОНЦА АКЦИИ:<br />'+
				'<div class="counter-item"><b>{dnn}</b>{dl}</div>'+
				'<div class="counter-item"><b>{hnn}</b>{hl}</div>'+
				'<div class="counter-item"><b>{mnn}</b>{ml}</div>'+
				'<div class="counter-item"><b>{snn}</b>{sl}</div>'
	});
	
	// Jump links
	$('.si-jump').click(function() {
	
		elementClick = $(this).attr("href");
		e_pos = elementClick.indexOf('#');
		elementClick = elementClick.substr(e_pos);
		destination = $(elementClick).offset().top - 60;
		$("html, body").animate({scrollTop: destination}, 700);
		
		return false;
	
	})
		
		
	// Mask phone
	$('.client-phone').mask('+7 (999) 999-99-99');
	
	
	// IE placeholders
	$('input[placeholder], textarea[placeholder]').placeholder();
	
	
	// Sliders
	
		// Big
			$('.big-slider').owlCarousel({items:1,margin:3,nav:true});
			
			var owl = $('.big-slider');
			owl.on('changed.owl.carousel', function(event) {
				
				var $parent = $(this).parents('.block-products-item');
				var index = event.item.index;
				
				$parent.find('.small-slider-item').removeClass('current');
				$parent.find('.small-slider-item').eq(index).addClass('current');
				
				var top = $parent.find('.small-slider-item.current').position().top;
				var api = $parent.find('.small-slider').data('jsp');
					api.scrollToY(top);
				
			});
			
		// Small
			$(window).load(function() {
				$('.small-slider').jScrollPane({showArrows:true,animateScroll:true});
			});	
			
			// Click 
			$('.small-slider-item').click(function() {
				
				var $parent = $(this).parents('.block-products-item');
				var index = $parent.find('.small-slider-item').index($(this));
				var owl = $parent.find('.big-slider');
				
				$parent.find('.small-slider-item').removeClass('current');
				$(this).addClass('current');
				
				owl.trigger('to.owl.carousel', [index]);
				
				return false;
				
			});
			
		// Colors
			$('a.product-color').click(function() {
				
				var $parent = $(this).parents('.block-products-item');
				var color = $(this).data('color');
				
				$parent.find('a.product-color').removeClass('current');
				$(this).addClass('current');
				
				var top = $parent.find('.small-slider-item[data-color='+color+']').position().top;
				var api = $parent.find('.small-slider').data('jsp');
					api.scrollToY(top);
				
				$parent.find('.small-slider-item').removeClass('current');
				$parent.find('.small-slider-item[data-color='+color+']').first().trigger('click');
				
				$parent.find('.open-buy-modal').data('color', $(this).data('color'));
				$parent.find('.open-buy-modal').data('colorname', $(this).data('colorname'));
				
				return false;
				
			})
			
		// Products
			$('.products-slider').owlCarousel({items:5,margin:0,nav:true});
			
			// Click
			$('.products-slider-item').click(function() {
				
				if ($(this).hasClass('current')) return false;
				
				var $parent = $(this).parents('.products-slider');
				var $super_parent = $parent.parents('.block-products');
				
				var index = $parent.find('.products-slider-item').index($(this));
				
				$parent.find('.products-slider-item').removeClass('current');
				$(this).addClass('current');
				
				$('.block-products-items-wrapper').css('min-height', $('.block-products-items-wrapper').height());
				
				$super_parent.find('.block-products-item').animate({opacity:0}, 500);
				setTimeout(function() {$super_parent.find('.block-products-item').removeClass('current');}, 500);
				setTimeout(function() {$('.block-products-items-wrapper').css('min-height', 0);}, 500);
				setTimeout(function() {$super_parent.find('.block-products-item').eq(index).addClass('current').animate({opacity:1}, 500);}, 500);
				
				$("html, body").animate({scrollTop: $super_parent.offset().top}, 700);
				
				return false;
			
			});
			
			// Remove arrows
			$('.products-slider-wrapper').each(function() {
				if ($(this).find('.products-slider-item').size() < 5) {
					$(this).find('.owl-controls').hide();
				}
			});
			
	
	
	// Modals
	
		// Phone modal
		$('.open-phone-modal').click(function() {
			$('html').addClass('si-lock');
			$('.si-overlay').css({width : $(document).width(), height : $(document).height()});
			$('.si-overlay, .si-modals-wrapper, .phone-modal').fadeIn(700);
			$('.phone-modal .send-extra').val($(this).data('extra'));
			return false;
		});
			
		// Question modal
		$('.open-question-modal').click(function() {
			$('html').addClass('si-lock');
			$('.si-overlay').css({width : $(document).width(), height : $(document).height()});
			$('.si-overlay, .si-modals-wrapper, .question-modal').fadeIn(700);
			$('.question-modal .send-extra').val($(this).data('extra'));
			return false;
		});
					
		// Offer modal
		$('.open-offer-modal').click(function() {
			$('html').addClass('si-lock');
			$('.si-overlay').css({width : $(document).width(), height : $(document).height()});
			$('.si-overlay, .si-modals-wrapper, .offer-modal').fadeIn(700);
			return false;
		});
							
		// Product modal
		$('.open-buy-modal').click(function() {
		
			var title = $(this).data('title');
			var articul = $(this).data('articul');
			var color = $(this).data('color');
			var colorname = $(this).data('colorname');
			var oldprice = $(this).data('oldprice');
			var newprice = $(this).data('newprice');
			
				$('.product-modal-title').text(title);
				
				$('.product-modal-articul').text(articul);
				
				$('.product-modal .product-color').attr('class',$('.product-modal .product-color').attr('class').replace(/\bcolor-+\b/g, ''));
				$('.product-modal .product-color').addClass('color-' + color);
				
				if ($(this).data('oldprice'))
					$('.product-modal-old-price').text(oldprice + ' руб.');
				else
					$('.product-modal-old-price').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
					
				$('.product-modal-new-price').text(newprice + ' руб.');
				
				$('.product-modal .send-extra').val(title + ', арт. ' + articul + ', цвет ' + colorname);

		
			$('html').addClass('si-lock');
			$('.si-overlay').css({width : $(document).width(), height : $(document).height()});
			$('.si-overlay, .si-modals-wrapper, .product-modal').fadeIn(700);
			return false;
		});
		
			
			// Modal controls
			
			$('.si-close').click(function() {
				
				$('.si-overlay').fadeOut(700);
				$('.si-modals-wrapper').fadeOut(700);
				$('.si-modal').fadeOut(700);
				$('.si-success-modal').fadeOut(700);
				$('html').removeClass('si-lock');

				return false;
				
			});
				
			$('.si-modals-wrapper').click(function(e) {
				
				if (e.target == this) {
					
					$('.si-overlay').fadeOut(700);
					$('.si-modals-wrapper').fadeOut(700);
					$('.si-modal').fadeOut(700);
					$('.si-success-modal').fadeOut(700);
					$('html').removeClass('si-lock');
				
					return false;
				
				}

			});
			
			$(document).keyup(function(e) {

				if (e.keyCode == 27) {
			  
					$('.si-overlay').fadeOut(700);
					$('.si-modals-wrapper').fadeOut(700);
					$('.si-modal').fadeOut(700);
					$('.si-success-modal').fadeOut(700);
					$('html').removeClass('si-lock');
				
					return false;
			  
				}   
			  
			});
		
	
	// Form validate 
	$('.send-form').submit(function() {
		
		var name = $(this).find('.client-name');
		var phone = $(this).find('.client-phone');
		var mess = $(this).find('.client-message');
		
		send = 1;
		
		if (name.val() == '') {
			name.si_show_message('Укажите ваше имя');
			send = 0;
		}
				
		if (phone.size() > 0 && phone.val() == '') {
			phone.si_show_message('Укажите ваш телефон');
			send = 0;
		}

		
		if (send == 0) 
			return false;
		
		$.post($(this).prop('action'), $(this).serialize(), function(res) {
		
			if (res.success == 1) {
	
				$('.si-modal').fadeOut(500);
				
				setTimeout(function() {
				
					$('.si-modals-wrapper, .si-success-modal').fadeIn(500);
					$('.si-overlay').css({'height': $(document).height(), 'width' : $(document).width()}).fadeIn(500);
				
				},510)

				
				name.val('');
				if (phone.size() > 0) phone.val('');
				if (mess.size() > 0) mess.val('');
				
				/*
				
					yaCounter.reachGoal('target' + res.id);
					
					switch (res.id) {
					
						case 1: ga('send', 'event', '', ''); break;
					
					}
					
				*/
				
			}else{
				alert(res.text);
			}
			
		}, 'json');
		
		return false;
	
	})	
	
});