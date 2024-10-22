import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const ProductItem = ({ product }) => {
  return (
    <Card className="w-full max-w-sm mx-auto m-2">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full object-cover h-[300px] rounded-t-lg "
          />
          {product?.salePrice && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              sale
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h2 className="text-primary text-xl font-semibold mt-2 mb-3">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">
              {categoryOptionsMap[product?.category]}
            </span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">
              ${product?.price}
            </span>
            <span
              className={`${
                product?.salePrice > 0 && "line-through"
              } text-muted-foreground text-md`}
            >
              ${product?.price}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add to cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductItem;
