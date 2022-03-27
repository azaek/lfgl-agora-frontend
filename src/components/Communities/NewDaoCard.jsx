import Link from "next/link";

const NewDaoCard = () => {
    return (
        <div className="w-full rounded-xl bg-[#141515]/50 mt-28 ring-2 ring-[#212427] backdrop-blur-sm flex flex-col gap-2 p-4">
            
            {/* Proposals | max - 5 */}
            <div className="w-full flex flex-col mt-20 items-center">
                <Link  href='/communities/create' passHref>
                <button className="px-4 py-2 text-black font-medium text-xs bg-gradient rounded-xl">
                    Create a DAO
                </button>
                </Link>
            </div>
        </div>
    );
}

export default NewDaoCard;