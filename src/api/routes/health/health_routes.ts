import express from 'express';

import { HealthCheckController } from '../../controllers/health_controller';

const _healthRoutes = express.Router();

_healthRoutes.get('/health', async (req: express.Request, res) => {
    // #swagger.tags = ['Health']
    // #swagger.summary = 'Health check'
    // #swagger.description = 'Endpoint to check health'
    HealthCheckController.healthCheck(req, res);
});

export const healthRoutes = _healthRoutes;
