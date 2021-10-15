/*********************************
 * fn: seqmatch.js
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
    toneSeq: [],
    curBtn : '',
    getNumber: function (id) {
        switch (id) {
            case 'redBtn' : return 1;
            case 'yellowBtn' : return 2;
            case 'greenBtn' : return 3;
            case 'blueBtn' : return 4;
        }
    },
    turnOff : function() {
        $(seqm.curBtn).removeClass('on');
    },
    playTone: function(note) {
        var audio = document.getElementById('audio' + note);
        
        if(audio === null) {
            clearInterval(seqm.intv);
        }
        
        audio.play();
    },
    btnClick : function() {
        var btn = $(this),
            id = btn.attr('id'),
            num = seqm.getNumber(id),
            intv = null;

        seqm.curBtn = '#' + id;        
        seqm.intv = setInterval(seqm.turnOff, 1000);
        seqm.playTone(num);

        btn.addClass('on');
        console.log(id, num, seqm.curBtn);
    },
    AddRndInt: function() {
        var min = 1,
            max = 5;
    
        seqm.toneSeq.push(Math.floor((Math.random() * (max - min)) + min));
        console.log('AddRndInt: ' + seqm.toneSeq);
    },
    computerGoes : function() {

        seqm.AddRndInt();
        $('#redBtn').addClass('on').trigger('click');
    },
    loadHandlers: function () {
        $('#buttonGrp').find('button').on('click', seqm.btnClick);
        $('#computerBtn').on('click', seqm.computerGoes);
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