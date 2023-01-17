import express from 'express'
const socialRoutes = express.Router()
import {SocialService} from '../../services/social_service'

// User routes

socialRoutes.get('/post', async (req: express.Request, res) => {
  res.status(200).json('aa')
})

module.exports = SocialService
