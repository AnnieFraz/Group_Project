

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
           // getFbUserData();
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


$("")

// Facebook login with JavaScript SDK
function fbLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            // Get and display the user profile data
            getFbUserData();
            
        } else {
            //document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
        }
    }, {scope: 'email'});
}

// // Fetch the user profile data from facebook
function getFbUserData() {
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {
        console.log(response);
        $.ajax({
            url: '/handle_login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(response),
            success: function (data) {
                console.log('yaas');
                //location.reload();
            }
        });
        location.href = '/events';
    });
}

// // Logout from facebook
function fbLogout() {
    FB.logout(function() {
        //document.getElementById('logout-btn').setAttribute("onclick","fbLogin()");
        //document.getElementById('logout-btn').getElementsByClassName('icon_title')[0].innerHTML = 'Connect with Facebook';
       /* document.getElementById('userData').innerHTML = '';
        document.getElementById('status').innerHTML = 'You have successfully logout from Facebook.';
        document.getElementById('login-form').style.display = "block";
        document.getElementById('logout-div').style.display = "none";
        */
    });
}

