$(function(){

  function url(term){
    return 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + term + '&limit=10&format=json';
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
    console.log(data);
    var results = $('#results');
    results.empty()
    results.append('<h4 id="results-header">Results for <em>' + data[0] +'</em>:</h4>');
    for(var i = 0; i < 10; i++){
      var heading = '<a href="' + data[3][i] + '"><h5>' + data[1][i] + '</h5></a>';
      var body = '<p>' + data[2][i] + '</p>';
      results.append(heading+body);
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