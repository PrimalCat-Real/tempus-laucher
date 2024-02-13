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
import { Mod, folderPathState, modsConfigState } from "@/lib/data"
import { useRecoilState } from "recoil"
import { Avatar } from "@nextui-org/avatar"
import { cn } from "@/lib/utils"
import { fileURLToPath } from "url"
import { ArrowUpDown } from "lucide-react"
 
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
 
 

async function SwitchMod(filepath: string, active: boolean){
  if(active){
    const modifiedFilePath = filepath.replace(".disabled", "");
    await renameFile(filepath, modifiedFilePath);
    return modifiedFilePath
  }else if(!filepath.includes('disabled')){
    const modifiedFilePath = `${filepath}.disabled`;
    await renameFile(filepath, modifiedFilePath);
    return modifiedFilePath
  }
  return filepath
  // if (fillepath.includes('disabled')) {
  //   // Remove the ".disabled" string from the filepath if it exists
  //   const modifiedFilePath = fillepath.replace(".disabled", "");
  //   await renameFile(fillepath, modifiedFilePath);
  //   console.log(modifiedFilePath);
  //   return `${fillepath}.disabled`
  // } else {
  //   // Add the ".disabled" string to the filepath
  //   const modifiedFilePath = `${fillepath}.disabled`;
  //   await renameFile(fillepath, modifiedFilePath);
  //   return `${fillepath}.disabled`
  //   console.log(modifiedFilePath);
  // }
 
  // console.log(active);
}
 
export function ModsTable() {

  const [modsConfig, setModsConfig] = useRecoilState(modsConfigState);

  const [rawData, setRawData] = useState<Mod[]>([]);

  
  const columns: ColumnDef<Mod>[] = [
    {
      accessorKey: "image",
      header: ({ table }) => (
        <div></div>
      ),
      cell: ({ row }) => (
        <Avatar className="" name={row.getValue("name")} size="sm" src={row.getValue("image")}>
          
        </Avatar>
      ),
    },
    {
      accessorKey: "name",
      header: ({column}) => <div className="text-right cursor-pointer flex items-center gap-2 justify-start px-1"  onClick={() => 
        {column.toggleSorting(
        column.getIsSorted() === "asc")
        }}>Название<ArrowUpDown size={16} /></div>,
      cell: ({ row }) => (
        <div className="capitalize text-primary flex flex-col">
          {row.getValue("name")}
          {/* {row.original.filePathName} */}
        </div>
      ),
    },
    // {
    //   id: "action",
    //   header: ({ table }) => (
    //     <div></div>
    //   ),
    //   cell: ({ row }) => (
    //     <div></div>
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "active",
      header: ({column}) => <div className="text-right px-1 cursor-pointer flex items-center gap-2 justify-end"  onClick={() => 
        {column.toggleSorting(
        column.getIsSorted() === "asc")
        }}>Active<ArrowUpDown size={16} /></div>,
      cell: ({ row }) => (
        <div className="flex justify-end items-center">
          <Switch 
            isSelected={row.getValue("active")}
            // @TODO make all disabled check using this
            isDisabled={!modsConfig.find(mod => mod.name === row.getValue("name"))?.installed}
           onValueChange={async (value: any) => {

            let updatedMods = await Promise.all(modsConfig.map(async mod => {
                if (mod.name === row.getValue("name")) {
                    return {
                        ...mod,
                        active: !mod.active,
                        filePathName: await SwitchMod(mod.filePathName, !mod.active)
                    };
                }
                return mod;
            }));
      
          console.log("updatedMods", updatedMods);
          setModsConfig(updatedMods);
            // const oppositeValue = !row.getValue("active");
            // row.original.active = oppositeValue
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
          {/* <Switch 
              isSelected={row.getValue("active")}
              onValueChange={async (value: any) => {
                const modName = row.getValue("name");
                const modIndex = modsConfig.findIndex(mod => mod.name === modName);
                if (modIndex !== -1) {
                  const updatedMods = [...modsConfig];
                  updatedMods[modIndex].active = !value;
                  setModsConfig(updatedMods);
                  await SwitchMod(`${storedPath}\\instances\\Vanilla\\mods\\${modName}`, modName, value);
                }
              }}
              size="sm"
              defaultSelected
            /> */}
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
  const [folderPath, setFolderPath] = useRecoilState(folderPathState)


  


  useEffect(() => {

    // setData(modsConfig)
  }, [modsConfig])


  // table

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
 
  const table = useReactTable({
    data: modsConfig,
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
          placeholder="Фильтровать моды..."
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
                  className={cn("row.getValue('active')")}
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
