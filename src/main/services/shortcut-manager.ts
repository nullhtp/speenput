import { globalShortcut } from 'electron'
import { Scenario } from '../../shared/scenario/scenario'
import { AppState, Status } from './app-state'

export class ShortcutManager {
  constructor(private readonly state: AppState) {}

  register(keyCombination: string, scenario: Scenario): void {
    try {
      const ret = globalShortcut.register(keyCombination, async () => {
        if (this.state.getStatus() === Status.InProgress) {
          return
        }
        try {
          this.state.changeStatus(Status.InProgress)
          console.log(`Start `, keyCombination)
          await scenario.execute()
          console.log('End ', keyCombination)
        } catch (e) {
          console.log('Error>>> ', e)
        } finally {
          this.state.changeStatus(Status.Ready)
        }
      })

      if (!ret) {
        console.log('registration failed')
      }
    } catch (e) {
      console.log(e)
    }
  }

  unregister(keyCombination: string): void {
    globalShortcut.unregister(keyCombination)
  }

  unregisterAll(): void {
    globalShortcut.unregisterAll()
  }
}
