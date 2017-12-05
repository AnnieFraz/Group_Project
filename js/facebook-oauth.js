

//console.log(process.env.APP_ID);

window.fbAsyncInit = function() {
        FB.init({
          appId      : '1558967270863768',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.8'
        });
    // Check whether the user already logged in
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            //display user data
            //getFbUserData();
        }
    });
};

// Load the JavaScript SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Facebook login with JavaScript SDK
function fbLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            // Get and display the user profile data
            getFbUserData();
        } else {
            document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
        }
    }, {scope: 'email'});
}

// // Fetch the user profile data from facebook
function getFbUserData(){
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {
        //document.getElementById('fbLink').setAttribute("onclick","fbLogout()");
       // document.getElementById('fbLink').getElementsByClassName('icon_title')[0].innerHTML = 'Logout from Facebook';
       console.log(response);
       writeToDB(response);
        document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.first_name + '!';
        document.getElementById('userData').innerHTML = '<p><b>FB ID:</b> '+ response.id+'</p><p><b>Name:</b> '+ response.first_name+' '+ response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Gender:</b> '+response.gender+'</p><p><b>Locale:</b> '+response.locale+'</p><p><b>Picture:</b> <img src="'+response.picture.data.url+'"/></p><p><b>FB Profile:</b> <a target="_blank" href="'+response.link+'">click to view profile</a></p>';
        document.getElementById('login-form').style.display = "none";
        document.getElementById('logout-div').style.display = "block";
    });
}

// Logout from facebook
function fbLogout() {
    FB.logout(function() {
        //document.getElementById('logout-btn').setAttribute("onclick","fbLogin()");
        //document.getElementById('logout-btn').getElementsByClassName('icon_title')[0].innerHTML = 'Connect with Facebook';
        document.getElementById('userData').innerHTML = '';
        document.getElementById('status').innerHTML = 'You have successfully logout from Facebook.';
        document.getElementById('login-form').style.display = "block";
        document.getElementById('logout-div').style.display = "none";
    });
}

function writeToDB(user) {
    var MongoClient = require('mongodb').MongoClient, assert = require('assert');
    // Connection URL
    var url = 'mongodb://localhost:27017/myproject';
    // check if user exists
    
    
    
    // write to db
    
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        
        // db.users.insert({
        // user_id: user.id, first_name: user.first_name, last_name: user.last_name,
        // password: " ", email: user.email, city: " ",
        // picture_url: user.picture.data.url});
        
        db.close();
    });
}