import { ipcMain } from 'electron'
import { SettingsWindowEvents } from '../../shared/settings-window.events'
import { ProcessMainEvents } from '../../shared/process-main.events'
import { SpeechRecognizerWindow } from '../windows/speech-recognizer-window'
import { SpeechSourceParams } from '../../shared/sources/speech/speech-source.params'
import { SourceDto } from '../../shared/sources/source.dto'
import { SourceType } from '../../shared/sources/source-type'
import { Source } from '../../shared/sources/source-base'

export class SpeechSource extends Source {
  private apiKey: string
  private maxDelay: number

  constructor({ apiKey, maxDelay }: SpeechSourceParams) {
    super()
    this.apiKey = apiKey
    this.maxDelay = maxDelay
  }
  async getText(): Promise<string> {
    const window = new SpeechRecognizerWindow()
    window.emit(SettingsWindowEvents.START_RECORD, this.maxDelay)
    console.log('START_RECORD')

    return new Promise((resolve) => {
      ipcMain.on(ProcessMainEvents.RECORD_RESULT, (_, result) => {
        console.log('RECORD_RESULT', result)
        resolve(result)
        window?.close()
      })
    })
  }

  toDto(): SourceDto {
    return {
      type: SourceType.SPEECH,
      params: {
        apiKey: this.apiKey,
        maxDelay: this.maxDelay
      }
    }
  }
}
