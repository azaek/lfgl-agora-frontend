import Nav from "../Navigation/Nav";

const Layout = ({ children }) => {
    return (
        <div className="flex-col min-h-screen flex items-center justify-center bg-[#000000]">
            <div className="w-full max-w-6xl flex">
                <div className="w-full max-w-[10rem] h-screen">
                    <Nav />
                </div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
