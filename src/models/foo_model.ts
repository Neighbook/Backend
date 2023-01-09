import { v4 as uuidv4 } from 'uuid';
export class Foo {
	id: string
	name: string
	created_at: Date
	updated_at: Date | null
	deleted_at: Date | null

	constructor(name: string) {
		this.id = uuidv4()
		this.name = name
		this.created_at = new Date()
		this.updated_at = null
		this.deleted_at = null
	}
}