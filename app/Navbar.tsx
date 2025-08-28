"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";

const Navbar = () => {
    const Links = [
        { label: "Dashboard", link: "/" },
        { label: "Issues", link: "/issues" },
    ];
    const currentPath = usePathname();
    return (
        <nav className="flex items-center  h-16 mb-2 border-b border-orange-400 p-4 space-x-6">
            <AiFillBug color="orange" size={30} />
            <ul className="flex space-x-6">
                {Links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.link}
                        className={classnames({
                            "text-orange-600 font-bold":
                                currentPath === link.link,
                            "text-orange-400": currentPath !== link.link,
                            "hover:text-orange-600": true,
                        })}
                    >
                        {link.label}
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
