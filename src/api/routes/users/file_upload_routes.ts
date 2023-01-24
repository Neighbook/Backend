import express from 'express';

import { FilesUploadController } from '../../controllers/filles_uploas_controller';

const fileUploadRouter = express.Router();


fileUploadRouter.post('/upload', async (req: express.Request, res) => {
    // #swagger.tags = ['File']
	// #swagger.summary = 'Uploade new file'
	// #swagger.description = 'Endpoint to upload new files'
    // #swagger.parameters['file'] = { description: 'File to upload', in: 'formData', required: true, type: 'file' }
    /* #swagger.parameters['obj'] = {
    description: 'User object',
    in: 'body', required: true,
    type: 'object',
    schema: { container_name: 'container_name',
                file_name: 'file_name' }
     } */

    FilesUploadController.uploadFile(req, res)
});


fileUploadRouter.delete('/delete', async (req: express.Request, res) => {
    // #swagger.tags = ['File']
	// #swagger.summary = 'Delete file'
	// #swagger.description = 'Endpoint to delete files'
    FilesUploadController.deleteFile(req, res)
});

export const fileUploadRoutes = fileUploadRouter;
