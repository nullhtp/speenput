import { SpeechSourceParams } from './speech-source.params'
import { SourceType } from '../source-type'
import { Source } from '../source-base'
import { SpeechRecorder } from 'speech-recorder'
import { WaveFile } from 'wavefile'
import { OpenAI, toFile } from 'openai'
import { globalShortcut } from 'electron'

export class SpeechSource extends Source {
  private openai: OpenAI

  constructor(private readonly params: SpeechSourceParams) {
    super(SourceType.SPEECH, params)
    this.openai = new OpenAI({ apiKey: this.params.apiKey })
  }

  private unregister(): void {
    try {
      globalShortcut.unregister('ESC')
      globalShortcut.unregister('Enter')
    } catch (e) {
      console.log(e)
    }
  }

  async getText(): Promise<string> {
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
        return this.openai.audio.transcriptions.create({
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
