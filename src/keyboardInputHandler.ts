import Command from "./command";
import KeyCommand from "./keyCommand";

class KeyboardInputHandler {
  private keyCommands: KeyCommand[];
  private commandBuffer: Command[];

  constructor() {
    this.keyCommands = new Array<KeyCommand>();
    this.commandBuffer = new Array<Command>();
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      const keyCode = e.keyCode;
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

export default KeyboardInputHandler;
