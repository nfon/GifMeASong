$(document).ready(function()
{
	$("#send").on("click",function(){
		var url = $("#url").val();
		var iframe = "<iframe width='560' height='315' src='"+url+"?autoplay=1' frameborder='0'></iframe>";
		$("#video").html(iframe);
	});

	$("#getGif").on("click",function(){
		$.ajax({
		    type: 'GET',
		    url: 'https://api.giphy.com/v1/stickers/random?api_key=dc6zaTOxFJmzC&tag=dance',
		    success: function(response){
		    	var img = response["data"];
		    	$("#gif").attr("src",img["image_url"]);
		    },
		});  
	});
});
