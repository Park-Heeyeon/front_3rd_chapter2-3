import { forwardRef, HTMLAttributes } from "react"

interface TableProps<T> extends HTMLAttributes<T> {
  className?: string
}

export const Table = forwardRef<HTMLTableElement, TableProps<HTMLTableElement>>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
))
Table.displayName = "Table"

export const TableHeader = forwardRef<HTMLTableSectionElement, TableProps<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />,
)
TableHeader.displayName = "TableHeader"

export const TableBody = forwardRef<HTMLTableSectionElement, TableProps<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
  ),
)
TableBody.displayName = "TableBody"

export const TableRow = forwardRef<HTMLTableRowElement, TableProps<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
      {...props}
    />
  ),
)
TableRow.displayName = "TableRow"

export const TableCell = forwardRef<HTMLTableCellElement, TableProps<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
  ),
)
TableCell.displayName = "TableCell"

export const TableHead = forwardRef<HTMLTableCellElement, TableProps<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  ),
)
TableHead.displayName = "TableHead"
