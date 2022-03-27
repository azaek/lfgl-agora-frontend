import DaoListItem from "../../components/Communities/DaoListItem";
import DaoListItemSmall from "../../components/Communities/DaoListItemSmall";
import NewDaoCard from "../../components/Communities/NewDaoCard";
import PostCard from "../../components/Communities/PostCard";
import TreasuryCard from "../../components/Communities/TreasuryCard";
import ProposalsCard from "../../components/Home/ProposalsCard";
import Layout from "../../components/Layout/Layout";

import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_DAO, GET_DAO_POSTS } from "../../lib/queries";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CreatePostIcon } from "../../components/Utils/IconSvg";
import JoinDaoDialog from "../../components/Dialogs/JoinDaoDailog";
import CreatePostDailog from "../../components/Dialogs/PostDailog";
import MintProfileDialog from "../../components/Dialogs/MintProfileDialog";

const DaoSpecificPage = () => {
    const route = useRouter();
    const user = useSelector((state) => state.user);

    const [ openFollowDialog, setOpenFollowDialog ] = useState(false);
    const [ openPostDialog, setOpenPostDialog ] = useState(false);
    const [ activeSection, setActiveSection ] = useState(0);

    const { data, loading, error } = useQuery(GET_DAO, {
        context: {
            headers: {
                authorization: "Bearer " + user.token,
            },
        },
        variables: {
            id: route.asPath.split("/")[2],
        },
    });

    const [
        fetchPosts,
        { data: postsData, loading: postsLoading, error: postsError },
    ] = useLazyQuery(GET_DAO_POSTS, {
        context: {
            headers: {
                authorization: "Bearer " + user.token,
            },
        },
        variables: {
            daoId: route.asPath.split("/")[2],
        },
    });

    useEffect(() => {
        if (data) {
            fetchPosts();
        }
    }, [data, fetchPosts]);

    const isAMember = (dao) => {

        if (dao.members.find(member => member.walletAddress === user.walletAddress)) {
            return true
        } 
        return false;
    }


    return (
        <div className="min-h-screen">
            <Layout>
                <div className="bg-gradient w-52 h-52 rounded-full fixed blur-[100px] z-[0] right-[200px] top-[100px]" />

                <div className="w-full max-w-[62rem] flex">
                    {loading && (
                        <p className="w-full flex-[0.6] text-center py-10 text-white/40 text-sm">
                            Loading...
                        </p>
                    )}
                    {error && (
                        <p className="w-full flex-[0.6] text-center py-10 text-white/30 text-sm">
                            Error fetching DAO!
                        </p>
                    )}
                    {data && (
                        <div className="w-full flex-[0.6] flex flex-col px-10">
                            <div className="flex flex-col mt-10">
                                <h3 className="text-gradient font-bold text-base">
                                    {data.getDao.daoName}
                                </h3>
                                <p className="text-white/40 text-xs ">
                                    {data.getDao.daoType}
                                </p>
                            </div>

                            <div className="w-full rounded-xl bg-[#141515]/50 mt-10 gap-4 ring-2 ring-[#212427] backdrop-blur-sm flex flex-col gap-2 p-4">
                                <div className="flex items-center w-full gap-4">
                                    <div className="w-14 h-14 bg-gradient rounded-xl" />
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-base text-white/90 ">
                                            {data.getDao.daoName}
                                        </h3>
                                        <p className="text-[10px] text-white/60">
                                            {data.getDao.daoDescription}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center  gap-8">
                                    <div className="flex flex-col">
                                        <h3 className="text-base text-white/90 ">
                                            {data.getDao.followCost}{" "}
                                            {data.getDao.followCurrency}
                                        </h3>
                                        <p className="text-[8px] text-white/60 uppercase tracking-wider">
                                            price
                                        </p>
                                    </div>

                                    <div className="flex flex-col">
                                        <h3 className="text-base text-white/90 ">
                                            {data.getDao.members.length}
                                        </h3>
                                        <p className="text-[8px] text-white/60 uppercase tracking-wider">
                                            {data.getDao.members.length != 1
                                                ? "members"
                                                : "member"}
                                        </p>
                                    </div>
                                </div>
                                { isAMember(data.getDao) && 
                                    <button className="button-s text-xs font-medium tracking-wide w-max">
                                        Vaults
                                    </button>
                                } 
                                { !isAMember(data.getDao) && <>

                                    <button onClick={() => setOpenFollowDialog((prev) => !prev)} className="button-s text-xs font-medium tracking-wide w-max">
                                        Join
                                    </button>

                                    <JoinDaoDialog open={openFollowDialog} setOpen={setOpenFollowDialog} uData={data.getDao} />
                                    </>
                                }
                            </div>

                            <nav className="flex w-full gap-8 items-center py-4">
                                <button onClick={() => setActiveSection(0)} className="px-4 py-2 rounded-lg hover:bg-[#212427] t-all">
                                    <p className={` ${ activeSection === 0 ? ' text-gradient font-semibold ' : ' text-[#a7a7a7] ' } text-xs  tracking-wide`}>
                                        Forum
                                    </p>
                                </button>

                                <button onClick={() => setActiveSection(1)} className="px-4 py-2 rounded-lg hover:bg-[#212427] t-all">
                                    <p className={`  ${ activeSection === 1 ? ' text-gradient font-semibold ' : ' text-[#a7a7a7] ' } text-xs  tracking-wide`}>
                                        RFP
                                    </p>
                                </button>

                                <button onClick={() => setActiveSection(2)} className="px-4 py-2 rounded-lg hover:bg-[#212427] t-all">
                                    <p className={` ${ activeSection === 2 ? ' text-gradient font-semibold ' : ' text-[#a7a7a7] ' } text-xs  tracking-wide`}>
                                        Proposals
                                    </p>
                                </button>

                                <button onClick={() => setActiveSection(3)} className="px-4 py-2 rounded-lg hover:bg-[#212427] t-all">
                                    <p className={`  ${ activeSection === 3 ? ' text-gradient font-semibold ' : ' text-[#a7a7a7] ' } text-xs  tracking-wide`}>
                                        Events
                                    </p>
                                </button>
                            </nav>

                            {/* Feed list */}
                            { activeSection === 0 && <div className="w-full flex flex-col items-center gap-3 pb-6">
                                <div className="w-full flex items-center justify-between">
                                    <a
                                        href="#"
                                        className="text-[10px] text-[#CDCDCD] px-2 py-1 rounded-lg btn-hvr "
                                    >
                                        Recent ▼
                                    </a>

                                    {isAMember(data.getDao) && 
                                    <>

                                    <button onClick={() => setOpenPostDialog(prev => !prev)} className="button-s text-xs flex gap-2 items-center">
                                        <CreatePostIcon />
                                        Post
                                    </button>

                                    { user.lensProfileConnected && 
                                        <CreatePostDailog open={openPostDialog} setOpen={setOpenPostDialog} uData={data.getDao} />
                                    } 

                                    {
                                        !user.lensProfileConnected &&
                                        <MintProfileDialog open={openPostDialog} setOpen={setOpenPostDialog} uData={data.getDao} />
                                    }
                                    </>
                                    }


                                </div>
                                {postsData &&
                                    []
                                        .concat(postsData.getDaoPostsOnly)
                                        .sort((a, b) => {
                                            return (
                                                Date.parse(b.timestamp) -
                                                Date.parse(a.timestamp)
                                            );
                                        })
                                        .map((post) => (
                                            <PostCard
                                                data={post}
                                                key={post.id}
                                            />
                                        ))}
                                {postsLoading && (
                                    <p className="w-full text-center py-10 text-white/40 text-xs">
                                        Loading...
                                    </p>
                                )}
                                {postsError && (
                                    <p className="w-full text-center py-10 text-white/30 text-xs">
                                        Error get posts
                                    </p>
                                )}
                            </div>}

                            {
                                activeSection === 1 && <div className="w-full flex flex-col items-center gap-3 pb-6">
                                    
                                </div>
                            }
                            {
                                activeSection === 2 && <div className="w-full flex flex-col items-center gap-3 pb-6">

                                </div>
                            }
                        </div>
                    )}
                    <div className="w-[40%] flex-[0.4] gap-2 h-screen sticky top-0 flex flex-col items-center px-10">
                        <TreasuryCard />
                        <ProposalsCard />
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default DaoSpecificPage;
