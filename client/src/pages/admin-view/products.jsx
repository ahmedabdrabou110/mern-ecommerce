import CommonForm from "@/components/common/common-form";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useEffect, useState } from "react";
import ProductUploadImage from "./image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProducts,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products";
import { useToast } from "@/hooks/use-toast";
import ProductItem from "./product-item";

const AdminProducts = () => {
  const initialState = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { products } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const handleAddProduct = async (e) => {
    e.preventDefault();
    dispatch(
      addNewProducts({
        ...formData,
        image: uploadImageUrl,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setImageFile(null);
        setFormData(initialState);
        setOpenCreateProductDialog(false);
        dispatch(fetchAllProducts());
        toast({
          title: "Product added successfully",
        });
      }
    });
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    dispatch(
      editProduct({
        id: currentProductId,
        formData,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setOpenCreateProductDialog(false);
        dispatch(fetchAllProducts());
        setFormData(initialState);
        setImageFile(null);
        toast({
          title: "Product Edit successfully",
          duration: 500,
        });
      }
    });
  };

  const handelDeleteProduct = async (currentId) => {
    dispatch(deleteProduct(currentId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: "Product Delete successfully",
          duration: 1500,
        });
      }
    });
  };
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Products
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products &&
          products.length > 0 &&
          products?.map((product) => (
            <ProductItem
              product={product}
              key={product?._id}
              formData={formData}
              setFormData={setFormData}
              setImageFile={setImageFile}
              setOpenCreateProductDialog={setOpenCreateProductDialog}
              setCurrentProductId={setCurrentProductId}
              setIsEditMode={setIsEditMode}
              handelDeleteProduct={handelDeleteProduct}
            />
          ))}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setFormData(initialState);
          setIsEditMode(false);
          setImageFile(null);
          setImageLoadingState(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="border-b">
            <SheetTitle className="mb-4">Add New Products</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <ProductUploadImage
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadImageUrl={uploadImageUrl}
              setUploadImageUrl={setUploadImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={isEditMode}
            />
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={isEditMode ? "Edit Product" : "create new product"}
              formControls={addProductFormElements}
              onSubmit={isEditMode ? handleEditProduct : handleAddProduct}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
