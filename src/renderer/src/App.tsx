import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Settings } from './settings-page/Settings'

const router = createHashRouter([
  {
    path: '/',
    element: <Settings />
  }
])

export default function App(): JSX.Element {
  return <RouterProvider router={router} />
}
