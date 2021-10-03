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
    toneSeq: [],
    getNumber: function (id) {
        switch (id) {
            case 'redBtn' : return 1;
            case 'yellowBtn' : return 2;
            case 'greenBtn' : return 3;
            case 'blueBtn' : return 4;
        }
    },
    btnClick: function () { //alert('click');
        var btn = $(this),
            id = btn.attr('id'),
            val = seqm.getNumber(id),
            audio = document.getElementById('audio' + val),
            tmp = null;

        console.log(id, val);

        btn.addClass('clicked');        

        // tmp = setTimeout(function(){
        //     btn.removeClass('clicked');            
        // }, 125);

        audio.play().then(function() { btn.removeClass('clicked'); });
        clearTimeout(tmp);
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