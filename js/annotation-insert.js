// The core of the bookmarklet; replaced selected text with annotation markup and makes sure dependencies are included.

(function(){
  
  // External scripts and styles
  var scriptUrl = 'https://cdn.theatlantic.com/media/interactives/2015/09/incarceration/annotations.js?v=4';
  var styleUrl = 'https://cdn.theatlantic.com/media/interactives/2015/09/incarceration/annotations.css?v=3';
  var ckeStyleUrl = 'https://s3.amazonaws.com/the-atlantic/annotations/cke-annotations.css';
  var annotationTrackUrl = 'https://s3.amazonaws.com/the-atlantic/annotations/annotation-track.js'
  
  // Get content of story
  var content = $('#cke_5_contents .cke_wysiwyg_frame').contents().find('html')
  
  // Add dependencies (if they don't already exist)
  var hasDependency = false;
  [{ keyword: 'annotations.js', text: scriptUrl, start: '<script type="text/javascript" src="', end: '"></script>'}, 
  { keyword: 'annotations.css', text: styleUrl, start: '<link rel="stylesheet" href="', end: '" />'},
  { keyword: 'annotation-track.js', text: annotationTrackUrl, start: '<script type="text/javascript" src="', end: '"></script>' }].forEach(function(tag){
    if(content.html().indexOf(tag.keyword) == -1)
      CKEDITOR.instances.id_content.document.getBody().appendHtml(tag.start + tag.text + tag.end)
  });
  
  // Add stylesheet that forces MCE to show annotations
  if( !content.find('#cke-annotation-display').length )
    CKEDITOR.instances.id_content.document.getBody().appendHtml('<link rel="stylesheet"  id="cke-annotation-display" href="' + ckeStyleUrl + '" />');
  
  // Replace selected text with annotation code
  var selectedText = CKEDITOR.instances.id_content.getSelection().getSelectedText();
  var selectedElement = $(CKEDITOR.instances.id_content.getSelection().getStartElement().$)
  var id = new Date().getTime();
  var selectionReplacement = '<a class="annotation-link" data-annotation="' + id + '" href="#">' +
    selectedText +
    '</a>' +
    '<span class="annotation" data-annotation="' + id + '" style="display: none;"> </span>';
  
  selectedElement.html( selectedElement.html().replace(selectedText, selectionReplacement ));
  
  
}).call(this)
