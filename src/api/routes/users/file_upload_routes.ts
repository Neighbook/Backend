import express from 'express';

import { FilesUploadController } from '../../controllers/filles_uploas_controller';

const fileUploadRouter = express.Router();

    // #swagger.tags = ['File']
	// #swagger.summary = 'Uploade new file'
	// #swagger.description = 'Endpoint to upload new files'
fileUploadRouter.post('/upload/:containerName/:fileName', async (req: express.Request, res) => FilesUploadController.uploadFile(req, res));

    // #swagger.tags = ['File']
	// #swagger.summary = 'Delete file'
	// #swagger.description = 'Endpoint to delete files'
fileUploadRouter.delete('/delete/:containerName/:fileName', async (req: express.Request, res) => FilesUploadController.deleteFile(req, res));

export const fileUploadRoutes = fileUploadRouter;