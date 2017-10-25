const express = require('express'),
      router = express.Router(),
      Users = require('../models/user'),
      passport = require('passport'),
      jwt = require('jsonwebtoken'),
      config = require('../config/database'),
      _ = require('lodash');

//Register
router.post('/register', (req, res, next) => {
    const myUser = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        expenses: []
    };
    let newUser = new Users.User(myUser);
    Users.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

//Authenticate-login
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    Users.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: "User not found"});
        }
        Users.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 //1 week
                });
                res.json({success: true, token: 'JWT ' + token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }});
            } else {
                return res.json({success: false, msg: "Invalid password"});
            }
        });
    });
});

//get user profile
router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

//log expenses    test code
router.put('/expenses', (req, res, next) => {
    let newExpense = new Users.Expense({
        category: req.body.expense.category,
        amount: req.body.expense.amount,
        date: req.body.expense.datepickerModel
    });
    Users.getUserById(req.body.id, (err, user) => {
        console.log(req);
        if (err) {
            res.json({success: false, msg: 'could not find user', error: err});
        }
        if (user) {
            user.expenses.push(newExpense);
            user.save((err) => {
                if (err) {
                    res.json({success: false, msg: 'error during new expense log', error: err});
                }
                res.json({success: true, msg: 'expense logged succesfully'});
            });
        } else {
            res.json({msg: 'user not found'});
        }
    });
});

router.get('/expenses', (req, res, next) => {
    console.log(res.send(this.user.username));
});

module.exports = router;


/* old code
router.put('/expenses', (req, res, next) => {
    let newExpense = new Expense({
        category: req.body.category,
        amount: req.body.amount,
        datepickerModel: req.body.datepickerModel
    });
    res.json(newExpense);
});

*/