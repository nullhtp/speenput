import { globalShortcut, ipcMain } from 'electron'
import { Source } from '../domain/source'
import { SettingsWindowEvents } from '../../shared/settings-window.events'
import { ProcessMainEvents } from '../../shared/process-main.events'
import { SpeechRecognizerWindow } from '../windows/speech-recognizer-window'

type SpeechSourceParams = {
  stopRecordKeyCombination: string
  cancelRecordKeyCombination: string
}

export class SpeechSource extends Source {
  private stopRecordKeyCombination: string
  private cancelRecordKeyCombination: string

  constructor({ stopRecordKeyCombination, cancelRecordKeyCombination }: SpeechSourceParams) {
    super()
    this.stopRecordKeyCombination = stopRecordKeyCombination
    this.cancelRecordKeyCombination = cancelRecordKeyCombination
  }
  async getText(): Promise<string> {
    const window = new SpeechRecognizerWindow()
    window.emit(SettingsWindowEvents.START_RECORD, 10_000)
    console.log('START_RECORD')

    globalShortcut.register(this.stopRecordKeyCombination, async () => {
      console.log('STOP_RECORD')
      window.emit(SettingsWindowEvents.STOP_RECORD)
      this.release()
    })

    globalShortcut.register(this.cancelRecordKeyCombination, async () => {
      console.log('CANCEL_RECORD')
      window.emit(SettingsWindowEvents.CANCEL_RECORD)
      this.release()
    })

    return new Promise((resolve) => {
      ipcMain.on(ProcessMainEvents.RECORD_RESULT, (_, result) => {
        console.log('RECORD_RESULT', result)
        resolve(result)
        this.release()
        window?.close()
      })
    })
  }

  private release(): void {
    globalShortcut.unregister(this.stopRecordKeyCombination)
    globalShortcut.unregister(this.cancelRecordKeyCombination)
  }
}
