import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authModel from "../../../stores/AuthModel";
import userModel from "../../../stores/UserModel";
import themeModel from "../../../stores/ThemeModel";
import LogoutConfirmationDialog from "../../auth/LogoutConfirmationDialog";
import LanguageSwitcher from "../LanguageSwitcher";

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar = observer(({ onMenuToggle }: NavbarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    authModel.logout();
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const userInitials = userModel.getInitials();
  const username = userModel.user?.username || "User";

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link to="/">
              <h1 className=" text-xl font-bold text-gray-800 dark:text-white">
                {t("navbar.title")}
              </h1>
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <button
              onClick={themeModel.toggleTheme}
              className="p-2 rounded-lg outline-none hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {themeModel.theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              className="px-2 md:px-4 outline-none py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              {t("navbar.logout")}
            </button>

            {/* User Profile - At the end */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                {userInitials}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {username}
              </span>
            </div>

            {/* Mobile Profile Icon */}
            <div className="sm:hidden">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                {userInitials}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmationDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </nav>
  );
});

export default Navbar;

