import { shoppingViewHeaderMenuItems } from "@/config/index";
import { Home, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  SheetTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

const MenuItems = () => {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Link
          key={item?.id}
          onClick={() => setOpenSheet(!openSheet)}
          to={item.path}
          className="text-lg font-semibold"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

const RightHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button size="icon" variant="outline">
        <ShoppingCart className="w-6 h-6 " />
        <span className="sr-only">Shopping cart icon</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/shop/account")}
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <header className="border-b flex justify-between items-center py-4 lg:px-4 z-40 h-16 px-2 sticky top-0">
      <Link className="flex items-center">
        <Home className="w-6 mr-2 h-6 font-semibold" />
        <span className="text-xl font-bold text-primary">Ecommerce</span>
      </Link>
      <Sheet open={openSheet} onOpenChange={() => setOpenSheet(!openSheet)}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="flex items-center lg:hidden"
          >
            <Menu className="w-6 h-6" />
            <span className="sr-only">menu item trigger</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="pb-3 border-b mb-3">
            <SheetTitle>Ecommerce</SheetTitle>
          </SheetHeader>
          <SheetClose asChild>
            <MenuItems />
          </SheetClose>
          <RightHeader />
        </SheetContent>
      </Sheet>
      <div className="hidden lg:flex">
        <MenuItems />
      </div>
      <div className="hidden lg:flex">
        <RightHeader />
      </div>
    </header>
  );
};

export default ShoppingHeader;
