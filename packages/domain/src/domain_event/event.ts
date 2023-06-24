export abstract class DomainEvent {
  private readonly rawBody: unknown;
  constructor(rawBody: unknown) {
    this.rawBody = Object.freeze(rawBody);
  }
  name = (): string => {
    return this.constructor.name;
  };
  body(): string {
    if (typeof this.rawBody === "string") {
      return this.rawBody;
    }
    return JSON.stringify(this.rawBody);
  }
}
