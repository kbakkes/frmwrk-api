let  express = require ('express');

let routes = function(Job,Sollicitatie){

    let jobRouter = express.Router();

    let jobController = require('../controllers/jobController')(Job);

    jobRouter.route('/vacatures')
        .post(jobController.post)
        .get(jobController.get)
        .options(jobController.options);


        // Baan zoeken op basis van ID
    jobRouter.use('/vacatures/:_id',function(req,res,next) {
        Job.findById(req.params._id, function (err, job) {
            if (err)
                res.status(500).send(err);
            else if (job) {
                req.job = job;
                next();
            }
            else {
                res.status(404).send('Geen vacature gevonden...');
            }
        });
    });

        // Baan zoeken op basis van ID
        jobRouter.use('/vacatures/:_id/sollicitaties',function(req,res,next){
            console.log(req.params._id);
            Sollicitatie.find({'functie': req.params._id }, function(err,docs){
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



        jobRouter.route('/vacatures/:_id/sollicitaties', "POST")
            .get(function (req,res) {



                console.log('Hier moeten alle sollicitaties komen');
            })


    });

    // Route voor Job ID
    jobRouter.route('/vacatures/:jobID')
        .get(function(req,res) {
            let returnJob = req.job.toJSON();
            returnJob.sollicitaties = [];
            returnJob.sollicitaties.push({'test': 'test message'});

            res.json(returnJob);
        })

        .post(function (req,res) {
                let sollicitatie = new Sollicitatie();

                // Als alle velden aanwezig zijn kan er gepost worden
                if (req.body.voornaam && req.body.achternaam && req.body.emailadres && req.body.werkervaring) {                    console.log('gelukt');
                    sollicitatie.voornaam = req.body.voornaam;
                    sollicitatie.achternaam = req.body.achternaam;
                    sollicitatie.emailadres = req.body.emailadres;
                    sollicitatie.werkervaring = req.body.werkervaring;
                    sollicitatie.functie = req.job._doc._id;



                    sollicitatie.save(function (err, sollicitatie) {
                        res.status(201).send(sollicitatie);
                    })
                }
                else {
                    res.status(422).send("Nog niet alle velden zijn ingevult...")
                }
        })




        .put(function(req,res){
            if (req.body.functie && req.body.ervaring) {
                req.job.functie = req.body.functie;
                req.job.ervaring = req.body.ervaring;
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

        postSollicitatie = function (sollicitatie) {

        };

    return jobRouter;
};


module.exports = routes;