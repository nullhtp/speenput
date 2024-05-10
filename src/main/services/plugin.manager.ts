import { AppTray } from '../core/app-tray'
import ClipboardSourceFactory from '../../shared/sources/clipboard'
import InputFieldSourceFactory from '../../shared/sources/input-field'
import SelectionSourceFactory from '../../shared/sources/selection'
import SpeechSourceFactory from '../../shared/sources/speech'
import ClipboardTargetFactory from '../../shared/targets/clipboard'
import InputAppendTargetFactory from '../../shared/targets/input-append'
import InputReplaceTargetFactory from '../../shared/targets/input-replace'
import MessageboxTargetFactory from '../../shared/targets/messagebox'
import OpenAiTextTransformerFactory from '../../shared/transformers/openai-text'
import {
  FactoryType,
  SourceFactory,
  TargetFactory,
  TransformFactory
} from '../../shared/types/action-factory'

const plugins = [
  ClipboardSourceFactory,
  InputFieldSourceFactory,
  SelectionSourceFactory,
  SpeechSourceFactory,
  ClipboardTargetFactory,
  InputAppendTargetFactory,
  InputReplaceTargetFactory,
  MessageboxTargetFactory,
  OpenAiTextTransformerFactory
]

export class PluginManager {
  private sources: Map<string, SourceFactory> = new Map<string, SourceFactory>()
  private targets: Map<string, TargetFactory> = new Map<string, TargetFactory>()
  private transforms: Map<string, TransformFactory> = new Map<string, TransformFactory>()
  constructor(private readonly tray: AppTray) {}

  load(): void {
    for (const plugin of plugins) {
      const instance = new plugin({ notifier: this.tray })
      switch (instance.type) {
        case FactoryType.SOURCE:
          this.sources.set(instance.getActionTypeName(), instance as SourceFactory)
          break
        case FactoryType.TARGET:
          this.targets.set(instance.getActionTypeName(), instance as TargetFactory)
          break
        case FactoryType.TRANSFORMER:
          this.transforms.set(instance.getActionTypeName(), instance as TransformFactory)
          break
        default:
          this.tray.notify(
            `Error on plugin "${instance.getActionTypeName()}" load`,
            'Plugin factory should be one of this types: "source", "target" or "transformer"'
          )
      }
    }
  }

  getSources(): SourceFactory[] {
    return Array.from(this.sources.values())
  }

  getTargets(): TargetFactory[] {
    return Array.from(this.targets.values())
  }

  getTransforms(): TransformFactory[] {
    return Array.from(this.transforms.values())
  }
}
