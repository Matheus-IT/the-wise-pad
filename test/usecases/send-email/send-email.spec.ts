import { Either, Right, right } from '@/shared';
import { MailServiceError } from '@/usecases/errors';
import { SendEmail } from '@/usecases/send-email';
import { EmailOptions, EmailService } from '@/usecases/send-email/ports';

const attachmentFilePath = '../resources/text.txt';
const fromName = 'Test';
const fromEmail = 'from_email@email.com';
const toName = 'any one';
const toEmail = 'any_email@email.com';
const subject = 'Test email';
const emailBody = 'Hello wold attachment test';
const emailBodyHtml = '<b>Hello world attachment testing</b>';
const attachment = [
	{
		filename: attachmentFilePath,
		contentType: 'text/plain',
	},
];
const mailOptions: EmailOptions = {
	host: 'test',
	port: 867,
	username: 'test',
	password: 'test',
	from: fromName + ' ' + fromEmail,
	to: toName + '<' + toEmail + '>',
	subject: subject,
	text: emailBody,
	html: emailBodyHtml,
	attachments: attachment,
};

class MailServiceStub implements EmailService {
	async send(emailOptions: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
		return right(emailOptions);
	}
}

describe('Send email to user', () => {
	test('should email user with valid name and email address', async () => {
		const mailServiceStub = new MailServiceStub();
		const usecase = new SendEmail(mailOptions, mailServiceStub);
		const response = await usecase.perform({
			name: toName,
			email: toEmail,
		});
		expect(response).toBeInstanceOf(Right);
	});
});
