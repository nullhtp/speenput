import { SourceDto } from '../../../../shared/dtos/source.dto'

export const SourceForm = ({ source }: { source: SourceDto }): JSX.Element => {
  return <>Source Form {source?.type ?? 'new block'}</>
}
