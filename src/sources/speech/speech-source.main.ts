import { ipcMain } from 'electron'
import { SettingsWindowEvents } from '../../shared/settings-window.events'
import { ProcessMainEvents } from '../../shared/process-main.events'
import { SpeechRecognizerWindow } from '../../main/windows/speech-recognizer-window'
import { SpeechSourceParams } from './speech-source.params'
import { SourceType } from '../source-type'
import { Source } from '../source-base'

export class SpeechSource extends Source {
  constructor(private readonly params: SpeechSourceParams) {
    super(SourceType.SPEECH, params)
  }

  async getText(): Promise<string> {
    const window = new SpeechRecognizerWindow()
    window.emit(SettingsWindowEvents.START_RECORD, this.params.maxDelay)
    console.log('START_RECORD')

    return new Promise((resolve) => {
      ipcMain.on(ProcessMainEvents.RECORD_RESULT, (_, result) => {
        console.log('RECORD_RESULT', result)
        resolve(result)
        window?.close()
      })
    })
  }
}
