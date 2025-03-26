const etatConfig={
    ETAT_DEMANDE_RDV_DIAG: ["en attente de confirmation", "accepté", "rejeté"],
    DEFAULT_ETAT_DEMANDE_RDV_DIAG: "en attente de confirmation",
    ETAT_MAINTENANCE: ["en cours", "terminé", "annulé"],
    DEFAULT_ETAT_MAINTENANCE: "en cours",
    ETAT_DEVIS: ["créé, payé", "annulé"],
    DEFAULT_ETAT_DEVIS: "créé",
    ETAT_DETAIL_MAINTENANCE: ["effectué", "annulé"],
    DEFAULT_ETAT_DETAIL_MAINTENANCE: "effectué",
    ETAT_PAIEMENT_DEVIS: ["effectué", "annulé"],
    DEFAULT_ETAT_PAIEMENT_DEVIS: "effectué",
    ETAT_VOITURE: ["créée", "supprimée"],
    DEFAULT_ETAT_VOITURE: "créée",
    ETAT_DIAGNOSTIC: ["effectué", "annulé"],
    DEFAULT_ETAT_DIAGNOSTIC: "effectué"
};
module.exports = etatConfig;