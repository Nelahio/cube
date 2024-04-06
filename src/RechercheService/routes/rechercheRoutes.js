const express = require('express');
const router = express.Router();
const rechercheController = require('../controllers/rechercheController')

router.get('/', rechercheController.rechercheProduits);

module.exports = router;