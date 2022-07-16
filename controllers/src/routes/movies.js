const router = require('express').Router()
const cors = require('cors')
const { corsOptions } = require('../config/cors')


const Movie = require('../models/Movie')

router.get('/api/watchlist/:id', cors(corsOptions), async (req, res)=>{
    const user = req.params.id
    const watchlist = await Movie.find({list: "watchlist", user: user}).sort({date: 'desc'})
    res.send(watchlist);
})

router.get('/api/watched/:id', cors(corsOptions), async (req, res)=>{
    const user = req.params.id
    const watched = await Movie.find({list: "watched", user: user}).sort({date: 'desc'})
    res.send(watched);
})

router.post('/api/addtowatchlist', cors(corsOptions), async (req, res)=>{
    const { id, title, movie, user } = req.body;
    const newMovie = new Movie({ id, title, movie, user });
    newMovie.list = "watchlist";
    await newMovie.save();
    res.send({message: `Added to WatchList: movie "${title}" by user ${user}`, movie: newMovie})
    }
);

router.post('/api/addtowatched', cors(corsOptions), async (req, res)=>{
    console.log(req.body)
    const { id, title, movie, user } = req.body;
    const newMovie = new Movie({ id, title, movie, user});
    newMovie.list = "watched";
    res.send({message: `Added to Watched: movie "${title}" by user ${user}`, movie: newMovie });
    await newMovie.save();
    }
);

router.delete('/api/deletefromwatchlist/:user/:id', cors(corsOptions), async (req, res)=>{
    await Movie.deleteOne({list: "watchlist", user: req.params.user, id: req.params.id})
    res.send({message: `Deleted from WatchList: ${req.params.id} by user ${req.params.user}`})
})

router.delete('/api/deletefromwatched/:user/:id', cors(corsOptions), async (req, res)=>{
    await Movie.deleteOne({list: "watched", user: req.params.user, id: req.params.id})
    res.send({message: `Deleted from Watched: ${req.params.id} by user ${req.params.user}`})
})

module.exports = router;
