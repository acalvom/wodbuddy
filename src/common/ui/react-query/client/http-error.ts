export enum HttpStatusCodes {
	Ok = 200,
	Forbidden = 403,
	BadRequest = 400,
	NotFound = 404,
	Unauthorized = 401,
	Conflict = 409,
	InternalServerError = 500
}

export class HttpError extends Error {
	status: HttpStatusCodes;

	constructor(status: HttpStatusCodes, message: string) {
		super(message);
		this.status = status;
	}
}
