import { useRouter } from "next/router";
const DaoListItemSmall = ({data}) => {

    const route = useRouter();

    const handleClick = () => {
        route.push(`/communities/${data.id}`);
    }

    return (
        <div onClick={handleClick} className="cursor-pointer rounded-xl border border-[#212427] gap-2 h-20 w-full flex-1 flex items-center p-2" >
            {/* Avatar */}
            <div className="h-full aspect-square rounded-xl bg-gradient">

            </div>

            <div className="flex flex-col py-2 gap-1  h-full">
                <p className="text-[8px] text-white/60 tracking-widest uppercase">{data.daoType}</p>
                <h3 className="text-xs text-white/80 ">{data.daoName}</h3>
            </div>
        </div>
    );
}

export default DaoListItemSmall;