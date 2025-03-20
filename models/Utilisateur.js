const mongoose = require('mongoose');
const {genSalt, hash, compare} = require("bcrypt");
const config = require("../config");
const UtilisateursSchema = new mongoose.Schema({
    nom: { type: String, required: true},
    prenom: { type: String, required: true },
    nom_utilisateur: { type: String, required: true, unique: true},
    mot_de_passe: { type: String, required: true },
    profil: {
        type: String,
        enum: config.PROFIL,
        default: config.DEFAULT_PROFIL,
    }
}, {
    timestamps: true
});


// Hash the password before saving the user
UtilisateursSchema.pre('save', async function (next) {
    // If password is modified or is a new user
    if (this.isModified('mot_de_passe') || this.isNew) {
        try {
            // Salt rounds determine the complexity of the hash
            const salt = await genSalt(10);
            this.mot_de_passe = await hash(this.mot_de_passe, salt);
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
UtilisateursSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        return await compare(enteredPassword, this.mot_de_passe);
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
UtilisateursSchema.methods.findUsingUsername = async function (username) {
    try {
        return await mongoose.model('Utilisateurs').findOne({
          nom_utilisateur: {
            $eq: username
          }
        });
    } catch (err) {
        throw err;
    }
};


module.exports = mongoose.model('Utilisateurs', UtilisateursSchema);
