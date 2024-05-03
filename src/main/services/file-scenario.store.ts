import { readJSON, writeJSON } from 'fs-extra'
import { ScenarioDto } from '../../shared/scenario/scenario.dto'
import { ScenarioStore } from '../domain/scenario.store'

export class FileScenarioStore implements ScenarioStore {
  constructor(private readonly fileName: string) {}

  load(): Promise<ScenarioDto[]> {
    return readJSON(this.fileName)
  }

  save(scenarios: ScenarioDto[]): Promise<void> {
    return writeJSON(this.fileName, scenarios)
  }
}
