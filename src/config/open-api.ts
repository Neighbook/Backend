import { environnement } from './environnement'

export const metadata = {
    openapi: '3.0.3',
    info: {
        title: environnement.api_name,
        version: environnement.api_version,
        description: environnement.api_description,
        license: {
            name: environnement.licence_name,
            url: environnement.licence_url,
        },
        contact: {
            name: 'john doe',
            url: 'https://logrocket.com',
            email: 'info@email.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local server',
        },
    ],
    security: [{ bearerAuth: [] }],
    tags: [
        {
            name: 'User',
            description: 'User management',
        },
    ],
}
