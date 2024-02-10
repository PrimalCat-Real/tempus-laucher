"use client"
 
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@nextui-org/switch"
import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"
import { ScrollArea } from "@/components/ui/scroll-area"
import { renameFile } from "@tauri-apps/api/fs"

 
// const data: Mod[] = [
//   {
//     name: "m5gr84i9",
//     active: false,
//   },
//   {
//     name: "3u1reuv4",
//     active: false,
//   }
// ]
 
export type Mod = {
  name: string
  active: boolean
}
 

async function SwitchMod(fillepath: string, name:String, active: boolean){
  if (fillepath.includes('disabled')) {
    // Remove the ".disabled" string from the filepath if it exists
    const modifiedFilePath = fillepath.replace(".disabled", "");
    await renameFile(fillepath, modifiedFilePath);
    console.log(modifiedFilePath);
    return `${fillepath}.disabled`
  } else {
    // Add the ".disabled" string to the filepath
    const modifiedFilePath = `${fillepath}.disabled`;
    await renameFile(fillepath, modifiedFilePath);
    return `${fillepath}.disabled`
    console.log(modifiedFilePath);
  }
 
  console.log(active);
}
 
export function ModsTable() {
  const columns: ColumnDef<Mod>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize text-primary">{row.getValue("name")}</div>
      ),
    },
    {
      id: "action",
      header: ({ table }) => (
        <div></div>
        // <Checkbox
        //   checked={
        //     table.getIsAllPageRowsSelected() ||
        //     (table.getIsSomePageRowsSelected() && "indeterminate")
        //   }
        //   onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        //   aria-label="Select all"
        // />
      ),
      cell: ({ row }) => (
        <div></div>
        // <Checkbox
        //   checked={row.getIsSelected()}
        //   onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        //   aria-label="Select row"
        // />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "active",
      header: () => <div className="text-right px-2">Active</div>,
      cell: ({ row }) => (
        <div className="flex justify-end items-center">
          <Switch 
            isSelected={row.original.active}
           onValueChange={(value: any) => {
            //  row.setValue("active", !value);
            
            const oppositeValue = !row.getValue("active");
            row.original.active = oppositeValue
            // row.original.name = SwitchMod(`${storedPath}\\instances\\Vanilla\\mods\\${row.getValue("name")}`, value)
            // Update the data source directly
            // const updatedData = data.map(mod => {
            //   if (mod.name === row.getValue("name")) {
            //     return { ...mod, active: oppositeValue };
            //   }
            //   return mod;
            // });
            
            // Update the state with the modified data
            // setData(updatedData);
          }} size="sm" defaultSelected/>
        </div>
        // <div className="capitalize">{row.getValue("active")}</div>
        
      ),
    },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original
   
    //     return (
    //       <div></div>
    //     )
    //   },
    // },
  ]
  const [storedPath, setStoredPath] = useState("")

  useEffect(() => {
    const tempPath = localStorage.getItem('gameFolderPath');
    if(tempPath){
      setStoredPath(tempPath)
    }
  })
  const [data, setData] = useState<Mod[]>([]); 
  
  useEffect(() => {
    const fetchFileNames = async () => {
      const storedPath = localStorage.getItem('gameFolderPath');
      try {
        const response: string[] = await invoke('read_files_from_folder', { folderPath: storedPath + '/instances/Vanilla/mods' });
        // setFileNames(response);
        console.log(response);
        // response.map(mod => ({
        //     name:mod,
        //     active: !response.includes(".disabled"),
        // }));
        
        // const tempData: Mod[] = response.map(mod => ({
        //   name:mod,
        //   active: !mod.includes(".disabled")
        // }));
        // setData(tempData)
       
        
      } catch (error) {
        console.error('Error fetching file names:', error);
      }
    };

    fetchFileNames();
  }, []);

  // table

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
 
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
 
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter mods..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-secondary"
        />

      </div>
      <div className="rounded-none border">
        <Table className="">
          <TableHeader className="sticky top-0 z-40 bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
      </div>
      
    </div>
  )
}