import { statSync, writeJSON, ensureFile } from 'fs-extra'
import { initScenarios } from './scenarios.initialization'

export class ScenariosInitializer {
  constructor(private filename: string) {}
  async initializeIfNot(): Promise<void> {
    await ensureFile(this.filename)

    const stats = statSync(this.filename)

    if (stats.size > 0) {
      return
    }

    const scenarioDtos = initScenarios.map((scenario) => scenario.toDto())

    await writeJSON(this.filename, scenarioDtos)
  }
}
