import { createHashRouter, RouterProvider } from 'react-router-dom'
import Settings from './Settings'
import SpeechRecognizer from './SpeechRecognizer'

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
