const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = require('../util/salt');
exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found");
      return res.redirect("/signup")
    }
    const matched = await bcrypt.compare(req.body.password,user.password);
    if(matched){
      req.session.isLoggedIn = true;
      req.session.user = user;
      console.log("User matched");
      await req.session.save();
      return res.redirect("/");
    }
      res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }

  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getSignup = (req, res) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  })
}

exports.postSignup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.redirect("/signup");
    }
    const hashPassword = await bcrypt.hash(password, saltRounds)
    user = new User({ email, password: hashPassword, cart: [] });
    user.save();
    res.redirect('/login');
  }
  catch (err) {
    console.log(err);
  }

}