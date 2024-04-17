import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { ListboxWrapper } from './ListboxWrapper'
import { Key, useState } from 'react'

type ScenarioItem = {
  name: string
  hotkey: string
}

export const LeftMenu = ({ scenarios }: { scenarios: ScenarioItem[] }): JSX.Element => {
  const [selectedKey, setSelectedKey] = useState<string>()

  const onAction = (key: Key): void => {
    setSelectedKey(key.toString())
  }

  let elementItems = scenarios.map((scenario) => (
    <ListboxItem
      key={scenario.name}
      description={scenario.hotkey}
      className={selectedKey === scenario.name ? 'text-secondary' : ''}
      color={selectedKey === scenario.name ? 'secondary' : 'default'}
    >
      {scenario.name}
    </ListboxItem>
  ))

  elementItems = [
    <ListboxItem
      key="new"
      description="Create a new scenario"
      className="text-success"
      color="success"
      showDivider
    >
      Add new
    </ListboxItem>,
    ...elementItems
  ]
  return (
    <ListboxWrapper>
      <Listbox variant="flat" aria-label="Listbox menu with sections" onAction={onAction}>
        <ListboxSection title="Scenarios" items={scenarios}>
          {elementItems}
        </ListboxSection>
      </Listbox>
    </ListboxWrapper>
  )
}
