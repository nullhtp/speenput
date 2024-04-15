import { app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { AppEngine } from './core/app-engine'
import { Scenario } from './domain/scenario'
import { ShortcutManager } from './services/shortcut-manager'
import { InputReplaceTarget } from './services/input-replace-target'
import { OpenAiTextTransformer } from './services/openai-text-transformer'
import { SpeechSource } from './services/speech-source'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const engine = new AppEngine()

  engine.registerHandlers()

  // IPC test
  // ipcMain.on('ping', () => console.log('pong'))

  const shortcutManager = new ShortcutManager()

  const scenario = new Scenario({
    source: new SpeechSource({
      cancelRecordKeyCombination: 'ESCAPE',
      stopRecordKeyCombination: 'Alt+B'
    }),
    transformers: [
      new OpenAiTextTransformer({
        modelName: 'gpt-3.5-turbo-1106',
        temperature: 0.2,
        apiKey: '',
        humanMessage: 'Summarize it on russian: {data}',
        systemMessage: 'You are a helpful assistant'
      })
    ],
    target: new InputReplaceTarget()
  })

  shortcutManager.register('Alt+X', scenario)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
