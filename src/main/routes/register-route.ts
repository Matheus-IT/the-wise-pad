import { makeRegisterUserController } from '@/main/factories';
import { Router } from 'express';
import { adaptRoute } from '../adapters';

export default (router: Router): void => {
	router.post('/register', adaptRoute(makeRegisterUserController()));
};