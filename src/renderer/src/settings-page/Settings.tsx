import { ScenarioDto } from '../../../shared/scenario/scenario.dto'
import { LeftMenu } from './components/LeftMenu'
import { ScenarioEdit } from './components/ScenarioEdit'
import { useEffect, useState } from 'react'
import { ProcessMainEvents } from '../../../shared/process-main.events'
import { SettingsWindowEvents } from '../../../shared/settings-window.events'
import { v4 } from 'uuid'
import { pipe, findIndex, propEq, update, remove } from 'ramda'

export const Settings = (): JSX.Element => {
  const ipcRenderer = window.electron.ipcRenderer

  const [scenarios, setScenarios] = useState<ScenarioDto[]>([])
  const [currentScenario, setCurrentScenario] = useState<ScenarioDto | undefined>()
  const [defenitions, setDefenitions] = useState({
    source: [],
    target: [],
    transform: []
  })

  ipcRenderer.on(SettingsWindowEvents.UPDATE_SETTINGS, (_, result) => setScenarios(result))
  ipcRenderer.on(SettingsWindowEvents.INIT_SETTINGS_WINDOW, (_, result) => {
    setDefenitions(result)
    ipcRenderer.send(ProcessMainEvents.GET_SETTINGS)
  })

  useEffect(() => {
    ipcRenderer.send(ProcessMainEvents.INIT_SETTINGS_WINDOW)
  }, [])

  const onChange = (scenario: ScenarioDto): void => {
    const updatedScenarios = pipe(findIndex(propEq(scenario.id, 'id')), (index) =>
      update(index, scenario, scenarios)
    )(scenarios)
    setScenarios(updatedScenarios)
    ipcRenderer.send(ProcessMainEvents.UPDATE_SCENARIOS, updatedScenarios)
    setCurrentScenario(scenario)
  }

  const onDelete = (scenario: ScenarioDto): void => {
    const updatedScenarios = pipe(findIndex(propEq(scenario.id, 'id')), (index) =>
      remove(index, 1, scenarios)
    )(scenarios)
    setScenarios(updatedScenarios)
    ipcRenderer.send(ProcessMainEvents.UPDATE_SCENARIOS, updatedScenarios)
    setCurrentScenario(undefined)
  }

  const onAdd = (): void => {
    const newScenarios: ScenarioDto = {
      id: v4(),
      hotkey: 'ALT+',
      name: `New Scenario ${Date.now()}`,
      source: {
        type: '',
        params: {}
      },
      target: {
        type: '',
        params: {}
      }
    }

    setScenarios([...scenarios, newScenarios])
    setCurrentScenario(newScenarios)
  }

  return (
    <div className="flex flex-row gap-1 h-lvh">
      <LeftMenu
        scenarios={scenarios}
        current={currentScenario}
        onChange={(scenario: ScenarioDto) => setCurrentScenario(scenario)}
        onAdd={onAdd}
        onDelete={onDelete}
      ></LeftMenu>
      <ScenarioEdit
        sourceDefinitions={defenitions.source}
        targetDefinitions={defenitions.target}
        transformDefinitions={defenitions.transform}
        scenario={currentScenario}
        onChange={onChange}
        onCreate={onAdd}
      ></ScenarioEdit>
    </div>
  )
}
