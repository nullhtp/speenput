import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

let mediaRecorder
let audioChunks = []

function App(): JSX.Element {
  const ipcHandle = (): void => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {

      console.log('mediaRecorder.start()')
      mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.ondataavailable = (event): void => {
        audioChunks.push(event.data)
      }
      mediaRecorder.onstop = (): void => {
        const audioBlob = new Blob(audioChunks)
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = document.querySelector('audio')
        audio.src = audioUrl
        audioChunks = []
        console.log('audioChunks', audioChunks)
      }
      mediaRecorder.start()
      setTimeout(() => {
        mediaRecorder.stop()
        console.log('mediaRecorder.stop()')
      }, 5000)
    })
  }

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <audio controls></audio>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
