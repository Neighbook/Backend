import { Logger } from 'tslog';

import { Coordonate } from '../../models/social/Coordonate';
import { GeoCodeObject } from '../../models/social/GeoCodeObject';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodeGeocoder = require('node-geocoder');

const logger = new Logger({ name: 'SocialServ' });
const options = {
	provider: 'openstreetmap',
};
const geoCoder = NodeGeocoder(options);

export async function geoCode(adress: string): Promise<Coordonate> {
	let result: Coordonate | null = { longitude: 0, latitude: 0 };
	await geoCoder
		.geocode(adress)
		.then((res: Array<GeoCodeObject> | GeoCodeObject) => {
			if (Array.isArray(res)) {
				result = { longitude: res[0].longitude, latitude: res[0].latitude };
			} else {
				result = new Coordonate(res);
			}
		})
		.catch((error: Error) => {
			logger.error(error);
		});
	return result;
}

export async function reverseGeoCode(lat: number, long: number): Promise<string> {
	let result = '';
	geoCoder
		.reverse({ lat, long })
		.then((res: Array<GeoCodeObject> | GeoCodeObject) => {
			if (Array.isArray(res)) {
				result = res[0].formatteAddress;
			} else {
				result = res.formatteAddress;
			}
		})
		.catch((error: Error) => {
			logger.error(error);
		});
	return result;
}
