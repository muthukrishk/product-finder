angular.module('wowProductFinderApp').directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 100) {
                 scope.ChangeClass = true;
             } else {
                 scope.ChangeClass = false;
             }
            scope.$apply();
        });
    };
});


angular.module('wowProductFinderApp').directive("scrollcustom", function ($window) {
    return function(scope, element, attrs) {
    	angular.element($window).bind("scroll", function() {
    		hdr = $('.searchLanding').height();
    	    if (this.pageYOffset >= hdr) {
    	    	angular.element('.searchBar').addClass('fixed');
    	    	angular.element('.product-listing').css('padding-top', '250px');
    	    	angular.element('.searchBar h1.light').addClass('displaynone');
    	    	
    	    } else {
    	    	angular.element('.searchBar').removeClass('fixed');
    	    	angular.element('.product-listing').css('padding-top', '50px');
    	    	angular.element('.searchBar h1.light').removeClass('displaynone');
    	    }
    	   scope.$apply();
    	});
    };
});
