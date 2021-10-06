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
    computer: true,
    toneSeq: [],
    getNumber: function (id) {
        switch (id) {
            case 'redBtn' : return 1;
            case 'yellowBtn' : return 2;
            case 'greenBtn' : return 3;
            case 'blueBtn' : return 4;
        }
    },
    playTone: function(note) {
        var audio = document.getElementById('audio' + note);
        
        if(audio === null) {
            clearInterval(seqm.intv);
        }
        
        audio.play();
        $('#buttonGrp').find('button').addClass('on');
    },
    btnClick: function () { //alert('click');
        var btn = $(this),
            id = btn.attr('id'),
            val = seqm.getNumber(id);   

        seqm.playTone(val);    
    },
    AddRndInt: function() {
        var min = 1,
            max = 5;

        seqm.toneSeq.push(Math.floor((Math.random() * (max - min)) + min));
        console.log('AddRndInt: ' + seqm.toneSeq);
    },
    idx: 0,
    intv: null,
    computerClick: function() {
        var val = seqm.toneSeq[seqm.idx];

        if(val === undefined) {
            seqm.idx = 0;
            clearInterval(seqm.intv);
        } else { console.log(val);
            //$('#buttonGrp').find('button').eq(val -1).addClass('on');
            seqm.playTone(val);
            seqm.idx++;
        }
    },
    computerGoes: function () { console.log('Computer\'s Turn!');
        seqm.AddRndInt();

        seqm.intv = setInterval(seqm.computerClick, 1250);
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