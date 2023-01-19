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
  if(req.body.idUtilisateur && req.body.contenu && req.body.idPost) {
    CommentService.putComment(req.body.contenu, req.body.idPost, req.body.idUtilisateur, req.body.idCommentaire)
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
  if(req.query.id) {
    const post = await PostService.getPost(Number(req.query.id))
    if(post !== null){
      const formattedPost = {
        "id": post.id,
        "titre": post.titre,
        "description": post.description,
        "estPartage": post.estPartage,
        "idUtilisateur": post.idUtilisateur,
        "dateDeCreation": post.dateDeCreation,
        "dateDeModification": post.dateDeModification,
        "dateDeSuppression": null,
        "commentaires": post.commentaires,
        "images": post.images,
        "evenement": post.evenement,
        "nombreReactions":{
          "like": post.nlike,
          "mdr": post.nmdr,
          "Oo": post.nOo,
          "snif": post.nsnif,
          "grr": post.ngrr,
          "ok": post.nok,
        }
      }

      res.status(200).json(formattedPost)
    }else{
      res.status(404).send()
    }
  }else{
    res.status(400).json('provide id')
  }
})

socialRoutes.post('/post', async (req: express.Request, res) => {
  console.log(req.body.titre)
  console.log(req.body.description)
  console.log(req.body.es)
  if(req.body.titre && req.body.description && req.body.estPartage !== undefined && req.body.idUtilisateur) {
    PostService.savePost(req.body.titre,
                         req.body.description,
                         req.body.estPartage,
                         req.body.idUtilisateur,
                         req.body.idEvenement)
      .then(()=>res.status(200).send())
      .catch(error=>{
        console.log(error)
        res.status(500).send()
      })
  }else{
    res.status(400).json('invalid fields')
  }
})

socialRoutes.delete('/post', async (req: express.Request, res) => {
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


module.exports = socialRoutes
