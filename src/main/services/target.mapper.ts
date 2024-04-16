import { assertNever } from '../../shared/utils/assertNever'
import { TargetDto } from '../../shared/dtos/target.dto'
import { Target } from '../domain/target'
import { TargetType } from '../../shared/types/target-type'
import { ClipboardTarget } from '../targets/clipboard-target'
import { ConsoleTarget } from '../targets/console-target'
import { InputAppendTarget } from '../targets/input-append-target'
import { InputReplaceTarget } from '../targets/input-replace-target'
import { MessageBoxTarget } from '../targets/message-box-target'

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
