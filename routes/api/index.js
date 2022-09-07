const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thouRoutes = require('./thoughtsRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thouRoutes);

module.exports = router;