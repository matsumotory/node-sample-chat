$(function() {
    var socket = io.connect('http://example.com:3000');
    socket.on('connect', function() {
        console.log('connect');
    });
    socket.on('message', function(msg) {
        var date = new Date();
        $('#list').prepend($('<tr><td>' + date + ': ' + msg + '</td>'));
    });
    socket.on('disconnect', function(){
        console.log('disconnect');
    });

    $('#form').submit(function() {
        var message = $('#message');
        socket.send(message.val());
        message.attr('value', '');
        return false;
    });
});
