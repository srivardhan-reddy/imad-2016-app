var submit = document.getElementById('Submit_btn');
submit.onclick = function () {
     var request = new XMLHttpRequest();
  
  request.onreadystatechange = function(){
  if(request.readyState === XMLHttpRequest.DONE)
  {
      if(request.status === 200)
      {
          console.log('user is logged in');
          alert('logged in successfully');
          
                }
        else if(requset.status === 403){
            alert('username/password is invalid');
        }       
        else if (request.status === 500)
        {
            alert('DDoS attack your account was deleted!!!! yay!! peace');
        }
 
  }
  };
  var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
  request.open('POST','http://srivardhan-reddy.imad.hasura-app.io/login',true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({username: username,password: password}));
  };