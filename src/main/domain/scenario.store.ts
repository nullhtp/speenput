import { ScenarioDto } from '../../shared/dtos/scenario.dto'

export interface ScenarioStore {
  load(): Promise<ScenarioDto[]>
  save(scenarios: ScenarioDto[]): Promise<void>
}
