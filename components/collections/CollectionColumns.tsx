"use client";

import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";
import Delete from "../custom-ui/Delete";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
        
        <Link
        href={`/admin/collections/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
        
      
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="collection" id={row.original._id} />,
  },
];