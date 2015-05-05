/* global posParagraph */

posParagraph = function(param) {
	var config = {
		classes: {
			miniParagraphZone : "miniParagraphZone",
			miniParagraphInner : "miniParagraphInner",
			container : "readingPositionZone"
		},
		elem: {
			miniParagraph : "<p class='miniParagraphe'></p>"
		}
	};
	var init = function(param) {
		// Remove if exist
		$("."+this.config.classes.container).remove();
		$(param).after($("<div/>", { "class": this.config.classes.container }).remove());
		
		$(param).addClass("clearfix"); // NEED CLEARFIX IN CSS !!
		this.build(param);
	};
	var build = function(param) {
		var $that = this,
			container = $("."+this.config.classes.container),
			miniParagrapheZone = $("<div/>", { "class": $that.config.classes.miniParagraphZone }),
			miniParagrapheInner = $("<div/>", { "class": $that.config.classes.miniParagraphInner }).appendTo(miniParagrapheZone),
			miniParagraph = $that.config.elem.miniParagraph,
			ratioHW = $(param).height()/$(param).width();

		// make container
		container.append(miniParagrapheZone);

		// init height with default width CSS
		miniParagrapheInner.width(miniParagrapheInner.height()*ratioHW);

		// Make mini paragraphe
		$(param).find("*").each(function() {
			$(miniParagraph).css({
				"height" : ($(this).height()/$(param).height())*100+"%",
				"margin-top" : (parseInt($(this).css("margin-top"), 10)/$(param).height())*100+"%",
				"margin-bottom" : (parseInt($(this).css("margin-bottom"), 10)/$(param).height())*100+"%"
			}).appendTo(miniParagrapheInner);
		});
		
		// Duplicate for scroll
		miniParagrapheZone.clone().appendTo(container).addClass("scroller").wrap("<div class='scrollOverlay'/>");
		
		// On scroll
		$(window, "html", "body").scroll(function(){
			$that.articleLevel(param);
		});
		
	};
	// Read article level 
	var articleLevel = function(param) {
		var positionStart = $(param).offset().top,
			heightOverlay = $("."+this.config.classes.container).find(".scrollOverlay");
			
		console.log(heightOverlay);
		console.log($(window.height()));
		console.log($(window.height()));
		
		if($(window, "html", "body").scrollTop() > positionStart) {
			console.log($(window).scrollTop());
			heightOverlay.height($(window).scrollTop());
		}
	}
	return {init:init,config:config,build:build,articleLevel:articleLevel};
}();

posParagraph.init(".paragraphZone");

$(window).resize(function(){
	posParagraph.init(".paragraphZone");
})
