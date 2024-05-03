import { app, ipcMain } from 'electron'
import { SettingsWindow } from '../windows/settings-window'
import { AppTray } from './app-tray'
import { ScenarioManager } from '../services/scenario.manager'
import { join } from 'path'
import { FileScenarioStore } from '../services/file-scenario.store'
import { watchFile } from 'fs-extra'
import { ScenariosInitializer } from '../services/scenarios-initializer'
import { ProcessMainEvents } from '../../shared/process-main.events'
import { ScenarioDto } from '../../shared/scenario/scenario.dto'

const SCENARIO_FILE_PATH = join('.', 'scenarios.json')

export class AppEngine {
  private settingsWindow = new SettingsWindow()
  private appTray = new AppTray()

  private scenarioInitializer = new ScenariosInitializer(SCENARIO_FILE_PATH)

  private scenarioManager = new ScenarioManager(new FileScenarioStore(SCENARIO_FILE_PATH))

  async init(): Promise<void> {
    process.on('uncaughtException', (error) => {
      this.appTray.showBalloon('Error', error.message)
    })

    process.on('unhandledRejection', (error: Error) => {
      this.appTray.showBalloon('Error', error.message ?? 'Unknown error')
    })
    await this.scenarioInitializer.initializeIfNot()

    ipcMain.on(ProcessMainEvents.GET_SETTINGS, async () => {
      await this.scenarioManager.reload()
      this.settingsWindow.updateScenarios(this.scenarioManager.getScenarios())
    })

    // watchFile(SCENARIO_FILE_PATH, async () => {
    //   console.log('watchFile>>>')

    //   await this.scenarioManager.reload()
    //   this.settingsWindow.updateScenarios(this.scenarioManager.getScenarios())
    // })

    ipcMain.on(ProcessMainEvents.UPDATE_SCENARIOS, (e, updatedScenarios: ScenarioDto[]) => {
      console.log('UPDATE_SCENARIOS>>>', updatedScenarios)
      this.scenarioManager.save(updatedScenarios)
    })

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      this.settingsWindow?.show()
    })

    this.appTray.init(
      () => this.settingsWindow.toggle(),
      () => this.exit()
    )
  }

  getSettingsWindow(): SettingsWindow {
    return this.settingsWindow
  }

  exit(): void {
    app.quit()
  }
}
