import { TargetDto } from '../../../../shared/dtos/target.dto'

export const TargetForm = ({ target }: { target: TargetDto }): JSX.Element => {
  return <>Target Form {target?.type ?? 'new block'}</>
}
