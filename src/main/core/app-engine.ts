import { app } from 'electron'
import { SettingsWindow } from '../settings-window'

export class AppEngine {
  private settingsWindow: SettingsWindow

  constructor() {
    this.settingsWindow = new SettingsWindow()
  }

  registerHandlers(): void {
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      this.settingsWindow?.show()
    })
  }
}
