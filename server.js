var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user : 'srivardhan-reddy',
    database : 'srivardhan-reddy',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));

var articles = {
'article-1' : {
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
},
'article-2' : {
    title: ' article-2 lannisters send their regards',
  heading: 'ARTICLE -2' ,
  date: 'sep 15 , 2016',
  content:`            <p>
                        GAME OF THORNES rules this is the content of the webpage.GAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpage
                    </p>
                    <p>
                        GAME OF THORNES rules this is the content of the webpage.GAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpage
                    </p>` },
'article-3' : { 
    title: ' article-3 lannisters send their regards',
  heading: 'ARTICLE -3' ,
  date: 'sep 5 , 2016',
  content:`           <p>
                  GAME OF THORNES rules this is the content of the webpage.GAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpageGAME OF THORNES rules this is the content of the webpage
                   </p>`} 
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
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);
app.get('/test-db', function(req,res){
    pool.query('SELECT * FROM test', function (err,result){
       if (err)
       { res.status(500).send(err.tostring());
       }
       else
       {
            res.send(JSON.stringify(result.rows));
       }
           
    });
});
var counter = 0;
app.get('/counter', function(req,res){
   counter = counter + 1;
   res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function(req,res){
  var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req,res){
pool.query("SELECT * FROM article WHERE title = '"+req.params.articleName+"'",function (err,result){
   if(err)
   {
       res.status(500).res.send(err.toString());
       
   }
   else{
       if(res.rows.length === 0)
       {
           res.status(404).send('Article not found');
       }
       else
       {
           var articleData = result.rows[0];
           res.send(createTemplate(articleData));
       }
   }
});
  res.send(createTemplate(articleData));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
