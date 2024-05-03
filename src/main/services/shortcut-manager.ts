import { globalShortcut } from 'electron'
import { Scenario } from '../../shared/scenario/scenario'

export class ShortcutManager {
  register(keyCombination: string, scenario: Scenario): void {
    const ret = globalShortcut.register(keyCombination, async () => {
      await scenario.execute()
    })

    if (!ret) {
      console.log('registration failed')
    }
  }

  unregister(keyCombination: string): void {
    globalShortcut.unregister(keyCombination)
  }

  unregisterAll(): void {
    globalShortcut.unregisterAll()
  }
}
