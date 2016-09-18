var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var article1 = {
  title: ' article-1 lannisters send their regards',
  heading: 'ARTICLE -1' ,
  date: 'sep 25 , 2016',
  content:`                    <p>
                        GAME OF THORNES rules this is the content of the webpage.GAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpage
                    </p>
                    <p>
                        GAME OF THORNES rules this is the content of the webpage.GAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpage
                    </p>
                    <p>
                        GAME OF THORNES rules this is the content of the webpage.GAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpage
                    </p>` 
};
function createTemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
var htmlTemplate = `<html>
    <head>
        <title>
            ${title}
        </title>
      <meta name="viewport" content="width-device-width , initial scale-1"> 
      <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
        <div class="container">
        <div>

            <a href="/">Home</a>
            
            </div>
        <h3>
            ${heading}
            </h3>
            <div>
                ${date}
                </div>
                <div>
                   ${content}
                </div>
            </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
 res.send(createTemplate(article1));
});
app.get('/article-1', function (req,res){
  res.sendFile(path.join(__dirname, 'ui', 'article-1.html'));
});
app.get('/article-2', function (req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-2.html'));
});
app.get('/article-3', function (req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-3.html')); 
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
