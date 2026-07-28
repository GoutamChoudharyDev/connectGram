import {
  Home,
  Search,
  PlusSquare,
  Heart,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MobileBottomNav = () => {
  const { user } = useAuth();

  const navItems = [
    {
      name: "Home",
      path: "/home-page",
      icon: Home,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: Search,
    },
    {
      name: "Create",
      path: "/post/add",
      icon: PlusSquare,
    },
    {
      name: "Activity",
      path: "/notifications",
      icon: Heart,
    },
    {
      name: "Profile",
      path: `/profile/${user?.username}`,
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-black lg:hidden">
      <div className="flex items-center justify-between px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center gap-1 px-1 py-2 transition ${
                  isActive ? "text-white" : "text-zinc-500"
                }`
              }
            >
              <Icon
                size={20}
                className="sm:h-6 sm:w-6"
              />

              <span className="text-[9px] sm:text-[10px]">
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