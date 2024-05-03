import { ScenarioDto } from '../../shared/scenario/scenario.dto'

export interface ScenarioStore {
  load(): Promise<ScenarioDto[]>
  save(scenarios: ScenarioDto[]): Promise<void>
}
