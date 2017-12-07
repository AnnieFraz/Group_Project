/* global EventEmitter, Topics, io, Peer */
/** @jsx React.DOM */

$(function () {
  'use strict';
  
  $('#username-input').keypress(function(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
      // Enter pressed
      initChat($('#container')[0],
      $('#username-input').val());
      return false;
    }
  })
  
  $('#connect-btn').click(function () {
    initChat($('#container')[0],
      $('#username-input').val());
  });

  function initChat(container, username) {
    var proxy = new ChatProxy();
    React.renderComponent(<ChatBox chatProxy={proxy}
      username={username}></ChatBox>, container);
  }

  

});
