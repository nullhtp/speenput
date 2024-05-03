import { Scenario } from '../../shared/scenario/scenario'
import { ScenarioStore } from '../domain/scenario.store'
import { ScenarioMapper } from '../../shared/scenario/scenario.mapper'
import { ShortcutManager } from './shortcut-manager'

export class ScenarioManager {
  private mapper = new ScenarioMapper()
  private shortcutManager = new ShortcutManager()

  private scenarios: Map<string, Scenario> = new Map<string, Scenario>()
  constructor(private readonly store: ScenarioStore) {}

  async reload(): Promise<void> {
    this.shortcutManager.unregisterAll()
    const scenarioDtos = await this.store.load()

    for (const scenarioDto of scenarioDtos) {
      const scenario = this.mapper.fromDto(scenarioDto)
      this.shortcutManager.register(scenarioDto.hotkey, scenario)
      this.scenarios.set(scenarioDto.name, scenario)
    }
  }
}
