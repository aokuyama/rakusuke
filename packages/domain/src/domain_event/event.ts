export abstract class DomainEvent {
  rawBody: unknown;
  abstract name(): string;
  body(): string {
    if (typeof this.rawBody === "string") {
      return this.rawBody;
    }
    return JSON.stringify(this.rawBody);
  }
}
