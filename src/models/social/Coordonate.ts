import { GeoCodeObject } from './GeoCodeObject';

export class Coordonate {
	longitude!: number;
	latitude!: number;

	constructor(obj: GeoCodeObject) {
		if (obj.longitude && obj.latitude) {
			this.longitude = obj.longitude;
			this.latitude = obj.latitude;
		}
	}
}
