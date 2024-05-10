import { SpeechSourceParams } from './speech-source.params'
import { SpeechRecorder } from 'speech-recorder'
import { WaveFile } from 'wavefile'
import { OpenAI, toFile } from 'openai'
import { globalShortcut } from 'electron'
import { FormDefinition } from '../../types/form-definition'
import { SpeechSourceDto } from './speech-source.dto'
import { speechSourceDefenition } from './speech-source.defenition'
import { SourceFactory } from '../../types/action-factory'
import { SourceAction } from '../../types/action-step'

export default class Factory extends SourceFactory {
  getFormDefinition(): FormDefinition<SpeechSourceDto> {
    return speechSourceDefenition
  }

  fromDto({ params }: SpeechSourceDto): Action {
    return new Action(params)
  }
}

class Action extends SourceAction {
  private _openai?: OpenAI

  private getModel(): OpenAI {
    if (this._openai) {
      return this._openai
    }
    const params = this.getParams<SpeechSourceParams>()
    this._openai = new OpenAI({ apiKey: params.apiKey })
    return this._openai
  }

  private unregister(): void {
    try {
      globalShortcut.unregister('ESC')
      globalShortcut.unregister('Enter')
    } catch (e) {
      console.log(e)
    }
  }

  async execute(): Promise<string> {
    const buffer: number[] = []
    const sampleRate = 16000

    const wav = new WaveFile()

    const recorder = new SpeechRecorder({
      onAudio: ({ audio }): void => {
        for (let i = 0; i < audio.length; i++) {
          buffer.push(audio[i])
        }

        if (buffer.length >= sampleRate) {
          wav.fromScratch(1, sampleRate, '16', buffer)
        }
      }
    })

    setTimeout(() => {
      recorder.start()
    }, 1000)

    return new Promise((resolve, reject) => {
      globalShortcut.register('ESC', () => {
        this.unregister()
        recorder.stop()
        reject(Error('Cancelled by user'))
      })
      globalShortcut.register('Enter', () => {
        this.unregister()
        recorder.stop()
        resolve('')
      })
    })
      .then(() =>
        toFile(wav.toBuffer(), 'test', {
          type: 'audio/wav',
          lastModified: Date.now()
        })
      )
      .then((file) => {
        return this.getModel().audio.transcriptions.create({
          file,
          model: 'whisper-1'
        })
      })
      .then((transcription) => {
        console.log(transcription.text)

        return transcription.text
      })
      .finally(() => {
        this.unregister()
      })
  }
}
