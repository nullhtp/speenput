import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function Settings(): JSX.Element {
  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Settings</div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <Versions></Versions>
    </>
  )
}

export default Settings
