import { readJSON, writeJSON } from 'fs-extra'
import { ScenarioDto } from '../../shared/scenario/scenario.dto'
import { ScenarioStore } from '../domain/scenario.store'
import { delay } from '../../shared/utils/delay'

export class FileScenarioStore implements ScenarioStore {
  constructor(private readonly fileName: string) {}

  load(): Promise<ScenarioDto[]> {
    return readJSON(this.fileName)
  }

  async save(scenarios: ScenarioDto[]): Promise<void> {
    await writeJSON(this.fileName, scenarios)
    await delay(500)
  }
}
