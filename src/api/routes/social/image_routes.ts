import express from 'express';

import { ImageService } from '../../../services/social/image_service';

const _imageRoutes = express.Router();

_imageRoutes.post('/image/:idPost', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Social']
	// #swagger.description = 'Endpoint to create a comment.'
	// #swagger.summary = 'Create a comment'
	if (req.file && req.params.idPost) {
		ImageService.putImage(req.body.user._user_id, req.params.idPost, req.file).then((image) =>
			res.status(200).send(image)
		);
	} else {
		res.status(400).json('missing file data');
	}
});

_imageRoutes.delete('/image', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Social']
	// #swagger.description = 'Endpoint to delete a comment.'
	// #swagger.summary = 'Delete a comment'
	if (req.query.id) {
		ImageService.deleteImage(req.query.id.toString(), req.body.user._user_id).then(() =>
			res.status(200).send()
		);
	} else {
		res.status(400).json('invalid fields');
	}
});

export const imageRoutes = _imageRoutes;
