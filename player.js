$(document).ready(function(){
	
	$(".aplay").bind('loadedmetadata',function(){
		
		
		var processed;
		//processed = $(".aplay").duration / $(".aplay").buffered.end(0) + "%";
        //$(".loaded").css("width", processed);
		
		var date = new Date(1000 * $(".aplay").prop("duration"));

		
	
		$(".duration").html(date.toISOString().substr(12, 7));
    });
	var timer
	var move = true;
	$(".aplay").bind("play", function()
	{
		$(".ic-play").attr("class", "ic-pause");
		timer =	setInterval(function(){UpdateProgressBar()}, 500);
	});
	
	$(".aplay").bind("pause", function()
	{
		$(".ic-pause").attr("class", "ic-play");
		clearInterval(timer);
	});
	
	$(".aplay").bind("durationchange", function()
	{
		
		
	});
	
	$(".ic-play").bind("click", function()
	{
		PlayAudio();
	});
	
	
	
	$(".aplay").bind("progress", function()
	{
		var progress;
		progress = $(".aplay").prop("currentTime");
		progress = progress / $(".aplay").prop("duration") * 100 + "%";
		
		$(".current").css("width", progress);
	});
	//Load the audio at site load
	$(".aplay").trigger('load');
	
	//$(".aplay").trigger('play');
	
	function StopAudio()
	{
		$(".aplay").trigger("pause");
		
		$(".ic-play").bind("click", function()
		{
			PlayAudio();
		});
		
	}
	function PlayAudio()
	{
		$(".aplay").trigger("play");
		
		$(".ic-pause").bind("click", function()
		{
			StopAudio();		
		});
		
		
	}
	function UpdateProgressBar()
	{
		if(!move)
			return;
		var progress;
			progress = $(".aplay").prop("currentTime");
			
			$(".currentpos").html(new Date(1000 * progress).toISOString().substr(12, 7));
			progress = progress / $(".aplay").prop("duration") * 100 + "%";
			
			$(".current").css("width", progress);
	}
	
	$(".progressbar").on("click", function(e){
		
		$(".aplay").prop("currentTime",(e.pageX - $(this).offset().left)/490 * $(".aplay").prop("duration")) ;
		UpdateProgressBar()
	});
	
	$(".progressbar").on("mousemove", function(e)
	{
		
		move = false;
		
		var progress;
			progress = $(".aplay").prop("duration");
			
		$(".currentpos").html(new Date(1000 * (e.pageX - $(this).offset().left )/ 490 * progress).toISOString().substr(12, 7));
		$(".currentpos").css("color", "#6df10a");
		
		$(".current").css("width",(e.pageX - $(this).offset().left)/490 * 100 +"%" );
		
	});
	
	$(".progressbar").on("mouseleave", function(e)
	{
		$(".currentpos").css("color", "#ffffff");
		move = true;
		UpdateProgressBar();
		
	});
	
	
	
	
});


