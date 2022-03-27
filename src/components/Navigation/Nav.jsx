import { AssemblyIcon, CommIcon, ContributionIcon, HomeIcon, LogOutIcon, MessageIcon, ProfileIcon } from "../Utils/IconSvg";
import NavButton from "./NavButton";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

const Nav = () => {

    const route = useRouter();

    const user = useSelector(state => state.user);

    const shortenAddress = (str) => {
        return str.substring(0, 3) + "..." + str.substring(str.length - 3);
    };

    return (
        <div className="w-full fixed top-0 max-w-[10rem] h-screen flex flex-col justify-center gap-20 items-center py-10">
            <div className="flex flex-col items-center gap-4">
                {/* Button */}
                
                <NavButton href="/home" isActive={route.pathname === "/home"? true : false} >
                    <HomeIcon active={route.pathname === "/home"? true : false}/>
                </NavButton>
                <NavButton href="/communities" doubleClick isActive={route.pathname.includes("/communities")? true : false} >
                    <CommIcon active={route.pathname.includes("/communities") ? true : false} />
                </NavButton>
                <NavButton isActive={route.pathname === "/assemblies"? true : false} >
                    <AssemblyIcon active={route.pathname === "/assemblies"? true : false}/>
                </NavButton>
                <NavButton isActive={route.pathname === "/contributions"? true : false} >
                    <ContributionIcon active={route.pathname === "/contributions"? true : false}/>
                </NavButton>
                <NavButton isActive={route.pathname === "/messages"? true : false}>
                    <MessageIcon active={route.pathname === "/messages"? true : false} />
                </NavButton>
                <NavButton isActive={route.pathname === "/profile"? true : false} >
                    <ProfileIcon active={route.pathname === "/profile"? true : false} />
                </NavButton>
            </div>

            <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient" />
                <p className="text-[#9B9B9B] text-xs font-medium">{shortenAddress(user.walletAddress)}</p>

                <p className="text-[#888888] text-xs font-medium flex items-center gap-1 bg-[#141515] px-3 py-1 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-green-400"/>
                    localhost</p>

                <button className="p-2 outline-none ">
                    <LogOutIcon />
                </button>

            </div>
        </div>
    );
}

export default Nav;