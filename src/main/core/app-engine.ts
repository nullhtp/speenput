import { app, ipcMain } from 'electron'
import { SettingsWindow } from '../windows/settings-window'
import { AppTray } from './app-tray'
import { ScenarioManager } from '../services/scenario.manager'
import { join } from 'path'
import { FileScenarioStore } from '../services/file-scenario.store'
import { ScenariosInitializer } from '../services/scenarios-initializer'
import { ProcessMainEvents } from '../../shared/process-main.events'
import { ScenarioDto } from '../../shared/scenario/scenario.dto'
import { ShortcutManager } from '../services/shortcut-manager'
import { AppState, Status } from '../services/app-state'
import { PluginManager } from '../services/plugin.manager'

const SCENARIO_FILE_PATH = join('.', 'scenarios.json')

export class AppEngine {
  private settingsWindow = new SettingsWindow()
  private appTray = new AppTray()
  private appState = new AppState()
  private pluginManager = new PluginManager(this.appTray)

  private scenarioInitializer = new ScenariosInitializer(SCENARIO_FILE_PATH)

  private shortcutManager = new ShortcutManager(this.appState)

  private scenarioManager!: ScenarioManager

  async init(): Promise<void> {
    this.pluginManager.load()
    this.scenarioManager = new ScenarioManager(
      new FileScenarioStore(SCENARIO_FILE_PATH),
      this.shortcutManager,
      this.pluginManager
    )

    process.on('uncaughtException', (error) => {
      this.appTray.notify('Error', error.message)
    })

    process.on('unhandledRejection', (error: Error) => {
      this.appTray.notify('Error', error.message ?? 'Unknown error')
    })
    await this.scenarioInitializer.initializeIfNot()

    ipcMain.on(ProcessMainEvents.GET_SETTINGS, async () => {
      await this.scenarioManager.reload()
      this.settingsWindow.updateScenarios(this.scenarioManager.getScenarios())
    })

    ipcMain.on(ProcessMainEvents.INIT_SETTINGS_WINDOW, async () => {
      this.settingsWindow.init({
        source: this.pluginManager.getSources().map((p) => p.getFormDefinition()),
        target: this.pluginManager.getTargets().map((p) => p.getFormDefinition()),
        transform: this.pluginManager.getTransforms().map((p) => p.getFormDefinition())
      })
    })

    ipcMain.on(ProcessMainEvents.UPDATE_SCENARIOS, async (_, updatedScenarios: ScenarioDto[]) => {
      this.scenarioManager.save(updatedScenarios)
      await this.scenarioManager.reload()
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

    this.appState.onStatusChange((status) => {
      status === Status.Ready ? this.appTray.changeToReady() : this.appTray.changeToInProgress()
    })
  }

  getSettingsWindow(): SettingsWindow {
    return this.settingsWindow
  }

  exit(): void {
    app.quit()
  }
}
