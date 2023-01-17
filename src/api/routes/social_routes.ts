import express from 'express'
const socialRoutes = express.Router()
import {SocialService} from '../../services/social/comment_service'

// User routes

socialRoutes.get('/comment', async (req: express.Request, res) => {
  res.status(200).json('aa')
})

module.exports = SocialService
