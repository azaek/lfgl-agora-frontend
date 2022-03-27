import DaoListItem from "../../components/Communities/DaoListItem";
import DaoListItemSmall from "../../components/Communities/DaoListItemSmall";
import NewDaoCard from "../../components/Communities/NewDaoCard";
import Layout from "../../components/Layout/Layout";
import { useQuery } from "@apollo/client";
import { useState } from "react";

import { useSelector } from "react-redux";
import { GET_DAOS } from '../../lib/queries'

const CommunitiesPage = () => {

    const user = useSelector(state => state.user);
    const { loading, error, data } = useQuery(GET_DAOS, {
        context: {
            headers: {
                "Authorization": "Bearer " + user.token
            }
        }
    })

    const [showAll, setShowAll] = useState(false)

    const isAMember = (daos) => {
        if (daos.length > 0) {
            for (const dao of daos) {
                if (dao.members.find(member => member.walletAddress === user.walletAddress)) {
                    return true
                }
            }
        }
        return false;
    }

    const getJoinedDos = (daos) => {
        if(daos.length > 0) {
            const joinedDaos = [];
            for (const dao of daos) {
                if (dao.members.find(member => member.walletAddress === user.walletAddress)) {
                    joinedDaos.push(dao)
                }
            }
            return joinedDaos;
        }

        return [];
    }


    return (
        <div className="min-h-screen">
            <Layout>
                <div className="bg-gradient w-52 h-52 rounded-full fixed blur-[100px] z-[0] right-[200px] top-[100px]" />

                <div className="w-full max-w-[62rem] flex">
                    <div className="w-full flex-[0.7] flex flex-col px-10">
                        <div className="w-full mt-10"/>
                    
                        {data && isAMember(data.getDaos) &&
                            <>

                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col ">
                                        <h3 className="text-white font-medium text-base">
                                            Your communities
                                        </h3>
                                        <p className="text-white/40 text-xs">
                                            communities which are a part of
                                        </p>
                                    </div>

                                    <p onClick={() => setShowAll((prev) => !prev)} className="cursor-pointer text-[10px] text-[#CDCDCD] hover:text-gradient font-semibold tracking-wider ">{showAll ? 'Show Less' : 'Show All'}</p>

                                </div>

                                <div className="w-full grid grid-cols-3 grid-flow-row items-center gap-2 mt-6 pb-6">
                                    {data &&
                                        getJoinedDos(data.getDaos).slice(0, showAll ? getJoinedDos().length : 3).map((dao) => (
                                            <DaoListItemSmall data={dao} key={dao.id} />
                                        ))
                                    }
                                    {
                                        loading && <p className="w-full text-center py-10 text-white/40 text-sm">Loading...</p>
                                    }
                                    {
                                        error && <p className="w-full text-center py-10 text-white/30 text-sm">Error fetching DAOs!</p>
                                    }
                                </div>
                            </>
                        }

                        <div className="flex justify-between mt-4 items-end">
                            <div className="flex flex-col ">
                                <h3 className="text-white font-medium text-base">
                                    Explore communities
                                </h3>
                                <p className="text-white/40 text-xs">
                                    find new & interesting communities
                                </p>
                            </div>

                            <a href="#" className="text-[10px] text-[#CDCDCD] hover:text-gradient ">Filter</a>

                        </div>

                        {/* Explore Communities list */}
                        <div className="w-full grid grid-cols-2 items-center gap-2 mt-6 pb-6">
                            {data &&
                                data.getDaos.map((dao) => (
                                    <DaoListItem data={dao} key={dao.id} />
                                ))
                            }

                            {
                                loading && <p className="w-full text-center py-10 text-white/40 text-sm">Loading...</p>
                            }
                            {
                                error && <p className="w-full text-center py-10 text-white/30 text-sm">Error fetching DAOs!</p>
                            }
                        </div>
                    </div>
                    <div className="w-[30%] flex-[0.3] h-screen sticky top-0 flex flex-col items-center px-10">
                        <NewDaoCard />
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default CommunitiesPage;
