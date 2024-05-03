import { SourceType } from './source-type'
import { assertNever } from '../shared/utils/assertNever'
import { ClipboardSource } from './clipboard/clipboard-source.main'
import { Source } from './source-base'
import { SelectionSource } from './selection/selection-source.main'
import { InputFieldSource } from './input-field/input-field-source.main'
import { SpeechSource } from './speech/speech-source.main'
import { StaticSource } from './static/static-source.main'
import { SourceDto } from './source.dto'

export class SourceMapper {
  fromDto(dto: SourceDto): Source {
    const type = dto.type
    switch (type) {
      case SourceType.CLIPBOARD:
        return new ClipboardSource()
      case SourceType.SELECTION:
        return new SelectionSource()
      case SourceType.INPUT_FIELD:
        return new InputFieldSource()
      case SourceType.SPEECH:
        return new SpeechSource(dto.params)
      case SourceType.STATIC:
        return new StaticSource(dto.params)
    }
    assertNever(type)
  }
}
