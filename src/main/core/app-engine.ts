import { app } from 'electron'
import { SettingsWindow } from '../settings-window'
import { AppTray } from './app-tray'

export class AppEngine {
  private settingsWindow: SettingsWindow
  private appTray: AppTray

  constructor() {
    this.settingsWindow = new SettingsWindow()
    this.appTray = new AppTray()
  }

  registerHandlers(): void {
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      this.settingsWindow?.show()
    })

    this.appTray.init(
      () => this.settingsWindow.toggle(),
      () => this.exit()
    )

    this.appTray.showBalloon('Hello', 'World')
  }

  exit(): void {
    app.quit()
  }
}
