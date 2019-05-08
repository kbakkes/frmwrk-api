let  express = require ('express');

let routes = function(Sollicitatie){

    let vacatureRouter = express.Router();


    // Baan zoeken op basis van ID
    vacatureRouter.use('/vacatures/:_id',function(req,res,next) {
        console.log(req);
        Sollicitatie.findById(req.params._id, function (err, vacature) {
            if (err)
                res.status(500).send(err);
            else if (vacature) {
                req.vacature = vacature;
                next();
            }
            else {
                res.status(404).send('Geen vacature gevonden...');
            }
        });
    });





    // Route voor Job ID
    vacatureRouter.route('/sollicitaties/:_id')
        .get(function(req,res) {
            Sollicitatie.find({'_id': req.params._id }, function(err,docs){
                //     Sollicitatie.find({'voornaam': 'Karim' }, function(err,docs){
                console.log(docs);
                if (err)
                    res.status(500).send(err);
                else if(docs)
                {
                    res.json(docs);
                }
                else {
                    res.status(404).send('Geen vacature gevonden...');
                }

            });
        })






        .put(function(req,res){
            if (req.body.voornaam && req.body.achternaam && req.body.emailadres && req.body.werkervaring) {

                console.log(req);

                req.job.voornaam = req.body.voornaam;
                req.job.achternaam = req.body.achternaam;
                req.job.emailadres = req.body.emailadres;
                req.job.werkervaring = req.body.werkervaring;



                req.job.save();
                res.json(req.job);
            }
            else {
                res.status(422).send("Some fields are empty")
            }
        })

        .delete(function(req, res){
            req.job.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.send(204)
                }
            });
        })

        .options(function (req, res) {
            res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, DELETE, OPTIONS');
            res.header('Allow', 'GET, PATCH, PUT, DELETE, OPTIONS');
            res.sendStatus(200);
        });



    return vacatureRouter;
};


module.exports = routes;