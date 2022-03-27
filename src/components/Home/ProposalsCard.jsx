import ProposalListItem from "../Proposals/ProposalListItem";

const ProposalsCard = () => {

    return (
        <div className="w-full rounded-xl bg-[#141515]/50 my-2 ring-2 ring-[#212427] backdrop-blur-sm flex flex-col gap-2 p-4">
            <div className="flex items-center justify-between w-full">
                <h5 className="text-[10px] text-white/60 uppercase tracking-widest">Proposals</h5>
                <a href="#" className="text-[10px] text-[#CDCDCD] hover:text-gradient ">Show All</a>
            </div>

            {/* Proposals | max - 5 */}
            <div className="w-full flex flex-col mt-4">
                {[0,1,2].map(i => (
                    <ProposalListItem key={i} />
                ))}
            </div>
        </div>
    );
}

export default ProposalsCard;