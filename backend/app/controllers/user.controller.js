import { User } from '../models' ;

export class UserController {
  static async getInfo(ctx) {
    const { id } = ctx.params;
    if (!id) {
      ctx.throw(400, {message: 'Invalid data'})
    }

    return ctx.body = await User.getInfo(id);
  }

  static async updateProfile(ctx) {
    const { id } = ctx.params;
    const userInfo = ctx.request.body;

    if (!id) {
      ctx.throw(404, 'Invalid data');
    }

    const user = await User.findById(id);
    user.set(userInfo);

    ctx.body = await user.save();
  }
}
