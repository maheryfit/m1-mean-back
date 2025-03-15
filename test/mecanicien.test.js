const request = require("supertest");
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app=require("../app");
const Mecanicien=require("../models/dashboard-mecanicien/Mecanicien");

let mongoServer;

// Setup & Cleanup
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async ()=>{
    // Clear the database
    await mongoose.connection.db.dropDatabase();

    // Create initial models
    const niveauMecanicienEntries = await NiveauMecanicien.insertMany([
        { titre: "Junior", coefficient_salarial: 1 },
        { titre: "Mid", coefficient_salarial: 1.5 },
        { titre: "Senior", coefficient_salarial: 2 }
    ]);

    const roleMecanicienEntries = await RoleMecanicien.insertMany([
        { titre: "Technician", salaire_mensuel: 2000 },
        { titre: "Engineer", salaire_mensuel: 3000 },
        { titre: "Manager", salaire_mensuel: 4000 }
    ]);

    const serviceEntries = await Service.insertMany([
        { nom: "Oil Change", description: "Change the oil", duree_estimee: 30, tarif: 50 },
        { nom: "Tire Rotation", description: "Rotate the tires", duree_estimee: 45, tarif: 40 },
        { nom: "Brake Inspection", description: "Inspect the brakes", duree_estimee: 60, tarif: 70 }
    ]);

    const marqueEntries = await Marque.insertMany([
        { nom: "Toyota" },
        { nom: "Honda" },
        { nom: "Ford" }
    ]);

    const stationEntries = await Station.insertMany([
        { nom: "Station A", lieu: "Location A", coordonnees: { type: "Point", coordinates: [0, 0] } },
        { nom: "Station B", lieu: "Location B", coordonnees: { type: "Point", coordinates: [1, 1] } },
        { nom: "Station C", lieu: "Location C", coordonnees: { type: "Point", coordinates: [2, 2] } }
    ]);

    // Create Utilisateurs
    const utilisateurEntries = await Utilisateur.insertMany([
        { nom: "Doe", prenom: "John", nom_utilisateur: "johndoe", mot_de_passe: "password123", profil: "client" },
        { nom: "Smith", prenom: "Jane", nom_utilisateur: "janesmith", mot_de_passe: "password123", profil: "client" },
        { nom: "Brown", prenom: "Charlie", nom_utilisateur: "charliebrown", mot_de_passe: "password123", profil: "client" }
    ]);

    const specificationEntries = await Specification.insertMany([
        { modele: "Camry", type: "Sedan", moteur: "V6", transmission: "Automatic", traction: "FWD" },
        { modele: "Accord", type: "Sedan", moteur: "I4", transmission: "Manual", traction: "FWD" },
        { modele: "Focus", type: "Hatchback", moteur: "I4", transmission: "Automatic", traction: "AWD" }
    ]);

    // Create Voitures
    const voitureEntries = await Voiture.insertMany([
        { proprietaire: utilisateurEntries[0]._id, description: "Toyota Camry", immatriculation: "ABC123", specification: specificationEntries[0]._id },
        { proprietaire: utilisateurEntries[1]._id, description: "Honda Accord", immatriculation: "XYZ789", specification: specificationEntries[1]._id },
        { proprietaire: utilisateurEntries[2]._id, description: "Ford Focus", immatriculation: "LMN456", specification: specificationEntries[2]._id }
    ]);

    // Create models referencing the initial models
    const articleEntries = await Article.insertMany([
        { nom: "Oil Filter", description: "Oil filter for cars", marque: marqueEntries[0]._id, unite: "unite", prix_unitaire: 10, type: "piece" },
        { nom: "Brake Pad", description: "Brake pad for cars", marque: marqueEntries[1]._id, unite: "unite", prix_unitaire: 20, type: "piece" },
        { nom: "Tire", description: "Tire for cars", marque: marqueEntries[2]._id, unite: "unite", prix_unitaire: 100, type: "consommable" }
    ]);

    const mecanicienEntries = await Mecanicien.insertMany([
        { utilisateur: utilisateurEntries[0]._id, telephone: "1234567890", role: roleMecanicienEntries[0]._id, niveau: niveauMecanicienEntries[0]._id },
        { utilisateur: utilisateurEntries[1]._id, telephone: "0987654321", role: roleMecanicienEntries[1]._id, niveau: niveauMecanicienEntries[1]._id },
        { utilisateur: utilisateurEntries[2]._id, telephone: "1122334455", role: roleMecanicienEntries[2]._id, niveau: niveauMecanicienEntries[2]._id }
    ]);

    const devisEntries = await Devis.insertMany([
        { voiture: voitureEntries[0]._id, services: [serviceEntries[0]._id], station: stationEntries[0]._id, articles: [articleEntries[0]._id], mecanicien: mecanicienEntries[0]._id, duree_estimee: 30, montant: 50, dateheure_debut_maintenance: new Date(), finition: "rapide", main_oeuvre: [mecanicienEntries[0]._id], etat: 0 },
        { voiture: voitureEntries[1]._id, services: [serviceEntries[1]._id], station: stationEntries[1]._id, articles: [articleEntries[1]._id], mecanicien: mecanicienEntries[1]._id, duree_estimee: 45, montant: 40, dateheure_debut_maintenance: new Date(), finition: "rapide", main_oeuvre: [mecanicienEntries[1]._id], etat: 0 },
        { voiture: voitureEntries[2]._id, services: [serviceEntries[2]._id], station: stationEntries[2]._id, articles: [articleEntries[2]._id], mecanicien: mecanicienEntries[2]._id, duree_estimee: 60, montant: 70, dateheure_debut_maintenance: new Date(), finition: "rapide", main_oeuvre: [mecanicienEntries[2]._id], etat: 0 }
    ]);

    const maintenanceEntries = await Maintenance.insertMany([
        { voiture: voitureEntries[0]._id, dateheure_debut: new Date(), station: stationEntries[0]._id, devis: devisEntries[0]._id, etat: 0 },
        { voiture: voitureEntries[1]._id, dateheure_debut: new Date(), station: stationEntries[1]._id, devis: devisEntries[1]._id, etat: 0 },
        { voiture: voitureEntries[2]._id, dateheure_debut: new Date(), station: stationEntries[2]._id, devis: devisEntries[2]._id, etat: 0 }
    ]);

    await DetailsMaintenance.insertMany([
        { maintenance: maintenanceEntries[0]._id, service: serviceEntries[0]._id, mecaniciens: [mecanicienEntries[0]._id], articles: [articleEntries[0]._id], dateheure_debut: new Date(), dateheure_fin: new Date(), etat: 0 },
        { maintenance: maintenanceEntries[1]._id, service: serviceEntries[1]._id, mecaniciens: [mecanicienEntries[1]._id], articles: [articleEntries[1]._id], dateheure_debut: new Date(), dateheure_fin: new Date(), etat: 0 },
        { maintenance: maintenanceEntries[2]._id, service: serviceEntries[2]._id, mecaniciens: [mecanicienEntries[2]._id], articles: [articleEntries[2]._id], dateheure_debut: new Date(), dateheure_fin: new Date(), etat: 0 }
    ]);
});

