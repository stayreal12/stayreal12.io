;(function (window, Cryptoloji, $, undefined) {
  'use strict'

  Cryptoloji.visitor.countVisit()

  //
  // jQuery document ready bootstrap
  //
  $(document).ready(function () {

    FastClick.attach(document.body);

    // remove main loader

    TweenLite.set('.section_welcome_header', {y:-300})
    TweenLite.set('#footer', {y:200})
    TweenLite.set('#body_landing', {opacity:0})

    $('#mainLoader').remove();

    TweenLite.to('#body_landing', .75, {opacity:1, delay:.2, ease:Expo.easeInOut})
    TweenLite.to('.section_welcome_header', .75, {y:0, delay:1.2, ease:Expo.easeInOut})
    TweenLite.to('#footer', .75, {y:0, delay:1.8, ease:Expo.easeInOut})


    // 
    // fix height
    // 
    Cryptoloji.UI.fixHeight() // this is required for android keyboard behaviour
    
    // 
    // on rotation/resize
    //
    Cryptoloji.UI.handleOrientationChanges()

    
    //
    // behavior help button
    //
    Cryptoloji.UI.loadLogicHelpButton('encryption')
    Cryptoloji.UI.loadLogicHelpButton('decryption')

    //
    // Key modal setup
    //    

    // this delay postpone a bit the emoji download flow 
    // this way the browser think the webpage has been loaded (hiding its spinner)
    setTimeout(function(){
      if (!Cryptoloji.mq.matches) {
        Cryptoloji.UI.KeyModal('#key-modal')
          .fill(EmojiList)
          .addClickHandler('#encryption_key_modal_open')
          .addClickHandler('#decryption_key_modal_open')
      } else {
        Cryptoloji.UI.KeyPanel('#encryption_keypanel')
          .fill(EmojiList)
        Cryptoloji.UI.KeyPanel('#decryption_keypanel')
          .fill(EmojiList)
      }
    }, 2000)
    //
    // handle header show/hide
    //
    Cryptoloji.UI.handleHeader()
    Cryptoloji.UI.handleFooter()

    //
    // StateMan bootstrap
    //
    Cryptoloji.stateman.start()
    // go to welcome if no state is active
    if (Cryptoloji.stateman.current.name === ''){
      Cryptoloji.stateman.go('welcome')
    }
      
    Cryptoloji.stateman.on('begin', function (event) { console.log('begin ', event) })
    Cryptoloji.stateman.on('end', function (phase) { console.log('end ', phase) })
    Cryptoloji.stateman.on('notfound', function () { console.log('notfound') })


    //
    // handle first visit element display/hide
    //
    if (Cryptoloji.visitor.isFirstVisit()) {
      $('[hide-on-first-visit-only]').hide()
    } else {
      $('[show-on-first-visit-only]').hide()
    }
  })

})(window, window.Cryptoloji, jQuery); 
