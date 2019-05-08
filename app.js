let express = require('express'),
    mongoose = require('mongoose'),
    bluebird = require('bluebird');
    bodyParser = require('body-parser');





mongoose.Promise = bluebird;

// Local
let db = mongoose.connect('mongodb://localhost/api/frmwrk');


let Job  = require('./models/jobModel');
let Sollicitatie = require('./models/sollicitatieModel');
jobRouter = require('./routes/jobRoutes')(Job, Sollicitatie);


let app = express();
let port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');
    if (req.accepts('json' || 'xml' || 'x-www-form-urlencoded')) {
        next();
    } else {
        res.sendStatus(406);
    }
});

app.use('/api/vacatures', jobRouter );
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




app.use('/api', jobRouter);



app.get('/',function(req, res){
    res.send('Welkom op de FRMWRK API, lees de documentatie voor verdere uitleg...');
});

app.listen(port, function(){
    console.log('Gulp is running my app on PORT:  ' + port);
});

