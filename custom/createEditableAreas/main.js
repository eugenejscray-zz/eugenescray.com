// var color;
// $(document).ready(function(){
	
// 	attachMouseEnter();
// 	// This is not resetting. How do I make it so I can reset this?
// 	function attachMouseEnter(){
// 		$('.editable').mouseenter(function(){
// 			console.log($(this));
// 			$(this).wrap('<span class="test"></span>')
// 			$(this).css('border', '1px solid red');
// 		});
// 		window.setTimeout(attachMouseOut(), 1000);
// 	}
// 	// this is making it so I cannot grab the element and attach a handler to it.
// 	function attachMouseOut(){
// 		$('.editable').mouseout(function(){
// 			var orginal = $(this);
// 			$(this).css("border", "0px");
// 			$(this).parent().replaceWith(orginal.parent().html());
// 			window.setTimeout(attachMouseEnter(), 1000);
// 		});
// 	}
// });
var color;
$(document).ready(function(){
    $('body').on('mouseenter','.editable',function(){
        console.log($(this));
        $(this).wrap('<span class="test"></span>')
        $(this).css('border', '1px solid red');
    });
     $('body').on('mouseout','.editable',function(){
        var orginal = $(this);
        $(this).css("border", "0px");
        $(this).parent().replaceWith(orginal.parent().html());
    });
});