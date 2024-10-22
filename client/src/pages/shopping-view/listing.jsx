import ProductFilter from "@/components/shopping-view/filter";
import ProductItem from "@/components/shopping-view/product-item";
import { Button } from "@/components/ui/button";
import { DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { getAllFilteredProducts } from "@/store/products";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SortDescIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingList = () => {
  const { products } = useSelector((state) => state.userProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFilteredProducts());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 px-4 md:px-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 flex items-center justify-between border-b ">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">10 Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" size="sm">
                  <SortDescIcon />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                className="bg-background w-[200px] mt-2 rounded-md  shadow-lg border mr-2"
              >
                <DropdownMenuRadioGroup>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem
                      className="cursor-pointer"
                      key={item.id}
                    >
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3">
          {products &&
            products.length > 0 &&
            products.map((product) => <ProductItem product={product} />)}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
