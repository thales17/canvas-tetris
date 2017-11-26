import Command from "./command";

class KeyCommand {
  private key: number;
  private command: Command;
  constructor(key: number, command: Command) {
    this.key = key;
    this.command = command;
  }

  public commandIfActive(key: number): Command {
    if (key === this.key) {
      return this.command;
    }

    return null;
  }
}

export default KeyCommand;
