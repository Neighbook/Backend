import { Request, Response, Router } from 'express';

import { FilesUploadController } from '../../controllers/filles_uploas_controller';

const fileUploadRouter = Router();

fileUploadRouter.post('/file/upload/:container_name/:file_name', async (req: Request, res: Response) => {
	// #swagger.tags = ['File']
	// #swagger.summary = 'Uploade new file'
	// #swagger.description = 'Endpoint to upload new files'
	// #swagger.parameters['file'] = { description: 'File to upload', in: 'formData', required: true, type: 'file' }

	FilesUploadController.uploadFile(req, res);
});

fileUploadRouter.delete('/file/delete/:container_name/:file_name', async (req: Request, res: Response) => {
	// #swagger.tags = ['File']
	// #swagger.summary = 'Delete file'
	// #swagger.description = 'Endpoint to delete files'
	FilesUploadController.deleteFile(req, res);
});

export { fileUploadRouter };
