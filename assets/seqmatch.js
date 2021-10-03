/*********************************
 * fn: seqmatch.css
 * by: danConcepion
 * dt: 2021-09-29T16:46:05
 * pn: Sequence Match Game
 * co: Indy Attic Software
 ********************************/
'use strict';
/*
var audio = new Audio('audio_file.mp3');
audio.play();
*/

var seqm = {
    color: '',
    playTone : function() {},
    btnClick: function () { //alert('click');
        var btn = $(this),
            tmp = null;

        console.log(btn.attr('id'));

        btn.addClass('clicked');
        tmp = setTimeout(function(){
            btn.removeClass('clicked');
        }, 250);
    },
    loadHandlers: function () {
        $('#buttonGrp').find('button').on('click', seqm.btnClick);
    },
    init: function () { //alert('Ready Player One...');
        seqm.loadHandlers();
    }
};

$(function () {
    //alert('Ready player one...');
    seqm.init();
});

/*
document.addEventListener("DOMContentLoaded", function(event) 
{
	//document is fully loaded 
})

https://www.w3schools.com/jsref/met_win_settimeout.asp
*/