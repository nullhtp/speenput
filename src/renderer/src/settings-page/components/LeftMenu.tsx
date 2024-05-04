import { Button, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { ListboxWrapper } from './ListboxWrapper'
import { Key } from 'react'
import { ScenarioDto } from 'src/shared/scenario/scenario.dto'
import { DeleteIcon } from '@renderer/icons/DeleteIcon'

export const LeftMenu = ({
  scenarios,
  current,
  onChange,
  onDelete,
  onAdd
}: {
  scenarios: ScenarioDto[]
  current?: ScenarioDto
  onChange: (scenario: ScenarioDto) => void
  onDelete: (scenario: ScenarioDto) => void
  onAdd: () => void
}): JSX.Element => {
  const onAction = (key: Key): void => {
    const id = key.toString()
    if (id === '__new__') {
      onAdd()
    } else if (id) {
      const selectedItem = scenarios.find((scenario) => scenario.id === id)
      selectedItem && onChange(selectedItem)
    }
  }

  let elementItems = scenarios.map((scenario) => (
    <ListboxItem
      key={scenario.id}
      description={scenario.hotkey}
      className={current?.id === scenario.id ? 'text-secondary' : ''}
      color={current?.id === scenario.id ? 'secondary' : 'default'}
      endContent={
        <Button isIconOnly color="danger" variant="light" onClick={() => onDelete(scenario)}>
          <DeleteIcon />
        </Button>
      }
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
