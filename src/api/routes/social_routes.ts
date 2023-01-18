import express from 'express'
import {PostService} from "../../services/social/post_service";
import {CommentService} from "../../services/social/comment_service";
const socialRoutes = express.Router()

// Comment routes
socialRoutes.get('/comment', async (req: express.Request, res) => {
  if(req.query.id) {
    const comment = await CommentService.getComment(Number(req.query.id))
    console.log(comment)
    if(comment !== null){
      res.status(200).json(comment)
    }else{
      res.status(404).send()
    }
  }else{
    res.status(400).json('provide id')
  }
})

socialRoutes.post('/comment', async (req: express.Request, res) => {
  if(req.body.userId && req.body.contenu && req.body.postId) {
    CommentService.putComment(req.body.contenu, req.body.postId, req.body.idUtilisateur, req.body.idCommentaire)
      .then(()=>res.status(200).send())
      .catch(error=>{
        console.log(error)
        res.status(500).send()
    })
  }else{
    res.status(400).json('invalid fields')
  }
})

socialRoutes.delete('/comment', async (req: express.Request, res) => {
  if(req.query.id) {
    CommentService.deleteComment(Number(req.query.id))
      .then(()=>res.status(200).send())
      .catch(error=>{
        console.log(error)
        res.status(500).send()
      })
  }else{
    res.status(400).json('invalid fields')
  }
})

// Post routes
socialRoutes.get('/post', async (req: express.Request, res) => {
  PostService.savePost('test', 'test', false, 'nathan', null)
  res.status(200).json('aa')
})

module.exports = socialRoutes