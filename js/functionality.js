$(document).ready(function(){	
	$('.code-sample-modal-button').click(function(){
		$('#code-sample-body').html('<div class="container code-sample-body"><div class="col-lg-1 col-lg-offset-4"><img class="loading" src="img/loading.gif" /></div></div>');
		$('.modal-code').modal('toggle');

		// Get the correct file based off of the...
		$.post('ajax/CodeSamples/' + $(this).data('company'), 
			function(data){
				$('#code-sample-body').html(data);
				console.log("HERE");
		});
	});




});