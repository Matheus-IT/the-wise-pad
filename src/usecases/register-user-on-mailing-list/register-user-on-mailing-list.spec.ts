import { UserData } from '../../entities/user-data';
import { UserRepository } from './ports/user-repository';
import { RegisterUserOnMailingList } from './register-user-on-mailing-list';
import { InMemoryUserRepository } from './repository/in-memory-user-repository';

describe('register user on mailing list use case', () => {
	test('should add user with complete data to mailing list', async () => {
		const users: UserData[] = [];
		console.log(users);
		const repo: UserRepository = new InMemoryUserRepository(users);

		const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo);
		const name = 'any_name';
		const email = 'any@email.com';
		const res = await useCase.perform({ name, email });

		const user = repo.findUserByEmail('any@email.com');
		expect((await user).name).toBe('any_name');
		expect(res.value.name).toBe('any_name');
	});
});
