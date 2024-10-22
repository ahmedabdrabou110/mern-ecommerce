import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import MenuItemSidebar from "./MenuItemSidebar";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={() => setOpen(false)}>
        <SheetContent className="w-64" side="left">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-3 mt-4 mb-4">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-xl font-bold">Admin Panel </h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItemSidebar setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-bold">Admin Panel </h1>
        </div>
        <MenuItemSidebar />
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;
