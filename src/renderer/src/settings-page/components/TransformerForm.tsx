import { TransformerDto } from '../../../../shared/dtos/transformer.dto'

export const TransformerForm = ({
  transformers
}: {
  transformers?: TransformerDto[]
}): JSX.Element => {
  return <>Transformer Form {transformers?.length ?? 'new block'}</>
}
