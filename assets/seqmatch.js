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
    i: 0,
    len: 0,
    toneSeq: [],
    curBtn: '',
    computerTurn: null,
    endGame: null,
    getNumber: function (id) {
        switch (id) {
            case 'redBtn' : return 1;
            case 'yellowBtn' : return 2;
            case 'greenBtn' : return 3;
            case 'blueBtn' : return 4;
        }
    },
    getId: function (idx) {
        switch (idx) {
            case 1: return '#redBtn';
            case 2: return '#yellowBtn';
            case 3: return '#greenBtn';
            case 4: return '#blueBtn';
        }
    },
    turnOff: function () {
        $(seqm.curBtn).removeClass('on');
        clearInterval(seqm.intv);
    },
    playTone: function (note) {
        var audio = document.getElementById('audio' + note);

        if (audio === null) { clearInterval(seqm.intv); }

        audio.play();
    },
    playerIdx: 0,
    soundError: function () {
        var audio = document.getElementById('errorSnd');
        audio.play();

        var tmp = setInterval(function () {
            audio.pause();
            seqm.endTheGame();
        }, 3000);
    },
    checkPlayerInput: function (id) {
        var len = seqm.toneSeq.length - 1,
            idx = seqm.playerIdx,
            match = (id === seqm.toneSeq[idx]),
            $ctr = $('#toneCounter'),
            cnt = parseInt($ctr.html()) - 1;

        $ctr.html(cnt);

        console.log('len: ' + len + ', idx: ' + idx);
        console.log('id: ' + id + ', toneSeq[]: ' + seqm.toneSeq[idx] + '\n>>MATCH? ' + match + '\nCnt:' + cnt);

        

        // if(!match) {
        //     seqm.computerTurn = false;
        //     seqm.endGame = true;
        //     seqm.soundError();
        // }

        // if(cnt === 0) {
        //     seqm.computerTurn = true;
        //     var tmp = setInterval(function() {
        //         clearInterval(tmp);
        //         seqm.playerIdx = 0;
        //         seqm.computerGoes();            
        //     }, 3000);
        // } else {
        //     seqm.playerIdx += 1;
        // }
    },
    btnClick: function () {
        var btn = $(this),
            id = btn.attr('id'),
            num = seqm.getNumber(id);

        seqm.curBtn = '#' + id;        
        seqm.intv = setInterval(seqm.turnOff, 1400);

        console.log('seqm.computerTurn: ' + seqm.computerTurn);
        seqm.playTone(num);

        btn.addClass('on');

        if (!seqm.computerTurn) {
            seqm.checkPlayerInput(seqm.curBtn);
        }
    },
    AddRndInt: function() {
        var min = 1,
            max = 5;

        seqm.toneSeq.push(seqm.getId(Math.floor((Math.random() * (max - min)) + min)));

        return seqm.toneSeq.length;
    },
    callButton: function() {
        var btnId = seqm.toneSeq[seqm.i];

        $(btnId).addClass('on').trigger('click');
        seqm.i += 1;
    },
    computerGoes: function() {
        if (seqm.len === 0) {
            seqm.len = seqm.AddRndInt();
            $('#toneCounter').html(seqm.len);
        }

        seqm.callButton();

        if(seqm.i < seqm.len) {
            setTimeout(seqm.computerGoes, 1500); 
        } else {
            seqm.i = 0;
            seqm.len = 0;
            seqm.computerTurn = false;
        }
    },
    endTheGame: function() {
        $('#dialog').addClass('open');
        $('#question').addClass('show');
    },
    gameLoop: function() {
        if(!seqm.endGame) {
            if (seqm.computerTurn) {
                seqm.computerGoes();
                seqm.computerTurn = false;
            }
        } else {
            seqm.endTheGame();
        }

        console.log('computerTurn: ' + seqm.computerTurn);
    },
    resetGame: function () {
        seqm.i = 0;
        seqm.len = 0;
        seqm.toneSeq.length = 0;
        seqm.curBtn = '';
        seqm.computerTurn = true;
        seqm.endGame = false;
    },
    openDialog: function (msg) {
        $('#dialog').removeClass('open');
        $('#feedback').html(msg).addClass('show');

        var tmp = setInterval(() => {
            $('#feedback').removeClass('show');
            clearInterval(tmp);
        }, 2000);

    },
    startGame: function () { //alert('Ready Player One...');
        seqm.resetGame();
        seqm.openDialog('Get Ready!');
        
        var tmp = setInterval(() => {
            clearInterval(tmp);
            seqm.gameLoop();
        }, 2000);
    },
    loadHandlers: function () {
        $('#buttonGrp').find('button').on('click', seqm.btnClick);
        $('#computerBtn').on('click', seqm.computerGoes);
        $('#newGameBtn').on('click', seqm.startGame);
    },
    init: function () { //alert('Ready Player One...');
        seqm.loadHandlers();
    }
};

$(function () { //alert('Ready player one...');
    seqm.init();
});