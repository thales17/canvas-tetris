import Command from "./command";
import KeyCommand from "./keyCommand";

class KeyClickInputHandler {
  private keyCommands: KeyCommand[];
  private commandBuffer: Command[];
  private downKeys: number[];
  constructor() {
    this.keyCommands = new Array<KeyCommand>();
    this.commandBuffer = new Array<Command>();
    this.downKeys = new Array<number>();
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      const keyCode = e.keyCode;
      if (this.downKeys.indexOf(keyCode) === -1) {
        this.downKeys.push(keyCode);
      }
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
      const keyCode = e.keyCode;
      if (this.downKeys.indexOf(keyCode) === -1) {
        return;
      }

      this.downKeys.splice(this.downKeys.indexOf(keyCode));

      for (const keyCommand of this.keyCommands) {
        const command = keyCommand.commandIfActive(keyCode);
        if (command) {
          this.commandBuffer.push(command);
        }
      }
    });
  }

  public setCommandForKeyCode(keyCode: number, command: Command) {
    this.keyCommands.push(new KeyCommand(keyCode, command));
  }

  public handleInput(): Command[] {
    const commandBuffer = this.commandBuffer;
    this.commandBuffer = new Array<Command>();
    return commandBuffer;
  }
}

export default KeyClickInputHandler;
