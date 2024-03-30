import { CldUploadWidget } from "next-cloudinary";
import { ImageUp, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div>
      <div className=" mb-4 flex flex-wrap items-center gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative w-[200px] h-[100px]">
            <div className="absolute top-0 right-0 z-10">
                <Button onClick={(()=>onRemove(url))} className="bg-red-1 text-white" size='sm'>
                <Trash />
                </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill={true}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="heu9zpe0" onUpload={onUpload}>
        {({ open }) => {
          return (
            <>
            {value.length > 0?(''):(
            <Button type="button" onClick={() => open()} className="bg-grey-1 text-white">
              <ImageUp  className="h-4 w-4 mr-1" />Upload Image
            </Button>
            )}
            </>
            
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
