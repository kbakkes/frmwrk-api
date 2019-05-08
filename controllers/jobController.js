"use strict";

let jobController = function(Job) {

    let post = function (req, res) {
        let job = new Job();

        console.log(job);

        if (req.body.functie && req.body.ervaring) {
            job.functie = req.body.functie;
            job.ervaring = req.body.ervaring;

            job.save(function (err, job) {
                res.status(201).send(job);
            })
        }
        else {
            res.status(422).send("Nog niet alle velden zijn ingevult...")
        }
    };


    let get = function (req, res, next) {
        console.log("get");
        let query = {};

        if (req.query.client) {
            query.client = req.query.client;
        }

        Job.find().exec((err) => {
            if (err) {
                return next(err);
            }
            let jobs = {};
            let exclude = {__v: 0};

            Job.find({}, exclude)
                .exec((err, jobs) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        let returnJobs = [];

                        jobs.forEach(function (element, index, array) {
                            let newJobs = element.toJSON();
                            returnJobs.push(newJobs);

                        });
                        res.json(returnJobs);
                    }
                });
        });
    };


    let options = function (req, res) {
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Allow', 'GET, POST, OPTIONS');
        res.send(200);
    };


    return {
        post: post,
        get: get,
        options: options
    }
};

module.exports = jobController;

