import Link from "next/link";

const NavButton = ({ children, isActive = false, href ="/" , doubleClick = false}) => {
    return (
        <div className="relative flex">
            {isActive && <div className="w-full h-full scale-110 bg-gradient rounded-xl opacity-95 absolute inset-0 z-[0] blur-sm" />}
            {!isActive && <Link href={href} passHref>
            <button className="p-3 bg-[#141515] rounded-xl group relative flex">
                {children}
            </button>
            </Link>}

            {
                isActive && doubleClick && <Link href={href} passHref>
            <button className="p-3 bg-[#141515] rounded-xl group relative flex">
                {children}
            </button>
            </Link>
            }

            {isActive && !doubleClick &&
            <button className="p-3 bg-[#141515] rounded-xl group relative flex">
                {children}
            </button>
            }
        </div>
    );
}

export default NavButton;