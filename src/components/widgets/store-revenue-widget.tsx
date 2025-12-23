import { useSuspenseQuery } from '@tanstack/react-query'
import { PieChart } from '@mui/x-charts'
import { retailStoresSource } from '@/components/const.ts'

export const StoreRevenueWidget = () => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['retailStoresSource', 'revenue-per-storetype'],
    queryFn: async () => {
      const dataSource = await retailStoresSource

      return dataSource.widgetSource.getCategories({
        column: 'storetype',
        operation: 'sum',
        operationColumn: 'revenue',
      })
    },
    staleTime: Infinity,
  })

  if (error && !isFetching) {
    throw error
  }

  const categories = data.map((d) => ({
    label: d.name as string,
    value: d.value,
  }))

  return (
    <PieChart
      series={[
        {
          data: categories,
          valueFormatter: (series) =>
            Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(series.value),
        },
      ]}
      width={200}
      height={200}
    />
  )
}
