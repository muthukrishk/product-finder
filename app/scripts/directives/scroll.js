angular.module('wowProductFinderApp').directive("scrollcustom", function ($window) {
    return function(scope, element, attrs) {
    	angular.element($window).bind("scroll", function() {
    		hdr = $('.searchLanding').height();
    	    if (this.pageYOffset > hdr+50) {
    	    	angular.element('.searchBar').addClass('fixed');
    	    	angular.element('.product-listing').css('padding-top', '250px');
    	    	angular.element('.searchBar h1.light').hide('slow');
    	    } else {
    	    	angular.element('.searchBar').removeClass('fixed');
    	    	angular.element('.product-listing').css('padding-top', '50px');
    	    	angular.element('.searchBar h1.light').show('slow');
    	    }
    	});
    };
});

/**angular.module('wowProductFinderApp').directive('setClassWhenAtTop', function ($window) {
    var $win = angular.element($window);

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var topClass = attrs.setClassWhenAtTop,
                offsetTop = element.offset().top;
            $win.on('scroll', function (e) {
            	console.log(offsetTop);
                if ($win.scrollTop() >= offsetTop) {
                    element.addClass(topClass);
                } else {
                    element.removeClass(topClass);
                }
            });
        }
    };
});
**/

angular.module('wowProductFinderApp').directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                        scope.$apply(function(){
                                scope.$eval(attrs.ngEnter);
                        });

                        event.preventDefault();
                }
            });
        };
});