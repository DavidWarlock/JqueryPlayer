$(document).on('ready',function(event){
    $.material.init();
    var playlist = ["media\\audio\\Nirvana - Come As You Are.mp3",
                    "media\\audio\\Nirvana - Lithium.mp3",
                    "media\\audio\\Nirvana - Smells Like Teen Spirit.mp3",
                    "media\\audio\\Pearl Jam - Black.mp3",
                    "media\\audio\\Pearl Jam - Do The Evolution.mp3",
                    "media\\audio\\Pearl Jam - Jeremy.mp3",
                    "media\\audio\\Pearl Jam - Yellow.mp3",
                    "media\\audio\\Red Hot Chili Peppers - Californication.mp3",
                    "media\\audio\\Red Hot Chili Peppers - Can't Stop.mp3",
                    "media\\audio\\Red Hot Chili Peppers - Otherside.mp3"];
    var lasti = null;
    var n = 0;
    var m = 0;
    var paused = false;
    var stopped = false;
    
    $("i").on('click',function(evt){
        if(lasti != null){
            lasti.html("play_arrow");
            $("#slider"+n).hide();
            $("#pause"+n).hide();
            stopped = true;
        }
        if(lasti == null || lasti.attr("data") != $(this).attr("data")){
            lasti = $(this);
            var num = parseInt($(this).attr("data"));
            $("audio").attr("src",playlist[num]);
            $("audio").trigger("play");
            $(this).html("stop");
            stopped = false;
        }else{
            console.log(n);
            $("audio").trigger("pause");
            $(this).html("play_arrow");
            lasti.html("play_arrow");
            lasti = null;
            $("#slider"+n).hide();
            $("#pause"+n).hide();
            stopped = true;
        }
    });
    
    $("img").on('click',function(evt){
        var $preview = $("<img width=100%>");
        $preview.attr("src",$(this).attr("src"));
        $(".modal").modal('toggle');
        $("#preview").html("");
        $("#preview").append($preview);
    });     
    
    $("audio").on("loadedmetadata", function(evt) {
        n = lasti.attr("data");
        try{
            $("#slider"+n).noUiSlider({
                start: 0,
                behaviour: 'snap',
                connect: 'lower',
                range: {
                    'min': 0,
                    'max': this.duration
                }
            });
            
            $("#slider"+n).on("change", function(evnt, val) {
                $("audio").prop("currentTime",val);
            });
            
            $("#pause"+n).on('click',function(evt){
                if(paused == false){
                    var time = $("audio").currentTime;
                    $("audio").trigger("pause");
                    $("audio").prop("currentTime", time);
                    $(this).html("Resume");
                    paused = true;
                }else{
                    $("audio").trigger("play");
                    $(this).html("Pause");
                    paused = false;
                }
            });
            $("#pause"+n).show();
        }catch(err){
            $("#slider"+n).show();
            $("#pause"+n).show();
        }
    });
    
    $("audio").on("timeupdate",function(evt){
        var tiempo = this.currentTime.toFixed(0);
        $("#slider"+n).val(this.currentTime);
        $("#time"+n).text(sformat(tiempo));
    });
    
    $("audio").on("pause",function(evt){
        if(stopped == true){
            var text = "00:00";
            $("#time"+n).text(text);
            paused = false;
            $("button").html("Pause");
        }
    });
    
    function sformat(s) {
      var fm = [
            Math.floor(s / 60) % 60,
            s % 60
      ];
      return $.map(fm, function(v, i) { return ((v < 10) ? '0' : '') + v; }).join(':');
    }
    
    
});