import { useRouter } from "next/router";
const DaoListItem = () => {

    const route = useRouter();

    const handleClick = () => {
        // route.push(`/communities/${data.id}`);
    }


    return (
        <div onClick={handleClick} className="cursor-pointer rounded-xl border border-[#212427] gap-2 h-20 w-full flex-1 flex items-center p-2">
            {/* Avatar */}
            <div className="h-full aspect-square rounded-xl bg-gradient">

            </div>

            <div className="flex flex-col justify-evenly h-full">
                <p className="text-[8px] text-white/60 tracking-widest uppercase">type</p>
                <h3 className="text-xs text-white/90 ">name</h3>
                <p className="text-[10px] text-white/60">
                    description
                </p>
            </div>
        </div>
    );
}

export default DaoListItem;