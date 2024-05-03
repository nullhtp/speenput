import { Scenario } from '../../shared/scenario/scenario'
import { ScenarioStore } from '../domain/scenario.store'
import { ScenarioMapper } from '../../shared/scenario/scenario.mapper'
import { ShortcutManager } from './shortcut-manager'
import { ScenarioDto } from '../../shared/scenario/scenario.dto'

export class ScenarioManager {
  private mapper = new ScenarioMapper()
  private shortcutManager = new ShortcutManager()

  private scenarios: Map<string, Scenario> = new Map<string, Scenario>()
  constructor(private readonly store: ScenarioStore) {}

  getScenarios(): Scenario[] {
    return Array.from(this.scenarios.values())
  }

  async reload(): Promise<void> {
    this.shortcutManager.unregisterAll()
    this.scenarios.clear()
    const scenarioDtos = await this.store.load()

    for (const scenarioDto of scenarioDtos) {
      const scenario = this.mapper.fromDto(scenarioDto)
      this.shortcutManager.register(scenarioDto.hotkey, scenario)
      this.scenarios.set(scenarioDto.name, scenario)
    }
  }

  async save(scenarios: ScenarioDto[]): Promise<void> {
    await this.store.save(scenarios)
  }
}
