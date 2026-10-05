import { type ReactNode } from 'react'

type Column<T> = {
  key: string
  label: string
  render?: (row: T) => ReactNode
}

type ResourceTableProps<T extends Record<string, unknown>> = {
  columns: Column<T>[]
  rows: T[]
  emptyLabel?: string
}

export default function ResourceTable<T extends Record<string, unknown>>({
  columns,
  rows,
  emptyLabel = 'Aucune donnée',
}: ResourceTableProps<T>) {
  if (rows.length === 0) {
    return <p className="muted">{emptyLabel}</p>
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={(row.id as string | undefined) ?? index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : String(row[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
