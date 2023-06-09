import { StructValueObject } from "../valueobject";
import { GuestName } from "./guest";

interface GuestDefaultProps {
  readonly name: GuestName;
}

export interface GuestDefaultArgs {
  readonly name: string;
}

export class GuestDefault extends StructValueObject<
  GuestDefaultProps,
  GuestDefaultArgs
> {
  static new(args: GuestDefaultArgs): GuestDefault {
    return new GuestDefault({
      name: new GuestName(args.name),
    });
  }
  protected validate(value: GuestDefaultProps): void {
    // throw new Error("Method not implemented.");
  }
  get name(): string {
    return this._value.name.value;
  }
}
