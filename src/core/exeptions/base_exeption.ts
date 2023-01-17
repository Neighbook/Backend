
export class BaseException {
	constructor(
		public message: string,
		public code: ExceptionCode,
		public status: number,
		public data?: any,
	) {}
}

export class ExceptionCode {
	constructor(public code: string, public label: string) {}
}
