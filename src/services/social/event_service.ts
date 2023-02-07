import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { SocialDataSource } from '../../core/datastores/typeorm_datastores';
import { Event } from '../../models/social/Evenement';

export class EventService {
	static repository: Repository<Event> = SocialDataSource.manager.getRepository(Event);

	static async getEvent(id: string): Promise<Event | null> {
		let event: Event | null = null;
		await this.repository
			.findOne({
				where: {
					id: id,
					dateDeSuppression: undefined,
				},
			})
			.then((result) => {
				event = result;
			});
		return event;
	}

	static async createEvent(title: string, eventDate: Date, location: string): Promise<Event | null> {
		const event = new Event();
		let response: Event | null = null;
		event.titre = title;
		event.dateEvenement = eventDate;
		event.addresse = location;

		await this.repository.save(event).then((event) => {
			response = event;
		});
		return response;
	}

	static async updateEvent(
		id: number,
		title?: string,
		eventDate?: Date,
		location?: string
	): Promise<UpdateResult | null> {
		const event = new Event();
		let response: UpdateResult | null = null;

		event.titre = title ? title : event.titre;
		event.dateEvenement = eventDate ? eventDate : event.dateEvenement;
		event.addresse = location ? location : event.addresse;

		await this.repository.update(id, event).then((res) => {
			response = res;
		});

		return response;
	}

	static async deleteEvent(id: string): Promise<DeleteResult | null> {
		let response: DeleteResult | null = null;

		await this.repository.softDelete(id).then((res) => {
			response = res;
		});
		return response;
	}
}
