$(function(){

  $('#search-field').focus();                   // set focus for quick searching

  function url(term){
    return 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + term;
  }

  function submitSearch(){
    if($('#search-field').val().replace(/\s/g,'') != ''){ // make sure field contains text
      $.ajax({
        url:url($('#search-field').val()),
        dataType: 'jsonp',
        success: inputData     
      });
      $('#search-bar').css('top','20px');
    }
  }

  function inputData(data){ // how to input the data once response is received
    var results = $('#results');
    results.empty();

    if (data.query){

      var articles = data.query.pages;

      results.append('<h4 id="results-header">Results for <em>' + $('#search-field').val() +'</em>:</h4>');
      
      var keys = (Object.keys(articles));

      keys.sort(function(a,b){                    // sorting articles by their "index" key
        return articles[a].index - articles[b].index
      })

      for (var i = 0; i < 10; i++){               // displaying articles in order
        var article = (articles[keys[i]]);
        results.append('<div class="articles"><a href="https://en.wikipedia.org/?curid=' 
          + article.pageid + '" target="_blank"><h5>' + article.title + '</h5></a>'
          + '<p>' + article.extract + '</p></div>');
        
      }
    } else {
        results.append('<h4 id="results-header">No results for <em>' + $('#search-field').val() +'</em>:</h4>');
    }         





  }

  $('#search-field').keydown(function(event){
    if(event.which === 13){                   // if the keydown event was the 'enter' key
      event.preventDefault();                 // stops new line creation
      submitSearch();
      $(this).blur();                         // remove focus after 'enter'
    }    
  })

  $('#search-btn').click(function(){
    submitSearch();
  })

  $('#search-field').focus(function(){ // selects text
    $(this).select()                   // making it quicker to overwrite previous search
  });



});