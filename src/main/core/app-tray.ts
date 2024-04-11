import { Menu, Tray, Notification } from 'electron'
import icon from '../../../resources/icon.png?asset'

export class AppTray {
  private tray: Tray

  constructor() {
    this.tray = new Tray(icon)
  }

  init(handleSettings: () => void, handleExit: () => void): void {
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Settings', type: 'normal', click: handleSettings },
      { type: 'separator' },
      { label: 'Exit', type: 'normal', click: handleExit }
    ])
    this.tray.setContextMenu(contextMenu)
    this.tray.on('click', handleSettings)
  }

  showBalloon(title: string, content: string): void {
    this.tray.displayBalloon({
      title,
      content
    })

    const notification = new Notification({ title, body: content })
    notification.show()
  }
}
