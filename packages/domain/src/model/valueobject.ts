export abstract class AbstractValueObject<T> {
  protected readonly _value: T;

  constructor(_value: T) {
    this.validate(_value);
    this._value = Object.freeze(_value);
  }
  equals = (value: AbstractValueObject<T>): boolean =>
    this._value === value._value;
  protected abstract validate(value: T): void;
  abstract serialize(): any;
}

interface StructValueObjectProps {
  [index: string]: any;
}

export abstract class StructValueObject<
  T extends StructValueObjectProps,
  U
> extends AbstractValueObject<T> {
  serialize(): U {
    const obj: any = {};
    for (const key of Object.keys(this._value)) {
      obj[key] = serialize(this._value[key]);
    }
    return obj;
  }
}

const serialize = (value: any): any =>
  typeof value == "object" && value != null ? value.serialize() : value;

export abstract class PrimitiveValueObject<T> extends AbstractValueObject<T> {
  get value(): T {
    return this._value;
  }
  serialize(): T {
    return this.value;
  }
}

export abstract class ArrayValueObject<T, U> extends AbstractValueObject<T[]> {
  get value(): U[] {
    return this._value.map((v) => serialize(v));
  }
  serialize(): U[] {
    return this._value.map((v) => serialize(v));
  }
  length = (): number => this._value.length;
}
