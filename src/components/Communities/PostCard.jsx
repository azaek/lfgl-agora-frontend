import {
    CommentIcon,
    DownVoteIcon,
    UpVoteIcon,
} from "../Utils/IconSvg";
import { useRouter } from "next/router";
import moment from "moment";
moment().format();
const PostCard = ({ data }) => {

    const shortenAddress = (str) => {
        return str.substring(0, 4) + "..." + str.substring(str.length - 6);
    };

    const route = useRouter();

    const handleDaoClick = () => {
        route.push(`/communities/${data.daoId}`);
    }


    return (
        <div
            className="border border-[#212427] w-full gap-2 rounded-xl bg-[#141515] flex flex-col p-4"
        >
            {/* Top part */}
            <div className="flex items-center gap-2">
                {/* Avatar */}
                <div className="w-6 h-6 bg-gradient rounded-full"></div>
                {/* WalletAdd and timestamp */}
                <div className="flex flex-col">
                    <h4 className="text-[10px] text-white">
                        {shortenAddress(data.walletAddress)} <span className="text-white/40 mx-2">{' <> '}</span> <span onClick={handleDaoClick} className="cursor-pointer text-gradient tracking-wider font-semibold">{data.daoName}</span>
                    </h4>
                    <p className="text-[10px] text-white/40">
                        {moment(data.timestamp).fromNow()}
                    </p>
                </div>
            </div>

            {/* Middle/Content part - Temporary text only */}
            <p className="w-full text-[10px] text-white">
                {data.body}
            </p>

            {/* Bottom part */}
            <div className="flex items-center mt-2 justify-between">
                <div className="flex items-center gap-6">
                    <button className="p-1 rounded-lg hover:bg-white/10 t-all">
                        <UpVoteIcon />
                    </button>
                    <button className="p-1 rounded-lg hover:bg-white/10 t-all">
                        <DownVoteIcon />
                    </button>
                </div>
                <button className="p-1 rounded-lg hover:bg-white/10 t-all">
                    <CommentIcon />
                </button>
            </div>
        </div>
    );
}

export default PostCard;