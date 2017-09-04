angular.module('wowProductFinderApp').directive("scrollcustom", function ($window) {
    return function(scope, element, attrs) {
    	angular.element($window).bind("scroll", function() {
    		hdr = $('.searchLanding').height();
    	    if (this.pageYOffset > hdr) {
    	    	angular.element('.searchBar').addClass('fixed');
    	    	angular.element('.product-listing').css('padding-top', '250px');
    	    	angular.element('.searchBar h1.light').addClass('displaynone');
    	    	
    	    } else {
    	    	angular.element('.searchBar').removeClass('fixed');
    	    	angular.element('.product-listing').css('padding-top', '50px');
    	    	angular.element('.searchBar h1.light').removeClass('displaynone');
    	    }
    	});
    };
});
