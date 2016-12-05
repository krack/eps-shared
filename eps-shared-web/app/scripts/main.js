var firstTitle;

function loadHtmlPage(pageFile, isOnPopState){
	$.get( '/pages/'+pageFile, function( data ) {
  		$( '#content div' ).html( data );
  		$('nav a').removeClass('current');
  		var currentPage = $('nav a[href="#'+pageFile+'"]');
  		currentPage.addClass('current');
  		var pageName = currentPage.text();
  		$('#content h2').text(pageName);
  		var title = pageName+' - '+firstTitle;
  		$('title').text(title)  	
  		//save history if not popstate call
  		if(!isOnPopState){
     		window.history.pushState({'pageFile':pageFile},title, '/#'+pageFile);
    	}
	});
};

console.log( history.state)
$( document ).ready(function() {
	firstTitle = $('title').text();
	//init click 
    $('nav a').click(function(){
    	var linkHref = $(this).attr('href');
    	loadHtmlPage(linkHref.replace('#', ''));
    	return false;
    });
    //where navigate on history, go on pop state.
    window.onpopstate = function(event){
    	if(event.state.pageFile){
    		loadHtmlPage(event.state.pageFile, true);
    	}
    }

    //load first element of page
    var anchror = window.location.hash.substring(1);
    if(anchror){    	
    	loadHtmlPage(anchror);
	}else{		
    	$('nav a:first').click();
	}
});