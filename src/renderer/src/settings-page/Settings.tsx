import { ScenarioDto } from '../../../shared/scenario/scenario.dto'
import { LeftMenu } from './components/LeftMenu'
import { ScenarioEdit } from './components/ScenarioEdit'
import { useEffect, useState } from 'react'
import { ProcessMainEvents } from '../../../shared/process-main.events'
import { SettingsWindowEvents } from '../../../shared/settings-window.events'
import { SourceType } from '../../../shared/sources/source-type'
import { TargetType } from '../../../shared/targets/target-type'
import { v4 } from 'uuid'
import { pipe, findIndex, propEq, update } from 'ramda'

export const Settings = (): JSX.Element => {
  const ipcRenderer = window.electron.ipcRenderer

  const [scenarios, setScenarios] = useState<ScenarioDto[]>([])
  const [currentScenario, setCurrentScenario] = useState<ScenarioDto | undefined>()

  ipcRenderer.on(SettingsWindowEvents.UPDATE_SETTINGS, (_, result) => setScenarios(result))

  useEffect(() => {
    ipcRenderer.send(ProcessMainEvents.GET_SETTINGS)
  }, [])

  const onChange = (scenario: ScenarioDto): void => {
    // const filteredScenarios
    const updatedScenarios = pipe(findIndex(propEq(scenario.id, 'id')), (index) =>
      update(index, scenario, scenarios)
    )(scenarios)
    setScenarios(updatedScenarios)
    ipcRenderer.send(ProcessMainEvents.UPDATE_SCENARIOS, updatedScenarios)
  }
  const onAdd = (): void => {
    const newScenarios: ScenarioDto = {
      id: v4(),
      hotkey: 'ALT+',
      name: `New Scenario ${Date.now()}`,
      source: {
        type: SourceType.INPUT_FIELD
      },
      target: {
        type: TargetType.INPUT_REPLACE
      }
    }

    setScenarios([...scenarios, newScenarios])
    setCurrentScenario(newScenarios)
  }

  return (
    <div className="flex flex-row gap-3">
      <LeftMenu
        scenarios={scenarios}
        onChange={(scenario: ScenarioDto) => setCurrentScenario(scenario)}
        onAdd={onAdd}
      ></LeftMenu>
      <ScenarioEdit scenario={currentScenario} onChange={onChange}></ScenarioEdit>
    </div>
  )
}
