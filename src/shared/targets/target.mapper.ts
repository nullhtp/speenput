import { assertNever } from '../utils/assertNever'
import { TargetDto } from '../dtos/target.dto'
import { TargetType } from './target-type'
import { Target } from './target-base'
import { ClipboardTarget } from './clipboard/clipboard-target.main'
import { ConsoleTarget } from './console/console-target.main'
import { InputAppendTarget } from './input-append/input-append-target.main'
import { InputReplaceTarget } from './input-replace/input-replace-target.main'
import { MessageBoxTarget } from './messagebox/messagebox-target.main'

export class TargetMapper {
  fromDto(dto: TargetDto): Target {
    const type = dto.type
    switch (type) {
      case TargetType.CLIPBOARD:
        return new ClipboardTarget()
      case TargetType.CONSOLE:
        return new ConsoleTarget()
      case TargetType.INPUT_APPEND:
        return new InputAppendTarget()
      case TargetType.INPUT_REPLACE:
        return new InputReplaceTarget()
      case TargetType.MESSAGE_BOX:
        return new MessageBoxTarget()
    }
    assertNever(type)
  }
}
