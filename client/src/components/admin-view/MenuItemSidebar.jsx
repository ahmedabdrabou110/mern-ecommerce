import { adminSidebarMenuItems } from "@/config";
import { useNavigate } from "react-router-dom";

const MenuItemSidebar = ({ setOpen }) => {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer  text-muted-foreground hover:bg-muted hover:text-primary text-xl text-semibold "
        >
          {menuItem?.icons}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default MenuItemSidebar;
