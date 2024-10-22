import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useState } from "react";

const ProductItem = ({
  product,
  setFormData,
  setCurrentProductId,
  setOpenCreateProductDialog,
  setImageFile,
  setIsEditMode,
  handelDeleteProduct,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleEditProduct = () => {
    setFormData(product);
    setImageFile(product?.image);
    setOpenCreateProductDialog(true);
    setCurrentProductId(product?._id);
    setIsEditMode(true);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[400px] object-cover rouned-t-lg "
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-1 mt-1 capitalize">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center text-lg">
            <span
              className={`font-semibold ${
                product?.salePrice > 0 && "line-through"
              }`}
            >
              ${product?.price}
            </span>
            <span className="font-bold text-primary">
              {product?.salePrice > 0 && `$${product?.salePrice}`}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button size="lg" onClick={handleEditProduct}>
            Edit
          </Button>
          <Dialog open={openDialog}>
            <DialogTrigger>
              <Button
                size="lg"
                onClick={() => setOpenDialog(true)}
                variant="destructive"
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-xl">
                <DialogTrigger className="text-primary font-semibold text-red-500">
                  Are You Sure ?{" "}
                </DialogTrigger>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your product{" "}
                  <span className="font-bold">{product?.title}</span> and remove
                  your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-between sm:justify-between  items-center w-full">
                <DialogClose>
                  <Button size="lg" type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  size="lg"
                  type="submit"
                  variant="destructive"
                  onClick={() => {
                    handelDeleteProduct(product?._id);
                    setOpenDialog(false);
                  }}
                >
                  delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductItem;
