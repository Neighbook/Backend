import express from 'express';

import { FilesUploadController } from '../../controllers/filles_uploas_controller';

const fileUploadRouter = express.Router();


fileUploadRouter.post('/upload/:container_name/:file_name', async (req: express.Request, res) => {
    // #swagger.tags = ['File']
	// #swagger.summary = 'Uploade new file'
	// #swagger.description = 'Endpoint to upload new files'
    // #swagger.parameters['file'] = { description: 'File to upload', in: 'formData', required: true, type: 'file' }


    FilesUploadController.uploadFile(req, res)
});


fileUploadRouter.delete('/delete', async (req: express.Request, res) => {
    // #swagger.tags = ['File']
	// #swagger.summary = 'Delete file'
	// #swagger.description = 'Endpoint to delete files'
    FilesUploadController.deleteFile(req, res)
});

export const fileUploadRoutes = fileUploadRouter;
