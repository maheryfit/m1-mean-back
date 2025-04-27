const test = require("node:test");
const assert = require("node:assert");

const Abonnement = require("../models/dashboard-client/Abonnement");
test('insert abonnement passed', async (done) => {
    const abonnement = new Abonnement({ nom: "abonnement", prix: 5 });
    await abonnement.save();
})
