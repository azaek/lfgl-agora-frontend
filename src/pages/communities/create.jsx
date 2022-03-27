import DaoListItem from "../../components/Communities/DaoListItem";
import DaoListItemSmall from "../../components/Communities/DaoListItemSmall";
import NewDaoCard from "../../components/Communities/NewDaoCard";
import Layout from "../../components/Layout/Layout";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { GET_DAOS } from "../../lib/queries";

const CreateCommunity = () => {
    const user = useSelector((state) => state.user);

    const route = useRouter();

    const [showAll, setShowAll] = useState(false);

    const [daoName, setDaoName] = useState("");
    const [daoOverview, setDaoOverview] = useState("");
    const [daoDescription, setDaoDescription] = useState("");
    const [daoPurpose, setDaoPurpose] = useState("");
    const [daoDiscord, setDaoDiscord] = useState("");
    const [daoTwitter, setDaoTwitter] = useState("");

    const [advanceView, setAdvanceView] = useState(false);

    const [followFee, setFollowFee] = useState(0);
    const [votingPeriod, setVotingPeriod] = useState(0);
    const [votingDelay, setVotingDelay] = useState(0);
    const [minDelay, setMinDelay] = useState(0);
    const [quorumPer, setQuorumPer] = useState(0);

    return (
        <div className="min-h-screen">
            <Layout>
                <div className="bg-gradient w-52 h-52 rounded-full fixed blur-[100px] z-[0] right-[200px] top-[100px]" />

                <div className="w-full max-w-[62rem] flex pb-8">
                    <div className="w-full flex-[0.7] flex flex-col px-10">
                        <div className="w-full mt-20" />

                        <div className="w-full rounded-xl bg-[#141515]/50 ring-2 ring-[#212427] backdrop-blur-sm flex flex-col gap-2 p-6 items-start">
                            <button onClick={() => route.back()} className="text-xs outline-none border-none text-white/30 t-all hover:text-white/60">
                                &larr; Back
                            </button>

                            <h3 className="text-base text-white font-bold mt-4">
                                Create a DAO
                            </h3>

                            <label
                                htmlFor="name"
                                className="text-xs text-white/30 mt-2"
                            >
                                Name
                            </label>
                            <div className="flex w-full items-center relative">
                                <input
                                    type="text"
                                    value={daoName}
                                    onChange={(e) => setDaoName(e.target.value)}
                                    id="name"
                                    className="text-white text-sm w-full bg-transparent px-3 py-1 rounded-lg outline-none focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 ring-[#FBED96]/80"
                                    placeholder="Dao Name"
                                />
                                <button
                                    onClick={() => setDaoName("")}
                                    className={`text-white/40 text-sm absolute inset-y-0 right-4 my-auto hover:text-white/60 ${
                                        daoName === "" ? "hidden" : ""
                                    }`}
                                >
                                    X
                                </button>
                            </div>

                            <label
                                htmlFor="overview"
                                className="text-xs text-white/30 mt-2"
                            >
                                Overview
                            </label>
                            <div className="flex w-full items-center relative">
                                <input
                                    type="text"
                                    value={daoOverview}
                                    onChange={(e) =>
                                        setDaoOverview(e.target.value)
                                    }
                                    id="overview"
                                    className="text-white text-sm w-full bg-transparent px-3 py-1 rounded-lg outline-none focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 ring-[#FBED96]/80"
                                    placeholder="Overview"
                                />
                                <button
                                    onClick={() => setDaoOverview("")}
                                    className={`text-white/40 text-sm absolute inset-y-0 right-4 my-auto hover:text-white/60 ${
                                        daoOverview === "" ? "hidden" : ""
                                    }`}
                                >
                                    X
                                </button>
                            </div>

                            <label
                                htmlFor="description"
                                className="text-xs text-white/30 mt-2"
                            >
                                Description
                            </label>
                            <div className="flex w-full items-center relative">
                                <input
                                    type="text"
                                    value={daoDescription}
                                    onChange={(e) =>
                                        setDaoDescription(e.target.value)
                                    }
                                    id="description"
                                    className="text-white text-sm w-full bg-transparent px-3 py-1 rounded-lg outline-none focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 ring-[#FBED96]/80"
                                    placeholder="Dao description"
                                />
                                <button
                                    onClick={() => setDaoPurpose("")}
                                    className={`text-white/40 text-sm absolute inset-y-0 right-4 my-auto hover:text-white/60 ${
                                        daoDescription === "" ? "hidden" : ""
                                    }`}
                                >
                                    X
                                </button>
                            </div>

                            <label
                                htmlFor="purpose"
                                className="text-xs text-white/30 mt-2"
                            >
                                Purpose
                            </label>
                            <div className="flex w-full items-center relative">
                                <input
                                    type="text"
                                    value={daoPurpose}
                                    onChange={(e) =>
                                        setDaoPurpose(e.target.value)
                                    }
                                    id="purpose"
                                    className="text-white text-sm w-full bg-transparent px-3 py-1 rounded-lg outline-none focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 ring-[#FBED96]/80"
                                    placeholder="Dao purpose"
                                />
                                <button
                                    onClick={() => setDaoPurpose("")}
                                    className={`text-white/40 text-sm absolute inset-y-0 right-4 my-auto hover:text-white/60 ${
                                        daoPurpose === "" ? "hidden" : ""
                                    }`}
                                >
                                    X
                                </button>
                            </div>

                            <label
                                htmlFor="clinks"
                                className="text-xs text-white/30 mt-2"
                            >
                                Communities Links
                            </label>
                            <div className="flex w-full items-center relative">
                                <input
                                    type="text"
                                    value={daoTwitter}
                                    onChange={(e) =>
                                        setDaoTwitter(e.target.value)
                                    }
                                    id="clinks"
                                    className="text-white text-sm w-full bg-transparent px-3 py-1 rounded-lg outline-none focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 ring-[#FBED96]/80"
                                    placeholder="Twitter Link"
                                />
                                <button
                                    onClick={() => setDaoTwitter("")}
                                    className={`text-white/40 text-sm absolute inset-y-0 right-4 my-auto hover:text-white/60 ${
                                        daoTwitter === "" ? "hidden" : ""
                                    }`}
                                >
                                    X
                                </button>
                            </div>
                            <div className="flex w-full items-center relative">
                                <input
                                    type="text"
                                    value={daoDiscord}
                                    onChange={(e) =>
                                        setDaoDiscord(e.target.value)
                                    }
                                    id="name"
                                    className="text-white text-sm w-full bg-transparent px-3 py-1 rounded-lg outline-none focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 ring-[#FBED96]/80"
                                    placeholder="Discord Link"
                                />
                                <button
                                    onClick={() => setDaoDiscord("")}
                                    className={`text-white/40 text-sm absolute inset-y-0 right-4 my-auto hover:text-white/60 ${
                                        daoDiscord === "" ? "hidden" : ""
                                    }`}
                                >
                                    X
                                </button>
                            </div>

                            <label className="text-xs text-white/30 mt-2">
                                Customise
                            </label>
                            <div className="flex items-center gap-4">
                                <button className="button-o text-xs">
                                    Set Cover
                                </button>
                                <button className="button-o text-xs">
                                    Set Avatar
                                </button>
                            </div>

                            <button
                                onClick={() => setAdvanceView((prev) => !prev)}
                                className="text-white/30 hover:text-white/60 outline-none border-none text-xs mt-3"
                            >
                                {advanceView ? "normal ↖" : "advance →"}
                            </button>

                            {advanceView && (
                                <div className="flex flex-col w-full gap-2">
                                    <label
                                        htmlFor="memFee"
                                        className="text-[10px] text-[#EBEBEB] mt-2"
                                    >
                                        Member Fee ( FollowModule ) $
                                    </label>
                                    <div className="flex w-full items-center relative">
                                        <input
                                            type="number"
                                            onChange={(e) =>
                                                setFollowFee(e.target.value)
                                            }
                                            id="memFee"
                                            className="text-white text-xs w-full bg-transparent px-3 py-1 rounded-lg outline-none focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 ring-[#FBED96]/80"
                                            placeholder="Enter a price or Leave blank for emptyFollowModule"
                                        />
                                    </div>

                                    <label
                                        htmlFor="qPer"
                                        className="text-[10px] text-[#EBEBEB] mt-2"
                                    >
                                        Quorum Percentage %
                                    </label>
                                    <div className="flex w-full items-center relative">
                                        <input
                                            type="number"
                                            onChange={(e) =>
                                                setQuorumPer(e.target.value)
                                            }
                                            id="qPer"
                                            className="text-white text-xs w-full bg-transparent px-3 py-1 rounded-lg outline-none focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 ring-[#FBED96]/80"
                                            placeholder="Percentage of minimum votes required to pass"
                                        />
                                    </div>

                                    <div className="w-full flex items-center justify-between gap-8">
                                        <div className="flex flex-1 flex-col w-full items-start relative gap-1">
                                            <label
                                                htmlFor="vPer"
                                                className="text-[10px] text-[#EBEBEB] mt-2"
                                            >
                                                Voting Period (sec)
                                            </label>
                                            <input
                                                type="number"
                                                onChange={(e) =>
                                                    setQuorumPer(e.target.value)
                                                }
                                                id="vPer"
                                                className="text-white text-xs w-full bg-transparent px-3 py-1 rounded-lg outline-none focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 ring-[#FBED96]/80"
                                                placeholder="Time (seconds) for voting"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col w-full items-start relative gap-1">
                                            <label
                                                htmlFor="vDelay"
                                                className="text-[10px] text-[#EBEBEB] mt-2"
                                            >
                                                Voting Delay
                                            </label>
                                            <input
                                                type="number"
                                                onChange={(e) =>
                                                    setQuorumPer(e.target.value)
                                                }
                                                id="vDelay"
                                                className="text-white text-xs w-full bg-transparent px-3 py-1 rounded-lg outline-none focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 ring-[#FBED96]/80"
                                                placeholder="1 Block"
                                            />
                                        </div>
                                    </div>

                                    <label
                                        htmlFor="minDelay"
                                        className="text-[10px] text-[#EBEBEB] mt-2"
                                    >
                                        Minimum Delay (sec)
                                    </label>
                                    <div className="flex w-full items-center relative">
                                        <input
                                            type="number"
                                            onChange={(e) =>
                                                setQuorumPer(e.target.value)
                                            }
                                            id="minDelay"
                                            className="text-white text-xs w-full bg-transparent px-3 py-1 rounded-lg outline-none focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 ring-[#FBED96]/80"
                                            placeholder="Minimum delay after a vote passes"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="w-full py-3 flex justify-end gap-4">
                                        <button onClick={() => route.back()} className="button-t text-white/60 text-sm hover:text-white/80">Cancel</button>
                                        <button className="button-so text-sm">Submit</button>
                                    </div>
                        </div>
                    </div>
                    <div className="w-[30%] flex-[0.3] h-screen sticky top-0 flex flex-col items-center px-10"></div>
                </div>
            </Layout>
        </div>
    );
};

export default CreateCommunity;
