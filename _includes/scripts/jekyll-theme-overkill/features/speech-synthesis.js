{% raw %}
var speechSynthesisModule = (function (window, document) {
  'use strict';

  if (typeof window.speechSynthesis === 'undefined') {
    console.warn('Speech synthesis not supported by this browser.');
    return false;
  }


  /**
   * Update voice list value
   */

  var loadVoices = function () {

    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
      console.warn('No speech synthesis language detected on your device.');
    } else {
      var langs = voices.map(function (voice) { return voice.lang; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
      if (pageLang && langs.indexOf(pageLang) === -1) {
        // if page lang is not available (e.g."en"), use the closest voice lang (e.g. "en-US")
        for (var i in langs) {
          if (pageLang === langs[i].replace(/-[a-zA-Z]+$/, '')) {
            pageLang = langs[i];
          }
        }
      }
      if (pageLang && langs.indexOf(pageLang) === -1) {
        console.warn('Speech synthesis language "' + pageLang + '" is not installed on your device');
        console.log('Speech synthesis available languages', langs);
      }
      if (voiceInput) {
        populateVoiceList(pageLang);
      }
      if (langInput) {
        langInput.innerHTML = pageLang;
      }
    }

  }



  /**
   * Populate the language select input
   */

  var populateVoiceList = function (lang) {
    var i;

    voiceInput.innerHTML = '';

    for (i = 0; i < voices.length; i++) {
      if (!lang || lang === voices[i].lang) {

        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
        if (voices[i].default) {
          option.textContent += ' -- DEFAULT';
        }
        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        option.value = voices[i].name;
        if (!selected) {
          option.setAttribute('selected', 'selected');
          var selected = true;
        }

        voiceInput.appendChild(option);
      }
    }
  };



  var voiceInput = document.querySelector('#speech-synthesis-voice');
  var pitchInput = document.querySelector('#speech-synthesis-pitch');
  var rateInput = document.querySelector('#speech-synthesis-rate');
  var volumeInput = document.querySelector('#speech-synthesis-volume');
  //var playButtons = document.querySelectorAll('.speech-synthesis');
  var langInput = document.querySelector('#speech-synthesis-lang');

  var voices = [];
  var pageLang = $('html').attr('lang');

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance('-'));
  } else {
    loadVoices();
  }



  /**
   * Start speech synthesis
   */

  var speak = function (text, options) {

    var utterThis = new SpeechSynthesisUtterance();

    if (text) {
      utterThis.text = text;
    } else {
      utterThis.text = this.textContent;
    }

    if (options.lang) {
      utterThis.lang = options.lang;
    }

    // Use selected voice (if lang match)
    if (voiceInput && voiceInput.value) {
      var voice = voices.filter(function(voice) { return voice.name == voiceInput.value; })[0];
      if (!options.lang || voice.lang === options.lang) {
        utterThis.voice = voice;
      }
    } else if (options.lang) {
      // Use the first available voice matchin lang
      utterThis.voice = voices.filter(function(voice) { return voice.lang == options.lang; })[0];
    }

    //utterThis.voiceURI = 'native';
    if (pitchInput) {
      utterThis.pitch = parseFloat(pitchInput.value); //0 to 2
    }
    if (rateInput) {
      utterThis.rate = parseFloat(rateInput.value); // 0.1 to 10
    }
    if (volumeInput) {
      utterThis.volume = parseFloat(volumeInput.value); // 0 to 1
    }

    utterThis.onend = function (e) {
      //console.log('Speech synthesis Finished in ' + event.elapsedTime + ' seconds.');
    };

    window.speechSynthesis.speak(utterThis);

  };



  /**
   * Start speech synthesis when user click button
   */

  var addEventListener = function (selector, event) {

    var i;
    var elements = document.querySelectorAll(selector);

    for (i = 0; i < elements.length; i++) {
      elements[i].addEventListener((event || 'click'), function (e) {
        e.preventDefault();

        var text = this.getAttribute('data-speech-synthesis-text');
        var lang = this.getAttribute('data-speech-synthesis-lang');
        var targetSelector = this.getAttribute('data-speech-synthesis-target');

        if (targetSelector) {
          var target = document.querySelector(targetSelector);
          if (target) {
            var text = target.textContent || target.value;
          }
        }

        speak(text, {
          lang: lang
        });

      });
    }

  };


  // Initialize click event on buttons
  addEventListener('.speech-synthesis-test', 'click');


  return {
    populateVoiceList,
    addEventListener
  }


})(window, document);
{% endraw %}
