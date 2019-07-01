const router = require('express').Router()

// Send React client pages if no api routes are hit
router.get('/', (req, res) => {
  res.render('index');
})

module.exports = router