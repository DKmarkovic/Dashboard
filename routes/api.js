const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb+srv://DashboardML:tBATwS29eYYxRLdX@cluster0.nioznja.mongodb.net/"
const jwt = require('jsonwebtoken')


/*new connect for Database */
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected Successfully'))
.catch((err) => { console.error(err); });

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

router.get('/', (req, res) => {
    res.send('From API route')
})

/*Post for registration 
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)

/* new save data for User 
    user.save().then(()=>{
        let payload = { subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token});
    }).catch((error)=>{
        console.log(error);
    })  
    
})*/


router.post('/register', (req, res) => {
    let userData = req.body; // The user data sent in the request body
    let user = new User(userData); // Create a new User instance with the received data
  
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err); // Log any error that occurs during user registration
        res.status(500).send({ error: 'Registration failed' });
      } else {
        // If registration is successful, create a payload for the token
        let payload = { subject: registeredUser._id };
  
        // Sign a token with the payload and a secret key ('secretKey')
        let token = jwt.sign(payload, 'secretKey');
  
        // Send the token as a response
        res.status(200).send({ token });
      }
    });
  });
  


/* Post for login check */
router.post('/login', (req, res) => {
    let userData = req.body

User.collection.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error)
        } else {
            if(!user) {
                res.status(401).send('Invalid email')
            } else
                if(user.password !== userData.password){
                    res.status(401).send('Invalid password')
                } else {
                    let payload = {subject: user._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

router.get('/special', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

module.exports = router


