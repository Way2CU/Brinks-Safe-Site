/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();
	// handle analytics event
		var dataLayer = window.dataLayer || new Array();
		for (var i=0, count=Caracal.ContactForm.list.length; i<count; i++)
			Caracal.ContactForm.list[i].events.connect('submit-success', function(data) {
				// Ga Event for form submission
				ga('send', {
				  hitType: 'event',
				  eventCategory: 'Form',
				  eventAction: 'Lead'
				});
				// Facebook conversion event
				fbq('track', 'Lead');
				// Adwords conversion code
				function adwTrack() {
				    var img = new Image(1, 1);
				    img.src = "https://www.googleadservices.com/pagead/conversion/938641357/?value=1.00&amp;currency_code=EUR&amp;label=q4JdCK-qrHIQzY_KvwM&amp;guid=ON&amp;script=0";
				}
				adwTrack();
				return true;
			});
};


// connect document `load` event with handler function
$(Site.on_load);
