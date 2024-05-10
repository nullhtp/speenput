import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import { SettingsWindowEvents } from '../../shared/settings-window.events'
import { Scenario } from '../../shared/scenario/scenario'
import { FormDefinition } from '../../shared/types/form-definition'

export class SettingsWindow {
  private settingsWindow: BrowserWindow | null = null

  constructor() {
    this.settingsWindow = this.createWindow()
  }

  emit(eventName: SettingsWindowEvents, payload?: unknown): void {
    this.settingsWindow?.webContents.send(eventName, payload)
  }

  updateScenarios(scenarios: Scenario[]): void {
    this.emit(
      SettingsWindowEvents.UPDATE_SETTINGS,
      scenarios.map((scenario) => scenario.toDto())
    )
  }

  init(data: {
    source: FormDefinition[]
    target: FormDefinition[]
    transform: FormDefinition[]
  }): void {
    this.emit(SettingsWindowEvents.INIT_SETTINGS_WINDOW, data)
  }

  toggle(): void {
    this.settingsWindow?.isVisible() ? this.hide() : this.show()
  }

  show(): void {
    this.settingsWindow?.show()
  }

  hide(): void {
    this.settingsWindow?.hide()
  }

  private createWindow(): BrowserWindow {
    const settingsWindow = new BrowserWindow({
      width: 1000,
      height: 800,
      show: false,
      alwaysOnTop: true,
      center: true,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    settingsWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      settingsWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      settingsWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }

    settingsWindow.on('close', () => {
      settingsWindow.hide()
    })

    return settingsWindow
  }
}
