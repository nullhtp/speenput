import { ScenarioDto } from '../../shared/scenario/scenario.dto'
import { ScenarioStore } from '../domain/scenario.store'
import Database from 'better-sqlite3'
import { ensureFileSync } from 'fs-extra'

const FILENAME = 'scenario.db'

export class DbScenarioStore implements ScenarioStore {
  private readonly db: Database.Database
  constructor() {
    ensureFileSync(FILENAME)

    this.db = new Database(FILENAME, { fileMustExist: true })

    const createTable = `
  CREATE TABLE IF NOT EXISTS scenarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scenario TEXT NOT NULL
  )
`
    this.db.exec(createTable)
  }

  load(): Promise<ScenarioDto[]> {
    const stmt = this.db.prepare('SELECT * FROM scenarios')
    const scenarios = stmt.all().map((row) => JSON.parse((row as any).scenario))

    return Promise.resolve(scenarios)
  }

  async save(scenarios: ScenarioDto[]): Promise<void> {
    const transaction = this.db.transaction(() => {
      this.db.prepare('DELETE FROM scenarios').run()
      const insertStmt = this.db.prepare('INSERT INTO scenarios (scenario) VALUES (?)')
      for (const scenario of scenarios) {
        insertStmt.run(JSON.stringify(scenario))
      }
    })
    transaction()
  }
}
