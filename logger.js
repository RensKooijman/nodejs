const logger = require('pretty-log');
const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();

function log(req, res, next){
    console.log(new Date(), req.method, req.url);
    next();
}

router.use((req, res, next) => {
    console.log(new Date(), req.method, req.url);
    next();
})

function welcome(req, res, next){
    res.writeHead(200, {
        'Content-type': 'application/json'
    });
    res.write('{"naam": "piet"}');
    next();
}

function listUsers(req, res, next){
    res.writeHead(200, {
        'Content-type': 'application/json'
    });
    res.write('{"users":[{"name": "Piet"}, {"name": "Jan"}, {"name": "Marie"}]}');
    next();
}

function addUser(req, res, next){
    res.writeHead(200, {
        'Content-type': 'application/json'
    });
    res.write('{"msg": "user added"}')
    next();
}
app.use('/users/:id', log, function (req, res, next){
    console.log(req.params.id);
    next();
});
router.use('/users/', log, function (req, res, next){
    console.log('je ma heeft aids');
    next();
});
router.get('/users/', log, listUsers);
router.post('/users/', log, addUser);
router.get('/', log, welcome);
app.use('/', router);
http.createServer(app).listen(3000, function() {
    logger.success('gestard');
    logger.error('father not found');
    logger.warn('your moms fetch time takes long (file too big)');
    logger.success('no family');
    logger.debug('life');
})
