let stylesheets = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
    '../public/stylesheets/style.css'
  ];
  
function createStylesheet( href ) {
  let link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet'
  link.href = href;
  return link;
}

const appendStylesheets = stylesheets.map(function (sheet) {
  const createdLink = createStylesheet(sheet);
  return createdLink;
});

appendStylesheets.forEach(function (link) {
  document.getElementsByTagName('head')[0].appendChild(link);
});