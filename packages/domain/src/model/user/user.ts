import { StructValueObject, PrimitiveValueObject } from "../valueobject";
import { UserToken } from "./token";

interface UserProps {
  readonly token: UserToken;
}

interface UserArgs {
  readonly token: string;
}

export interface User {
  getRawToken: () => string | null;
}

export const unregisteredUser = {
  getRawToken: (): null => {
    return null;
  },
};

export class RegisteredUser extends StructValueObject<UserProps, UserArgs> {
  static new(args: UserArgs) {
    return new RegisteredUser({ token: new UserToken(args.token) });
  }
  protected validate(value: UserProps): void {
    // throw new Error("Method not implemented.");
  }
  getRawToken = (): string => this._value.token.rawValue();
}

interface UserEntityProps {
  readonly id: UserID;
  readonly token: UserToken;
}

interface UserEntityArgs {
  readonly id: number;
  readonly token: string;
}

export class UserEntity extends StructValueObject<
  UserEntityProps,
  UserEntityArgs
> {
  static new(args: { id: number; token: UserToken }): UserEntity {
    return new UserEntity({
      id: new UserID(args.id),
      token: args.token,
    });
  }
  protected validate(value: UserProps): void {
    // throw new Error("Method not implemented.");
  }
  get _id(): UserID {
    return this._value.id;
  }
  get id(): number {
    return this._value.id.value;
  }
  getRawToken = (): string => this._value.token.rawValue();
}

export class UserID extends PrimitiveValueObject<number> {
  protected validate(value: number): void {
    if (value <= 0) {
      throw new Error("invalid id");
    }
  }
}
