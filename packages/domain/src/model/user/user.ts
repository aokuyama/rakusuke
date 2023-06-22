import { UUID } from "../uuid";
import { StructValueObject, PrimitiveValueObject } from "../valueobject";
import { UserToken } from "./token";

interface UserProps {
  readonly uuid: UUID;
  readonly token: UserToken;
}

interface UserArgs {
  readonly uuid: string;
  readonly token: string;
}

export interface User {
  getDebugInfo: () => string;
  getUUID: () => string | null;
  getAuthInfo: () => { uuid: string; token: string } | null;
  isRegistered: () => this is RegisteredUser;
}

export const unregisteredUser = {
  getDebugInfo: (): string => {
    return "guest";
  },
  getUUID: (): null => {
    return null;
  },
  getAuthInfo: (): null => {
    return null;
  },
  isRegistered: () => false,
};

export class RegisteredUser extends StructValueObject<UserProps, UserArgs> {
  static new(args: UserArgs) {
    return new RegisteredUser({
      uuid: new UUID(args.uuid),
      token: new UserToken(args.token),
    });
  }
  getUUID = (): string => this._value.uuid.value;
  getAuthInfo = (): { uuid: string; token: string } => {
    return {
      uuid: this.getUUID(),
      token: this._value.token.rawValue(),
    };
  };
  getDebugInfo = (): string => {
    return (
      "uuid:" + this.getUUID() + "\n" + "token:" + this._value.token.rawValue()
    );
  };
  isRegistered = () => true;
}

interface UserEntityProps {
  readonly id: UserID;
  readonly uuid: UUID;
  readonly token: UserToken;
}

interface UserEntityArgs {
  readonly id: number;
  readonly uuid: string;
  readonly token: string;
}

export class UserEntity extends StructValueObject<
  UserEntityProps,
  UserEntityArgs
> {
  static new(args: { id: number; uuid: UUID; token: UserToken }): UserEntity {
    return new UserEntity({
      id: new UserID(args.id),
      uuid: args.uuid,
      token: args.token,
    });
  }
  get _id(): UserID {
    return this._value.id;
  }
  get id(): number {
    return this._value.id.value;
  }
  get uuid(): string {
    return this._value.uuid.value;
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
