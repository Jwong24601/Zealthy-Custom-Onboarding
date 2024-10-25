//Middlewares to create a user session and to check if session is available.
const StateModel = require('../models/stateModel.js');
const sessionController = {};

//startSession - create and save a new Session into the database by storing user/email into Admin state model.
sessionController.startSession = async (req, res, next) => {
  const { email, password } = req.body;
  res.locals.user = email;
  res.locals.password = password;
  const user = res.locals.user;
  try {
    const state = await StateModel.findOne();
    if (!state) {
      const session = await StateModel.create({
        email: user,
        page2Components: ['birthdate', 'address'],
        page3Components: ['aboutMe'],
      });
      console.log('default created');
    }
    await StateModel.updateOne({ email: user });
    return next();
  } catch (err) {
    return next({
      log: 'Create session error',
      message: 'could not create new session',
      status: 500,
    });
  }
};

module.exports = sessionController;
