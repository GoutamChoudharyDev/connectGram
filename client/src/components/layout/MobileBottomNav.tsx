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
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800/80 bg-black/95 backdrop-blur-lg lg:hidden">
      <div
        className="flex items-center justify-around px-2 pt-2"
        style={{
          paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex min-h-[48px] flex-1 flex-col items-center justify-center gap-1 rounded-lg py-1 transition-colors duration-200 ${isActive
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
                }`
              }
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />

              <span className="text-[10px] font-medium">
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
