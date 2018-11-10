var express = require('express'),
    app = express(),
    port = process.env.PORT || 3333,
    path = require('path'),
    environment = process.env.NODE_ENV,
    twitter = require('twitter'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    twitterConfig = {
      consumer_key: 'n7lgJasN3XtVS3mLMC4vnhYQW',
      consumer_secret: 'fKPSRLI2hevXvRjb0q6ofHNqIEcU0hfXuDiLSPF2MiF6uHYgdg',
      access_token_key: '2287077044-DMN93Kfaf9ghTWvwomuce4th8CbMXjqG77w6a5x',
      access_token_secret: 'Bi71RWfxn5U8QqWFv9CZguJw1MntYO5Hzl1gPTgnES6xu'
    },
    tweets = new twitter(twitterConfig);

app.use(express.static('./src/client/'));

// start up the node server
http.listen(port, function(){
    console.log('listening on port ' + port);
});


const queue = [];

const stream = tweets.stream('statuses/filter', { track: 'trump' }, function(stream) {
  
  stream.on('data', function (data) {
    if (queue.length < 100) {
      if(data.user != null && data.user.location != null) {
        queue.push({text: data.text, location: data.user.location})
      }
    }
  })
});

// create a socket.io connection with the client
io.on('connection', function (socket) {
  console.log('User connected. Socket id %s', socket.id);

  setInterval(function() {
    if (queue.length > 0) {
      const tweet = queue.pop()
      console.log(tweet.text)
      socket.emit('tweet', tweet);
    }
  }, 500);

  socket.on('disconnect', function () {
      console.log('User disconnected. %s. Socket id %s', socket.id);
  });
});