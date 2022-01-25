import { Either, left, right } from '../shared/either';
import { Email } from './email';
import { InvalidEmailError } from './errors/invalid-email-error';
import { InvalidNameError } from './errors/invalid-name-error';
import { Name } from './name';
import { UserData } from './user-data';

export class User {
	public readonly name: Name;
	public readonly email: Email;

	constructor(name: Name, email: Email) {
		this.name = name;
		this.email = email;
	}

	static create(userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
		const nameOrError = Name.create(userData.name);

		if (nameOrError.isLeft()) {
			return left(new InvalidNameError(userData.name));
		}

		const emailOrError = Email.create(userData.email);

		if (emailOrError.isLeft()) {
			return left(new InvalidEmailError(userData.email));
		}

		const name = nameOrError.value;
		const email = emailOrError.value;

		return right(new User(name, email));
	}
}
