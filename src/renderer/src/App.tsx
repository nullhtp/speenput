import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Settings } from './settings-page/Settings'
import { SpeechRecognizer } from './speech-recognizer-page/SpeechRecognizer'

const router = createHashRouter([
  {
    path: '/',
    element: <Settings />
  },
  {
    path: '/recognizer',
    element: <SpeechRecognizer />
  }
])

export default function App(): JSX.Element {
  return <RouterProvider router={router} />
}
