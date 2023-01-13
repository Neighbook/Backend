export const environnement = {
  api_name: process.env.API_NAME || "API",
  api_version: process.env.API_VERSION || "1.0.0",
  api_description: process.env.API_DESCRIPTION || "API description",
  api_port: process.env.API_PORT || 3000,
  api_host: process.env.API_HOST || "localhost",
  api_base_path: process.env.API_BASE_PATH || "/",
  api_schemes: process.env.API_SCHEMES || "http",
  api_swagger: process.env.API_SWAGGER || "2.0",
  api_swagger_path: process.env.API_SWAGGER_PATH || "/documentation",
  api_swagger_json_path:
    process.env.API_SWAGGER_JSON_PATH || "/documentation.json",
  api_swagger_ui_path: process.env.API_SWAGGER_UI_PATH || "/documentation-ui",
  database: {
    dialect: process.env.DATABASE_DIALECT || "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME || "postgres",
  },
  licence_name: process.env.LICENCE_NAME || "MIT",
  licence_url: process.env.LICENCE_URL || "https://spdx.org/licenses/MIT.html",
};
