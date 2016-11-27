$(function(){

  function url(term){
    return 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + term + '&limit=10&format=json';
  }

  $('form').submit(function(event){
    event.preventDefault();
    getArticle($('input:eq(0)').val())
  })

  function getArticle(term){
    $.ajax({
      url:url(term),
      dataType: 'jsonp',
      success: inputData     
    });
  };

  function inputData(data){
    console.log(data);
  }

});