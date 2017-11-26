class Command {
  private callback: () => void;

  constructor(callback: () => void) {
    this.callback = callback;
  }

  public execute(): void {
    this.callback();
  }
}

export default Command;
