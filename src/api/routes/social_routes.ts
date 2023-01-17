import express from 'express'
const socialRoutes = express.Router()
// Social routes

socialRoutes.get('/comment', async (req: express.Request, res) => {
  res.status(200).json('aa')
})

module.exports = socialRoutes
