import {
  UserToken,
  NewUserToken,
  UserRepository,
  UserEntity,
} from "domain/src/model/user";
import { client } from "./client";

export class PrismaUserRepository implements UserRepository {
  createUserByToken = async (token: NewUserToken): Promise<UserEntity> => {
    const r = await client.$transaction(async (prisma) => {
      const saveEvent = await prisma.user.create({
        data: {
          token_digest: token.hashed(),
        },
      });
      return saveEvent;
    });
    return UserEntity.new({ id: r.id, token: token.toExisting() });
  };

  getUserByToken = async (token: UserToken): Promise<UserEntity | null> => {
    const r = await client.user.findUnique({
      where: {
        token_digest: token.hashed(),
      },
    });
    return r ? UserEntity.new({ id: r.id, token: token }) : null;
  };
}
