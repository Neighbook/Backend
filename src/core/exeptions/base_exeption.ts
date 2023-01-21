export class BaseException extends Error {
	constructor(
		public message: string,
		public status: number,
		public data?: any
	) {
		super();
	}
}

export class ExceptionCode {
	constructor(public code: string, public label: string) {}
}

export class ApiException extends BaseException {
	constructor(
		public message: string,
		public status: number,
		public data?: any
	) {
		super(message, status, data);
	}
}

export class ValidationException extends BaseException {
	constructor(
		public message: string,
		public status: number,
		public data?: any
	) {
		super(message, status, data);
	}
}

export class ServiceException extends BaseException {
	constructor(
		public message: string,
		public status: number,
		public data?: any
	) {
		super(message, status, data);
	}
}
