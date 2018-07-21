import { User } from '../models/';

export class AuthController {
  static async signUp(ctx) {
    const user = User.createFields.reduce((acc, field) => ({
      ...acc, [field]: ctx.request.body[field],
    }), {});

    ctx.body = await User.create(user);
  }

  static async signIn(ctx) {
    const { email, password } = ctx.request.body;
    if (!email || !password) {
      ctx.throw(400, { message: 'Invalid data' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw ctx.throw(400, { message: 'User not found' });
    }

    if (!user.comparePasswords(password)) {
      ctx.throw(400, { message: 'Invalid data' });
    }

    ctx.body = user;
  }
}
