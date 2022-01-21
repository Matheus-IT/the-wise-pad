import { left } from '../shared/either';
import { InvalidEmailError } from './errors/invalid-email-error';
import { InvalidNameError } from './errors/invalid-name-error';
import { User } from './user';

describe('User domain entity', () => {
	test('should not create user width invalid email address', () => {
		const invalidEmail = 'invalid_email';
		const error = User.create({ name: 'test_name', email: invalidEmail });
		expect(error).toEqual(left(new InvalidEmailError()));
	});

	test('should not create user with invalid name (too few characters)', () => {
		const invalidName = 'M           ';
		const error = User.create({ name: invalidName, email: 'test@email.com' });
		expect(error).toEqual(left(new InvalidNameError()));
	});

	test('should not create user with invalid name (too many characters)', () => {
		const invalidName = 'M'.repeat(257);
		const error = User.create({ name: invalidName, email: 'test@email.com' });
		expect(error).toEqual(left(new InvalidNameError()));
	});

	test('should create user with valid data', () => {
		const validUserData = { name: 'test_name', email: 'test@test.com' };
		const user = User.create(validUserData).value as User;

		expect(user.name.value).toEqual(validUserData.name);
		expect(user.email.value).toEqual(validUserData.email);
	});
});
