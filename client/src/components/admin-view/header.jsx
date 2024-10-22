import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { logoutUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center border-b px-4 py-3">
      <Button className="lg:hidden flex" onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={() => dispatch(logoutUser())}
          className="inline-flex px-4 py-2 text-sm shadow gap-2 font-medium  items-center"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
