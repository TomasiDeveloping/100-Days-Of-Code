const validationSession = require('../util/validation-session');
const validation = require('../util/validation');
const User = require('../models/user');

function getSignup(req, res) {
    const sessionErrorData = validationSession.getSessionErrorData(req, {
        email: '',
        confirmEmail: '',
        password: ''
    });

    res.render('signup', {
        inputData: sessionErrorData
    });
}

function getLogin(req, res) {
    const sessionErrorData = validationSession.getSessionErrorData(req, {
        email: '',
        password: ''
    });

    res.render('login', {
        inputData: sessionErrorData
    });
}

async function signup(req, res) {
    const userData = req.body;
    const entredEmail = userData.email;
    const enteredConfirmEmail = userData['confirm-email'];
    const enteredPassword = userData.password;

    if (!validation.userCredentialsAreValid(entredEmail, enteredConfirmEmail, enteredPassword)) {
        validationSession.flashErrorsToSession(req, {
            message: 'Invalid input - please check your data.',
            email: entredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword
        }),
        function () {
            res.redirect('/signup');
        };

        return;
    }

    const newUser = new User(entredEmail, enteredPassword);
    const userExistsAleready = await newUser.existsAleready();

    if (userExistsAleready) {
        validationSession.flashErrorsToSession(req, {
            message: 'User exists already!',
            email: entredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword
        }, function () {
            res.redirect('/signup');
        });
        return;
    }

    await newUser.sigmup();

    res.redirect('/login');
}

async function login (req, res) {
    const userData = req.body;
    const entredEmail = userData.email;
    const enteredPassword = userData.password;

    const newUser = new User(entredEmail, enteredPassword);
    const existingUser = await newUser.getUserWithSameEmail();

    if (!existingUser) {
        validationSession.flashErrorsToSession(req, {
            message: 'Could not log you in - please check your credentials!',
            email: entredEmail,
            password: enteredPassword
        }, function () {
            res.redirect('/login');
        });

        return;
    }
    
    const success = await newUser.login(existingUser.password);

    if (!success) {
        validationSession.flashErrorsToSession(req, {
            message: 'Could not log you in - please check your credentials!',
            email: entredEmail,
            password: enteredPassword
        }, function () {
            res.redirect('/login');
        });

        return;
    }

    req.session.user = {id: existingUser._id, email: existingUser.email};
    req.session.isAuthenticated = true;
    req.session.save(function () {
        res.redirect('/admin')
    });
}

function logout(req, res) {
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect('/');
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
    login: login,
    logout: logout
}