import { StructValueObject } from "../valueobject";
import { UserToken } from "./token";

interface GuestProps {
  readonly token: UserToken;
}

interface GuestArgs {
  readonly token: string;
}

export class User extends StructValueObject<GuestProps, GuestArgs> {
  protected validate(value: GuestProps): void {
    // throw new Error("Method not implemented.");
  }
  getRawToken = (): string => this._value.token.rawValue();
}
