import { RequestHandler, CookieOptions } from 'express';
import moment from 'moment';

import handleErrorMiddleware from '../../../middleware/handle-error';
import User from '../../../models/User';
import { JWT } from '../../../services/jwt';
import config from '../../../config/config';
import { IBodyRequest } from '../../../interfaces/request';
import { Password } from '../../../services/password';


const JWTService = new JWT(config);

type ILoginRequest = IBodyRequest<{ email: string; password: string }>;

let login: RequestHandler = async (req: ILoginRequest, res) => {
  const { email, password } = req.body;
  console.log(password,email);
  const user = await User.findOne({ email });

  if (!user) {
    return res.sendStatus(401);
  }
 
  if (!(await user.comparePassword(password))) {
    console.log('password not matched');
    return res.sendStatus(401);
  }

  const token = await JWTService.signPayload({ id: user.id ,role:user.role});
  const options: CookieOptions = {
    maxAge:1000*60*60,
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
  };
  console.log(options)
  res.cookie('Authorization', `Bearer ${token}`, options);
  res.send({ token, type: 'Bearer' });
};

login = handleErrorMiddleware(login);

export default login;
