const mongoose = require('mongoose');
const {genSalt, hash, compare} = require("bcrypt");
const config = require("../config");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: {
    type: String,
    enum: config.ROLE,
    default: config.DEFAULT_ROLE,
  }
}, {
  timestamps: true
});


// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  // If password is modified or is a new user
  if (this.isModified('password') || this.isNew) {
    try {
      // Salt rounds determine the complexity of the hash
      const salt = await genSalt(10);
      this.password = await hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Method to compare entered password with hashed password
/**
 *
 * @param {String} enteredPassword
 * @returns {Promise<void|*>}
 */
UserSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await compare(enteredPassword, this.password);
  } catch (err) {
    throw err;
  }
};

// Method to compare entered password with hashed password
/**
 * Refer to this link: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
 * @param {String} username
 * @returns {Promise<*>}
 */
UserSchema.methods.findUsingUsername = async function (username) {
  try {
    return await mongoose.model('User').findOne({
      username: {
        $eq: username
      }
    });
  } catch (err) {
    throw err;
  }
};


module.exports = mongoose.model('User', UserSchema);
