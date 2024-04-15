import { SettingsWindowEvents } from '../../shared/settings-window.events'
import { ProcessMainEvents } from '../../shared/process-main.events'
import { useWhisper } from '@chengsokdara/use-whisper'

function SpeechRecognizer(): JSX.Element {
  console.log('START')

  const ipcRenderer = window.electron.ipcRenderer

  const { transcript, startRecording, stopRecording, pauseRecording, recording } = useWhisper({
    mode: 'transcriptions',
    whisperConfig: {
      language: 'ru'
    },
    autoStart: true,
    autoTranscribe: true
  })

  const onStop = async (): Promise<void> => {
    await stopRecording()
    ipcRenderer.send(ProcessMainEvents.RECORD_RESULT, transcript.text)
  }

  ipcRenderer.on(SettingsWindowEvents.START_RECORD, async () => {
    // const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    // setRecording(recording)
    // setSpeaking(speaking)
    // setTranscribing(transcribing)
    console.log('mediaRecorder.start()')
    // const mediaRecorder = new MediaRecorder(stream)
    // const audioChunks: Blob[] = []

    // mediaRecorder.ondataavailable = (event): void => {
    //   audioChunks.push(event.data)
    // }

    // ipcRenderer.once(SettingsWindowEvents.STOP_RECORD, async () => {
    //   console.log('mediaRecorder.stop() force')
    //   // mediaRecorder.stop()
    //   await stopRecording()

    //   ipcRenderer.send(ProcessMainEvents.RECORD_RESULT, transcript.text)
    // })

    startRecording()

    // const timerId = setTimeout(() => {
    //   mediaRecorder.stop()
    //   console.log('mediaRecorder.stop() force')
    // }, maxRecordTime)

    // mediaRecorder.onstop = (): void => {
    //   const audioBlob = new Blob(audioChunks)
    //   console.log('mediaRecorder RECORD_RESULT', audioBlob)

    //   clearTimeout(timerId)

    //   ipcRenderer.send(ProcessMainEvents.RECORD_RESULT, 'Stopped')
    // }
    // mediaRecorder.start()
  })

  return (
    <>
      <div className="text">
        <p>{!transcript?.text ? '...' : transcript?.text}</p>
      </div>
      <div className="actions">
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={onStop}>
            Stop
          </a>
        </div>
        {recording ? (
          <div className="action">
            <a target="_blank" rel="noreferrer" onClick={pauseRecording}>
              Pause
            </a>
          </div>
        ) : (
          <div className="action">
            <a target="_blank" rel="noreferrer" onClick={startRecording}>
              Start
            </a>
          </div>
        )}
      </div>
    </>
  )
}

export default SpeechRecognizer
