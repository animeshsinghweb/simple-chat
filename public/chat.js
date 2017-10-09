// Make connection
var socket = io.connect('http://localhost:5000');

// Query DOM
var message = $('#message'),
    handle = $('#handle'),
    btn = $('#send'),
    feedback = $('#feedback'),
    output = $('#output');

// Emit events

$(btn).click(() => {
    socket.emit('chat', {
        message: $(message).val(),
        handle: $(handle).val()
    });
    $(message).val('');
});

$(message).on('keypress', (e) => {
    if (e.which == 13) {
        socket.emit('chat', {
            message: $(message).val(),
            handle: $(handle).val()
        });
        $(message).val('');
    } else {
        socket.emit('typing', {
            handle: $(handle).val()
        });
    }

});

// Listen for events
socket.on('chat', (data) => {
    $(feedback).html('');
    $(output).append('<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>')
});

socket.on('typing', (data) => {
    var msg = '<p><em>' + data.handle + ' is typing a message...</em></p>';
    $(feedback).html(msg);
});