import { globalShortcut } from 'electron'
import { Scenario } from '../../shared/scenario/scenario'

export class ShortcutManager {
  register(keyCombination: string, scenario: Scenario): void {
    try {
      const ret = globalShortcut.register(keyCombination, async () => {
        console.log(`Start `, keyCombination)
        await scenario.execute()
        console.log('End ', keyCombination)
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
