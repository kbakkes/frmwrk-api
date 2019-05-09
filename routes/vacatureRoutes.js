let  express = require ('express');

let routes = function(Sollicitatie){

    let vacatureRouter = express.Router();


    // Return alle sollicitaties
    vacatureRouter.route('/sollicitaties/')
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


    vacatureRouter.route('/sollicitaties/:_id')
        .get(function(req,res) {
            if(req.headers.token !== 'Karim'){
                res.status(203).send('Je hebt niet genoeg rechten om dit te bekijken...');
                return;
            }
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

                console.log(req.body);

                req.s.voornaam = req.body.voornaam;
                req.s.achternaam = req.body.achternaam;
                req.s.emailadres = req.body.emailadres;
                req.s.werkervaring = req.body.werkervaring;
                req.s.vaaridgheden = req.body.vaardigheden;

                req.s.save();
                res.json(req.s);
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

    return vacatureRouter;
};


module.exports = routes;