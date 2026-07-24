import {
  Home,
  Search,
  PlusSquare,
  Heart,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Explore",
    path: "/explore",
    icon: Search,
  },
  {
    name: "Create",
    path: "/create-post",
    icon: PlusSquare,
  },
  {
    name: "Activity",
    path: "/notifications",
    icon: Heart,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-black lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 transition ${isActive
                  ? "text-white"
                  : "text-zinc-500"
                }`
              }
            >
              <Icon size={24} />

              <span className="text-[10px]">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;