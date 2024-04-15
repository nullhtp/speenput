import { BrowserWindow } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import { SettingsWindowEvents } from '../../shared/settings-window.events'
import { createFileRoute, createURLRoute } from 'electron-router-dom'

const RECOGNIZER_PATH = 'recognizer'

export class SpeechRecognizerWindow {
  private settingsWindow: BrowserWindow | null = null

  constructor() {
    this.settingsWindow = this.createWindow()
  }

  emit(eventName: SettingsWindowEvents, payload?: unknown): void {
    this.settingsWindow?.webContents.send(eventName, payload)
  }

  close(): void {
    this.settingsWindow?.close()
  }

  private createWindow(): BrowserWindow {
    const settingsWindow = new BrowserWindow({
      width: 300,
      height: 100,
      show: true,
      kiosk: true,
      autoHideMenuBar: true,
      alwaysOnTop: true,
      center: true,
      closable: false,
      opacity: 60,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      const devServerURL = createURLRoute(process.env['ELECTRON_RENDERER_URL'], RECOGNIZER_PATH)
      settingsWindow.loadURL(devServerURL)
    } else {
      const fileRoute = createFileRoute(join(__dirname, '../renderer/index.html'), RECOGNIZER_PATH)

      settingsWindow.loadFile(...fileRoute)
    }

    return settingsWindow
  }
}
