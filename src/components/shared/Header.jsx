import logo from "../../../public/logo.png";

export default function Header() {
  const links = [
    { name: "Home", href: "/" },
    { name: "App", href: "#" },
    { name: "Account", href: "#" },
    { name: "Export", href: "#" },
  ];

  return (
    <nav>
      <div className="flex max-w-7xl items-center bg-[#F9FAFB] w-full justify-between py-1 mt-2 border px-4 rounded-md mx-auto">
        {/* Logo */}
        <div>
          <img src={logo} className="h-14" />
        </div>
        {/* Menu */}
        <div className="hidden md:block">
          <ul className="flex gap-4 text-gray-500 font-medium">
            {links.map((link) => (
              <li key={link.name}>
                <a href={link?.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* Button */}
        <button className="px-6 py-2 bg-teal-600 text-white w-fit rounded-md">
          Get App
        </button>
      </div>
    </nav>
  );
}
