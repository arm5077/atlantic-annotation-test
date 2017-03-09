var instance_id = new Date().getTime().toString() + Math.round(Math.random() * 100);
$(".annotation-link").each(function(i, annotationLink){
  $(annotationLink).one("click", function(){
    $.ajax({
      url: 'https://atlantic-annotation-tracker.herokuapp.com',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ "instance_id": instance_id, "article_name": $('title').text(), "time": Date(), "phrase": $(this).text() })
    })
  })
});