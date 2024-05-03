import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { ListboxWrapper } from './ListboxWrapper'
import { Key, useState } from 'react'
import { ScenarioDto } from 'src/shared/scenario/scenario.dto'

export const LeftMenu = ({
  scenarios,
  onChange,
  onAdd
}: {
  scenarios: ScenarioDto[]
  onChange: (scenario: ScenarioDto) => void
  onAdd: () => void
}): JSX.Element => {
  const [selectedKey, setSelectedKey] = useState<string>()

  const onAction = (key: Key): void => {
    const id = key.toString()
    if (id === '__new__') {
      onAdd()
    } else if (id) {
      setSelectedKey(id)
      const selectedItem = scenarios.find((scenario) => scenario.id === id)
      selectedItem && onChange(selectedItem)
    }
  }

  let elementItems = scenarios.map((scenario) => (
    <ListboxItem
      key={scenario.id}
      description={scenario.hotkey}
      className={selectedKey === scenario.name ? 'text-secondary' : ''}
      color={selectedKey === scenario.name ? 'secondary' : 'default'}
    >
      {scenario.name}
    </ListboxItem>
  ))

  elementItems = [
    <ListboxItem
      key="__new__"
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
