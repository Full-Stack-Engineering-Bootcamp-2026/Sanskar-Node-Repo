const bcrypt = require('bcryptjs');
const sendEmail = require('../util/email')
const User = require('../models/user');
const crypto = require('crypto')

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email })
  if (!user) {
    req.flash('error', 'Invalid email or password.');
    return res.redirect('/login');
  }
  try {
    const doMatch = await bcrypt.compare(password, user.password)
    if (doMatch) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    }
    req.flash('error', 'Invalid email or password.');
    res.redirect('/login');
  }
  catch (err) {
    console.log(err);
    res.redirect('/login');
  }
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  try {
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
      req.flash('error', 'E-Mail exists already, please pick a different one.');
      return res.redirect('/signup');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      cart: { items: [] }
    });
    console.log("User:", user);
    await user.save();
    res.redirect('/login');
    const html = `<h1>Registered</h1>`
    return sendEmail(email, html);
  }
  catch (err) {
    console.log(err);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
}
exports.postReset = async (req, res, next) => {
  try {
    const buffer = await crypto.randomBytes(32);
    const token = buffer.toString('hex');
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.flash("error", 'No account found with that email');
      return res.redirect('/reset');
    }
    user.resetToken = token;
    user.resetTokenExpiration = Date.now();
    await user.save();
    const html = `<p>Click  <a href="http://localhost:3001/reset/${token}">link</a> to reset</p>`;
    await sendEmail(req.body.email, html);
  }
  catch (err) {
    console.log(err);
  }
}


exports.getNewPassword = async (req, res, next) => {
  const token = req.params.token;
  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $lt: Date.now() } });
    console.log(user);
    if (!user) {
      req.flash("error", "Token is invalid or expired");
      return res.redirect('/reset');
    }
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    }
    else {
      message = null;
    }
    res.render('auth/new-password', {
      path: '/new-password',
      pageTitle: 'New Password',
      errorMessage: message,
      userId: user._id.toString(),
      passwordToken:token
    });
  }
  catch (err) {
    console.log(err);
  }

}

exports.postNewPassword = async (req, res, next) => {
  const {password,userId,passwordToken} = req.body;
  
  try {
    const user = await User.findOne({resetToken:passwordToken,resetTokenExpiration:{$lt:Date.now()},_id:userId});
    const hashedPassword = await bcrypt.hash(password,12);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }
}
