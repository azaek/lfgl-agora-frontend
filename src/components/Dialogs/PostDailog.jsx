import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, SetStateAction, useRef } from "react";
import { useRouter } from 'next/router';
import Web3 from "web3";
import { ethers } from "ethers";
import LensHub from '../../abi/lens/LensHub.json';
import FollowNft from '../../abi/lens/FollowNFT.json';
import { useState, useEffect } from 'react';
import addresses from '../../abi/addresses.json';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import { POST_DAO_POST } from "../../lib/mutations";


const loadLensContract = async () => {
    return await new window.web3.eth.Contract(
        LensHub,
        addresses.lensHub_proxy
    );
}


const CreatePostDailog = ({ open, setOpen, uData }) => {
    let buttonRef = useRef(null);


    const [minting, setMinting] = useState(false);
    const [postMinted, setPostMinted] = useState(false);
    const [txnId, setTxnId] = useState('');
    const [ postBody, setPostBody ] = useState('');

    const route = useRouter();

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [ postDaoPost , { data, loading: dataLoading, error }] = useMutation(POST_DAO_POST, {
        context: {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }
    });

    const handleClose = () => {
        setOpen(false);
    }

    const loadWeb3 = async () => {
        let win = window;
        if (win.ethereum) {
            win.web3 = new Web3(win.ethereum);
            win.ethereum.enable();
        }


        await win.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(win.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();

        win.contract = await loadLensContract();
    }

    useEffect(() => {
        if (data) {
            setMinting(false);
            setPostMinted(true);
        }
    }, [data]);

    const handleMint = async () => {
        setMinting(true);
        await loadWeb3();

        try {

            const data = {
                profileId: user.lensProfile_id,
                contentURI: postBody,
                profileIdPointed: uData.profile_id,
                pubIdPointed: uData.forum_pub_id,
                collectModule: "0x20Ce94F404343aD2752A2D01b43fa407db9E0D00",
                collectModuleData: [],
                referenceModule: '0x0000000000000000000000000000000000000000',
                referenceModuleData: []
            }

            console.log(data);

            const tx = await window.contract.methods.comment(data).send({
                from: user.walletAddress
            });

            console.log("tx :", tx);
            setTxnId(tx.transactionHash);
            

            postDaoPost({
                variables: {
                    createDaoPostInput: {
                        daoId: uData.id,
                        daoName: uData.daoName,
                        body: postBody,
                        pub_id_pointed: +uData.forum_pub_id,
                        images: [],
                        profile_id_pointed: uData.profile_id,
                        pub_id: +tx.events.CommentCreated.returnValues.pubId,
                        profile_id: user.profile_id,
                        topics: ["general"]
                    }
                }
            })

            // joinDao({
            //     variables: {
            //         joinDaoId: uData.id,
            //         tokenId: +tx.events.FollowNFTTransferred.returnValues.followNFTId
            //     }
            // })

        } catch (error) {
            console.log(error);
            setMinting(false);
        }
    }

    const shortenAddress = (str) => {
        return str.substring(0, 4) + "..." + str.substring(str.length - 6);
    };

    return (
        <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >

            <Dialog as='div' onClose={() => setOpen(false)}
                initialFocus={buttonRef}
                className='fixed z-20 inset-0 w-screen h-screen overflow-hidden'>
                <div className="flex items-center justify-center h-screen backdrop-blur-sm overflow-hidden">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-0 w-screen h-screen overflow-hidden" />

                    <div className="relative bg-[#141515] border border-[#212427]  rounded-2xl max-w-sm w-full mx-auto px-6 py-4  gap-4">
                        {/* Mint Post View */}
                        {!minting && !postMinted && <>
                            <Dialog.Title className="text-white text-base flex flex-col  font-bold tracking-wide gap-2 w-max self-center ">

                                Create Post 
                                
                                <div className='flex items-center'>
                                    <p className='text-xs font-normal'>{shortenAddress(user.walletAddress)}</p>
                                    <span className='text-xs text-white/30 px-4'>{'<>'}</span>
                                    <p className='text-xs text-gradient font-bold'>{uData.daoName}</p>
                                </div>

                                
                            </Dialog.Title>
                            <Dialog.Description className="flex flex-col  w-full  gap-4 justify-between mt-4">
                                <textarea
                                    type="text"
                                    rows="5"
                                    value={postBody}
                                    onChange={(e) => setPostBody(e.target.value)}
                                    
                                    className="text-white text-sm w-full bg-transparent px-3 py-1 rounded-lg outline-none ring-1 ring-[#212427] focus:ring-[1px] hover:ring-2 hover:ring-[#FBED96]/50 "
                                    placeholder="type.."
                                />
                                <div className='flex justify-evenly w-full gap-4'>
                                    <button onClick={handleClose} className='button-o font-semibold tracking-wide py-3 px-4 text-xs border border-[#212427] rounded-lg'>Cancel</button>
                                    <button disabled={postBody === "" ? true : false} onClick={handleMint} ref={buttonRef} className={` ${postBody === "" ? 'button-s-d': 'button-s'} button-s font-semibold tracking-wide px-6 py-3  text-xs bg-[#212427] rounded-lg outline-none`}>Post</button>
                                </div>
                            </Dialog.Description>
                        </>
                        }
                        {/* Minting.. Post View */}
                        {minting &&
                            <>
                            <Dialog.Title className="text-white text-base  font-bold tracking-wide flex items-center gap-2 w-max self-center mx-auto ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 21.9998H23M12.37 2.14984L21.37 5.74984C21.72 5.88984 22 6.30984 22 6.67984V9.99984C22 10.5498 21.55 10.9998 21 10.9998H3C2.45 10.9998 2 10.5498 2 9.99984V6.67984C2 6.30984 2.28 5.88984 2.63 5.74984L11.63 2.14984C11.83 2.06984 12.17 2.06984 12.37 2.14984ZM22 21.9998H2V18.9998C2 18.4498 2.45 17.9998 3 17.9998H21C21.55 17.9998 22 18.4498 22 18.9998V21.9998ZM4 17.9998V10.9998V17.9998ZM8 17.9998V10.9998V17.9998ZM12 17.9998V10.9998V17.9998ZM16 17.9998V10.9998V17.9998ZM20 17.9998V10.9998V17.9998Z" stroke="url(#paint0_linear_649_780)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <defs>
                                        <linearGradient id="paint0_linear_649_780" x1="1" y1="12.0448" x2="23" y2="12.0448" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FBED96" />
                                            <stop offset="1" stopColor="#ABECD6" />
                                        </linearGradient>
                                    </defs>
                                </svg>



                                {uData.daoName}
                            </Dialog.Title>
                            <Dialog.Description className="flex flex-col  w-full items-center  gap-4 text-center justify-between mt-4">
                                <p className='text-[#c6c6c6] text-medium text-xs max-w-[40ch] flex-[1] '>Do not refresh or close this window<br /><a className='text-gradient font-bold' href="https://docs.lens.dev/docs/follow" target="_blank" rel="noreferrer">Learn More</a></p>
                                <div className='flex items-center justify-center gap-2'>
                                    <UseAnimations animation={loading} size={20} strokeColor="#ffffff" className='text-white' />
                                    <p className='text-sm text-white/50' >Posting...</p>
                                </div>
                            </Dialog.Description>
                            </>
                        }
                        {/* Minted Post */}
                        {!minting && postMinted &&
                            <>
                            <Dialog.Title className="text-white text-base  font-bold tracking-wide flex items-center gap-2 w-max self-center mx-auto ">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 21.9998H23M12.37 2.14984L21.37 5.74984C21.72 5.88984 22 6.30984 22 6.67984V9.99984C22 10.5498 21.55 10.9998 21 10.9998H3C2.45 10.9998 2 10.5498 2 9.99984V6.67984C2 6.30984 2.28 5.88984 2.63 5.74984L11.63 2.14984C11.83 2.06984 12.17 2.06984 12.37 2.14984ZM22 21.9998H2V18.9998C2 18.4498 2.45 17.9998 3 17.9998H21C21.55 17.9998 22 18.4498 22 18.9998V21.9998ZM4 17.9998V10.9998V17.9998ZM8 17.9998V10.9998V17.9998ZM12 17.9998V10.9998V17.9998ZM16 17.9998V10.9998V17.9998ZM20 17.9998V10.9998V17.9998Z" stroke="url(#paint0_linear_649_780)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <defs>
                                        <linearGradient id="paint0_linear_649_780" x1="1" y1="12.0448" x2="23" y2="12.0448" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FBED96" />
                                            <stop offset="1" stopColor="#ABECD6" />
                                        </linearGradient>
                                    </defs>
                                </svg>



                                {uData.daoName}
                            </Dialog.Title>
                            <Dialog.Description className="flex flex-col  w-full items-center  gap-4 text-center justify-between mt-4">
                                <p className='text-[#c6c6c6] text-medium text-xs max-w-[40ch] flex-[1] '>Post created.</p>
                                <div className='flex items-center justify-center w-full px-10 gap-10'>
                                    <button onClick={handleClose} className='button-o px-4 text-xs text-white/60' >close</button>
                                    <a href='#' className='text-xs font-bold  text-gradient' >Posted ↗</a>
                                </div>
                            </Dialog.Description>
                            </>
                        }

                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default CreatePostDailog;