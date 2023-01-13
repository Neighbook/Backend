import { environnement } from "./environnement";

export const apiConfig = {
  base_path:
    "/api" + environnement.api_base_path + "/v" + environnement.api_version[0],
};
