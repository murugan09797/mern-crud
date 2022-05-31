const express = require("express");
const router = express.Router();
const userRouter = require("./userSchema")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
const app = express();

//create method

router.post("/user", async (req, res) => {
      
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var data = new userRouter({
        user_name: req.body.userName,
        email: req.body.email,
        password: hashedPassword
    },
    function (err, user) {
    console.log("GUYDG", data,user)

        if (err) return res.status(500).send("There was a problem registering the user.")
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      }

    )
    
    await data.save();
    console.log('data', data)
    res.json(data);
    // console.log("res",res)
    // res.json("data")

})

//put data

router.put("/update", async(req,res) => {
    var update = await userRouter.updateOne({id:req.body._id}, {$set:{
     
        user_name : req.body.user_name,
        email : req.body.email,
        password : req.body.password,
         
    }});
    // await update.save();
    console.log('data', update)
    res.json(update);

})

//get data
router.get('/userData', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      res.status(200).send(decoded);
    });
  });

//delete data

router.delete("/delete", async(req,res)=>{
    var deleteData  = await userRouter.findByIdAndRemove(req.body._id).then(e => {
        res.json({message : "Deleted Successfully"});
res.json(deleteData)

    })
})

module.exports = router;