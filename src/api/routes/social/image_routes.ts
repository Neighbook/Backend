import express from 'express';
import { ImageService } from '../../../services/social/image_service';

export const _socialRoutes = express.Router();


_socialRoutes.post('/image', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Social']
	// #swagger.description = 'Endpoint to create a comment.'
	// #swagger.summary = 'Create a comment'
    if(req.file) {
        return await ImageService.putImage(req.body.user._user_id, req.file).then(()=>res.status(200).send());
    } else {
        res.status(400).json('invalid fields');
    }
});

_socialRoutes.delete('/image', async (req: express.Request, res: express.Response) => {
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

export const socialRoutes = _socialRoutes;
