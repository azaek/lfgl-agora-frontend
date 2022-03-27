const ProposalListItem = () => {
    return (
        <div className="w-full p-2 flex flex-col gap-1">
                        <div className="flex items-center grow justify-between">
                            <h3 className="text-white text-[10px]">New Merch</h3>
                            <h3 className="text-white text-[10px]">+5 MATIC</h3>
                        </div>

                        <p className="text-white/40 text-[10px]">Bounty of 250 MATIC for winner</p>

                        <div className="w-full h-2 bg-[#343434] rounded-full flex items-center overflow-clip mt-2">
                            <div style={{ width: '50%'}} className={`bg-gradient h-full rounded-full`} />
                        </div>

                        <p className="text-white/40 text-[10px] self-end">23 agreed out of 45</p>
                    </div>
    );
}

export default ProposalListItem;