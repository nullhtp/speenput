import { SourceDto } from '../../shared/dtos/source.dto'
import { SourceType } from '../../shared/types/source-type'
import { Source } from '../domain/source'
import { assertNever } from '../../shared/utils/assertNever'
import { ClipboardSource } from '../sources/clipboard-source'
import { SelectionSource } from '../sources/selection-source'
import { SpeechSource } from '../sources/speech-source'
import { StaticSource } from '../sources/static-source'
import { InputFieldSource } from '../sources/input-field-source'

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
