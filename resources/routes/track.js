const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');
const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async( req, res) => {
    const tracks = await Track.find({userId: req.user._id});
    res.send(tracks);
})

router.post('/tracks', async (req, res) => {
    const { name, locations} = req.body;
    if(!name || !locations){
        return res.send({
            error: 'You must provide a name and location'
        });
    }
    try{
        const track = new Track({
            name, locations, userId: req.user._id
        })
        await track.save();
        res.send(track);
    }catch(err){
        return res.send({
            error: 'You must provide a name and location'
        });
    }
})

module.exports = router;