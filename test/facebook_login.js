var chai = require('chai');    
var assert = chai.assert;    
var server;

describe("login using social sites",function () {

    this.timeout(40000);


    beforeEach(function () {
        server = require('../../../server').server;

        // browser = new Browser({ site: 'http://localhost:3000' });



    });


    it("should login with facebook",function (done) {

        Browser.visit('http://127.0.0.1:3000/auth/facebook',function (err,brw) {

            if(err){
                throw err;
            }

            brw.fill('email','spanner131@hotmail.co.uk').fill('pass', 'password')
                .pressButton('login', function (err,brow) {
                    brw.assert.success();
                    done();
                });

        });



    });


    afterEach(function () {
        server.close();
    });

});