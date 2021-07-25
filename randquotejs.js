/*
  Code by Gabriel Nunes
  Modified by Lee to use JamesFT/Database-Quotes-JSON for JSON Quote data.
*/
const projectName = 'random-quote-machine';

let quotesData;

let backimg = [
  'url(./backgs/aron.jpg)',
  'url(./backgs/belle.jpg)',
  'url(./backgs/blaque.jpg)',
  'url(./backgs/eberhard.jpg)',
  'url(./backgs/eberhard2.jpg)',
  'url(./backgs/fabian.jpg)',
  'url(./backgs/gundareva.jpg)',
  'url(./backgs/kasuma.jpg)',
  'url(./backgs/malik.jpg)',
  'url(./backgs/pavlova.jpg)',
  'url(./backgs/philippe.jpg)',
  'url(./backgs/stein.jpg)'
]

let colors = [
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

  let currQuote ='', currAuth = '';

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
        if(randomQuote.quoteAuthor === ""){
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
    
      let color = Math.floor(Math.random() * colors.length);

      $('#wrapper').animate(
        {
          color: colors[color]
        },
        1000
      );

      $('html body').css(
        "background-image", backimg[color]
      );
      $('html body').animate(
        {
          opacity: 1
        }, 1000
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



