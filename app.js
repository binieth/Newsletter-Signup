
// my boiler plate 
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(express.static('public')); // this is where i save all of my css, images, or html(optional).
app.use(bodyParser.urlencoded({extended: true}));



// My get route. 
// This simply REQUEST data from a specific resource. 
app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
});




// My POST route.
// This will allow me to create/update a resource. in the case shown below, its updating. Thus, this simply SEND data to a server.
app.post('/', function(req, res){
 
 var firstName = req.body.fName;
 var lastName = req.body.lName;
 var email = req.body.email;

 var data = {
     members:[
         {
            email_address: email,
            status: 'subscribed', 
            merge_fields: {
             FNAME: firstName,
             LNAME: lastName
         }
         }
     ]
 };

 var jsonData = JSON.stringify(data);

var options = {
    url: 'https://us3.api.mailchimp.com/3.0/lists/a2fb52c34f', 
    method: 'POST',
    headers: {
        'Authorization': 'bini1 e654695bbba044c72bab4c0d7332ef81-us3'
    },
    body: jsonData

};

request(options, function(error, response, body){
    if(error) {
        res.sendFile(__dirname + '/failure.html');
    } else {
        if(response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
    } else {
        res.sendFile(__dirname + '/failure.html');    
    }
}

});


});

app.post('/failure', function(req, res){
    res.redirect('/');
});


// my port
app.listen(process.env.PORT || 3000, function(){
    console.log('The server is running on heroku & port 3000.')
});

