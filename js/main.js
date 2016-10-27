var g="12eLy0DOnVE6mA";
var v="CkfxMCJEG_w";

function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

function getYoutubeId(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function loadVideo(url){
	v = getYoutubeId(url);
	updateShare();
	var iframe = "<iframe width='560' height='315' src='"+url+"?autoplay=1' frameborder='0'></iframe>";
	$("#video").html(iframe);
}

function updateShare(){
	$("#share").text("https://rawgit.com/nfon/GifMeASong/master/index.html?v="+v+"&g="+g);
}

$(document).ready(function()
{
	var curUrl = window.location.href;

	var video = gup('v',curUrl);
	var gif = gup('g',curUrl);
	if (video && gif){
		video = "https://www.youtube.com/embed/"+video;
		loadVideo(video);
		$("#gif").attr("src","https://media0.giphy.com/media/"+gif+"/giphy.gif");
		$("#video").hide();
	}

	$("#send").on("click",function(){
		var url = $("#url").val();
		url = url.replace("watch?v=", "v/");
		loadVideo(url);
		$("#video").show();
	});

	$("#getGif").on("click",function(){
		$.ajax({
		    type: 'GET',
		    url: 'https://api.giphy.com/v1/stickers/random?api_key=dc6zaTOxFJmzC&tag=dance',
		    success: function(response){
		    	console.log(response);
		    	var img = response["data"];
		    	g=img["id"];
		    	updateShare();
		    	$("#gif").attr("src",img["image_url"]);
		    },
		});  
	});
});
