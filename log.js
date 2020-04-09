const express = require('express');
const bodyParser = require('body-parser');
const logger = require('fluent-logger');
const app = express();

logger.configure('node_logger', {
    host: 'fluentd',
    port: 24224,
    timeout: 3.0,
    reconnectInterval: 600000
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/log', function(request, response) {
    logger.emit('guests', request.body);
    response.send('>>>>>>>>> LOG SENT | by node.js <<<<<<<<<<<');
});

const port = process.env.PORT || 8082;

app.listen(port, function() {
    console.log("Listening on " + port);
});