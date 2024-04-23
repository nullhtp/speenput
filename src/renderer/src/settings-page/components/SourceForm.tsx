import { Card, CardHeader, Divider, CardBody } from '@nextui-org/react'
import { SourceDto } from '../../../../shared/dtos/source.dto'

export const SourceForm = ({ source }: { source: SourceDto }): JSX.Element => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Source</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
    </Card>
  )
}
