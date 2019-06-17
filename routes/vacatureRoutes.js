let  express = require ('express');

let routes = function(Sollicitatie){

    let sollicitatieRouter = express.Router();




    sollicitatieRouter.use('/sollicitaties/:_id',function(req,res,next){
        Sollicitatie.findById(req.params._id, function(err,sollicitatie){
            if (err)
                res.status(500).send(err);
            else if(sollicitatie)
            {
                req.sollicitatie = sollicitatie;
                next();
            }
            else {
                res.status(404).send('Geen Sollicitatie gevonden...');
            }

        });
        });


    // Return alle sollicitaties
    sollicitatieRouter.route('/sollicitaties/')
        // Validatie
        .get(function(req,res) {
            if(req.headers.token !== 'Karim'){
                res.status(203).send('Je hebt niet genoeg rechten om dit te bekijken...');
                return;
            }
        Sollicitatie.find({},function (err, docs) {
            if (err)
                res.status(500).send(err);
            else if (docs) {
                res.json(docs);
            }
            else {
                res.status(404).send('Geen vacature gevonden...');
            }
        });
    });


    sollicitatieRouter.route('/sollicitaties/:_id')
        .get(function(req,res) {
            // if(req.headers.token !== 'Karim'){
            //     res.status(203).send('Je hebt niet genoeg rechten om dit te bekijken...');
            //     return;
            // }
            Sollicitatie.find({'_id': req.params._id }, function(err,docs){
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
                // if(req.headers.token !== 'Karim'){
                //     res.status(203).send('Je hebt niet genoeg rechten deze actie uit te voeren...');
                //     return;
                // }
                req.sollicitatie.voornaam = req.body.voornaam;
                req.sollicitatie.achternaam = req.body.achternaam;
                req.sollicitatie.emailadres = req.body.emailadres;
                req.sollicitatie.werkervaring = req.body.werkervaring;
                req.sollicitatie.vaardigheden = req.body.vaardigheden;
                req.sollicitatie.avatar = req.body.avatar;


                req.sollicitatie.save();
                res.json(req.sollicitatie);
            }
            else {
                res.status(422).send("Some fields are empty")
            }
        })

        .delete(function(req, res){
            if(req.headers.token !== 'Karim'){
                res.status(203).send('Je hebt niet genoeg rechten deze actie uit te voeren...');
                return;
            }
            Sollicitatie.deleteOne({'_id': req.params._id} ,function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(204).send('Sollicitatie is verwijderd...')
                }
            });
        })

        .options(function (req, res) {
            res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, DELETE, OPTIONS');
            res.header('Allow', 'GET, PATCH, PUT, DELETE, OPTIONS');
            res.sendStatus(200);
        });

    return sollicitatieRouter;
};


module.exports = routes;