/*
  Code by Gabriel Nunes
  Modified by Lee to use JamesFT/Database-Quotes-JSON for JSON Quote data.
*/
const projectName = 'random-quote-machine';

let quotesData;

var colors = [
    '#5e2dad',
    '#2d44ad',
    '#2d80ad',
    '#2dad56',
    '#2dad36',
    '#3a1f7a',
    '#6713a8',
    '#342224',
    '#472E32',
    '#333d2f',
    '#452a0e',
    '#0f2647'
  ];

  var currQuote ='', currAuth = '';

  function getQuotes() {
    return $.ajax({
      headers: {
        Accept: 'application/json'
      },
      url:
        'https://raw.githubusercontent.com/JamesFT/Database-Quotes-JSON/master/quotes.json',
      success: function (jsonQuotes) {
        if (typeof jsonQuotes === 'string') {
          quotesData = JSON.parse(jsonQuotes);
        }
      }
    });
  }

  function getRandQuote(){
      return quotesData[
          Math.floor(Math.random() * quotesData.length)
      ]
  }


  function getAQuote(){
      let randomQuote = getRandQuote();
      const emptyAuth = 'Anonymous';


     currQuote = randomQuote.quoteText;
     currAuth = () => {
        if(randomQuote.quoteAuthor === null){
          return emptyAuth;
        } 
         return randomQuote.quoteAuthor
     };

    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
          encodeURIComponent('"' + currQuote + '" ' + '-' + currAuth())
      );

      $('.quote-text').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#text').text(currQuote);
      });
    
      $('.quote-author').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#author').html(currAuth);
      });
    
      var color = Math.floor(Math.random() * colors.length);

      $('#wrapper').animate(
        {
          backgroundColor: colors[color],
          color: colors[color]
        },
        1000
      );

      $('html body').animate(
        {
          backgroundColor: colors[color],
          color: colors[color]
        },
        1000
      );

      $('.top-div').animate(
        {
          backgroundColor: colors[color],
        },
        1000
      );

      $('.button').animate({
          backgroundColor: colors[color]
        },
        1000
      );
  }

  $(document).ready(function () {
    getQuotes().then(() => {
        getAQuote();
    });
  
    $('#new-quote').on('click', getAQuote);
  });



