import express from 'express'
import {PostService} from "../../services/social/post_service";
const socialRoutes = express.Router()
// Social routes

socialRoutes.get('/comment', async (req: express.Request, res) => {
  res.status(200).json('aa')
})

socialRoutes.get('/post', async (req: express.Request, res) => {
  PostService.savePost('test', 'test', false, 'nathan', null)
  res.status(200).json('aa')
})

module.exports = socialRoutes
