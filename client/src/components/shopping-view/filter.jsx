import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ProductFilter = () => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b mb-4">
        <h2 className="text-lg font-extrabold">Filter</h2>
      </div>
      {Object.keys(filterOptions).map((menuItem) => (
        <Fragment>
          <div className="mt-3 ml-2">
            <h3 className="text-xl mb-2 font-bold capitalize">{menuItem}</h3>
            {filterOptions[menuItem].map((item) => (
              <Label className="mb-2 flex items-center cursor-pointer ">
                <Checkbox className="mr-2" />
                <span className="text-lg font-semibold">{item.label}</span>
              </Label>
            ))}
          </div>
          <Separator />
        </Fragment>
      ))}
    </div>
  );
};

export default ProductFilter;
