import { Users } from "../models";
import { UserRepository } from "../repositories/UserRepository";
import { Login } from "../schema/authSchema";

export const UserService = {
  getUser: async (login: Login) => {
      return await UserRepository.findUser(login);
  },
};
