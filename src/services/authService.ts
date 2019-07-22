import { userOne, User } from "../apiV1/users/user.model";

import * as Sequelize from "sequelize";
import sequelize from "../config/db.connection";

export class AuthService {
  public async getUserByEmail(email: string) {
    let user = (await userOne.findOne({
      where: { email: email }
    })) as User;
    if (user) return user;
  }

  public async register(user: User) {
    await userOne.create(user);
  }

  public async update(user: User, id) {
    await userOne.create(user, {where: {id: id}});
  }
}
