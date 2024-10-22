import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { FileIcon, UploadCloud, XIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";

const ProductUploadImage = ({
  imageFile,
  setImageFile,
  uploadImageUrl,
  setUploadImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) setImageFile(selectedImage);
  };

  const handleImageFileDragDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files?.[0];
    if (droppedFiles) setImageFile(droppedFiles);
  };

  const handleImageFileDropOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImageUpload = () => {
    if (imageFile) {
      setImageFile("");
    }
  };

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:8000/api/admin/products/upload-image",
      data
    );
    console.log(response.data);
    if (response?.data?.success) {
      setUploadImageUrl(response?.data?.result?.url);
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      {!isEditMode ? (
        <>
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageFileChange}
            onDrag={handleImageFileDragDrop}
            onDragOver={handleImageFileDropOver}
            id="image-upload"
            className="hidden"
          />
          {!imageFile ? (
            <Label
              htmlFor="image-upload"
              className="flex cursor-pointer flex-col rounded-lg mt-3 justify-center items-center w-full h-32 border-2 border-dashed"
            >
              <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
              <span>Drag & Drop or click to upload image</span>
            </Label>
          ) : imageLoadingState ? (
            <Skeleton className="h-12 bg-gray-400" />
          ) : (
            <div className="flex items-center justify-between h-16 rounded-lg border-2 border-dashed px-2">
              <div className="flex items-center">
                <FileIcon className="w-8 h-8 text-primary mr-2" />
                <span className="text-muted-foreground text-sm font-bold">
                  {imageFile?.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={handleRemoveImageUpload}
              >
                <XIcon className="text-muted-foreground hover:text-primary" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-between h-16 rounded-lg border-2 border-dashed px-2">
          <div className="flex items-center">
            <FileIcon className="w-8 h-8 text-primary mr-2" />
            <span className="text-muted-foreground text-sm font-bold">
              {imageFile?.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUploadImage;
