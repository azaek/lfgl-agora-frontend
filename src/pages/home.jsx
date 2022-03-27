import PostCard from "../components/Communities/PostCard";
import ProposalsCard from "../components/Home/ProposalsCard";
import Layout from "../components/Layout/Layout";
import { useQuery } from "@apollo/client";

import { GET_POSTS } from "../lib/queries";
import { useSelector } from "react-redux";
import { CreatePostIcon } from "../components/Utils/IconSvg";

const HomePage = () => {
    const user = useSelector((state) => state.user);
    const { loading, error, data } = useQuery(GET_POSTS, {
        context: {
            headers: {
                Authorization: "Bearer " + user.token,
            },
        },
    });

    return (
        <div className="min-h-screen">
            <Layout>
                <div className="bg-gradient w-52 h-52 rounded-full fixed blur-[100px] z-[0] right-[200px] top-[100px]" />

                <div className="w-full max-w-[62rem] flex">
                    <div className="w-full flex-[0.6] flex flex-col px-10">
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col mt-10">
                                <h3 className="text-white font-medium text-xl">
                                    Home
                                </h3>
                                <p className="text-white/40  text-xs">
                                    Feed - Updates - Proposals
                                </p>
                            </div>

                            <button className="button-s text-xs flex gap-2 items-center">
                                <CreatePostIcon />
                                Post
                            </button>
                        </div>

                        {/* Feed list */}
                        <div className="w-full flex flex-col items-center gap-2 mt-6 pb-6">
                            {data &&
                                []
                                    .concat(data.getDaoPosts)
                                    .sort((a, b) => {
                                        return (
                                            Date.parse(b.timestamp) -
                                            Date.parse(a.timestamp)
                                        );
                                    })
                                    .map((post) => (
                                        <PostCard data={post} key={post.id} />
                                    ))}
                            {loading && (
                                <p className="w-full text-center py-10 text-white/40 text-sm">
                                    Loading...
                                </p>
                            )}
                            {error && <p>Error :(</p>}
                        </div>
                    </div>
                    <div className="w-[40%] pt-24 flex-[0.4] h-screen sticky top-0 flex flex-col items-center px-10">
                        <ProposalsCard />
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default HomePage;
