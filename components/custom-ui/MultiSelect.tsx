"use client";

import { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  const selectables = collections?.filter((collection) => !selected.includes(collection)); 



  return (
    <div>
         <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.length>0 && selected[0] && selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button type="button" className="ml-1 hover:text-red-1" onClick={() => onRemove(collection._id)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>
        <div className="relative mt-2">
          {open && collections.length > 0 && (
            <CommandGroup className="absolute bg-white-1 text-gray-900 w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
              <CommandList>
                {selectables.map((collection) => (
                  <CommandItem
                  className="hover:bg-blue-300 cursor-pointer"
                    key={collection._id}
                    onMouseDown={(e)=>{e.preventDefault()
                    }
                    // TODO: on click on item to select
                    }
                    onSelect={() => {
                      onChange(collection._id);
                      setInputValue("");
                    }}
                    
                  >
                    {collection.title}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          )}
        </div>
      </Command>
    </div>
  );
};

export default MultiSelect;
