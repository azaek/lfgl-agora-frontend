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
import { JOIN_DAO } from "../../lib/mutations";


const loadLensContract = async () => {
    return await new window.web3.eth.Contract(
        LensHub,
        addresses.lensHub_proxy
    );
}

const loadFollowContract = async (address) => {
    return await new window.web3.eth.Contract(
        FollowNft,
        address
    );
}


const JoinDaoDialog = ({ open, setOpen, uData }) => {
    let buttonRef = useRef(null);

    const [minting, setMinting] = useState(false);
    const [postMinted, setPostMinted] = useState(false);
    const [txnId, setTxnId] = useState('');

    const route = useRouter();

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [joinDao, { data: joinDaoData, loading: joinDaoLoading, error: joinDaoError }] = useMutation(JOIN_DAO, {
        context: {
            headers: {
                "authorization": "Bearer " + user.token
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
        if (joinDaoData) {
            setMinting(false);
            setPostMinted(true);
        }
    }, [joinDaoData]);

    const handleMint = async () => {
        setMinting(true);
        await loadWeb3();

        try {
            const tx = await window.contract.methods.follow(
                [uData.profile_id], [[]]
            ).send({
                from: user.walletAddress
            });

            console.log("tx :", tx);
            setTxnId(tx.transactionHash);
            
            window.contract = await loadFollowContract(uData.followNFTAddress);
            
            const tx1 = await window.contract.methods.delegate(user.walletAddress).send({
                from: user.walletAddress
            })

            console.log("tx :", tx1);


            joinDao({
                variables: {
                    joinDaoId: uData.id,
                    tokenId: +tx.events.FollowNFTTransferred.returnValues.followNFTId
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

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

                    <div className="relative bg-[#141515] border border-[#212427]  rounded-2xl max-w-sm w-full mx-auto px-6 py-4 sm:py-10 gap-4">
                        {/* Mint Post View */}
                        {!minting && !postMinted && <>
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
                                <p className='text-[#c6c6c6] text-medium text-xs max-w-[40ch] flex-[1] '>Joining a dao utilizes follow from lens protocol. You need to approve two transactions to completely join a dao and claim delegate<br /><a className='text-gradient font-bold' href="https://docs.lens.dev/docs/follow" target="_blank" rel="noreferrer">Learn More</a></p>
                                <div className='flex items-center justify-evenly w-full gap-4'>
                                    <button onClick={handleClose} className='button-o font-semibold tracking-wide py-3 px-4 text-xs border border-[#212427] rounded-lg'>Not Now</button>
                                    <button onClick={handleMint} ref={buttonRef} className='button-s font-semibold tracking-wide px-6 py-3  text-xs bg-[#212427] rounded-lg outline-none'>Join</button>
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
                                <p className='text-[#c6c6c6] text-medium text-xs max-w-[40ch] flex-[1] '>Joining a dao utilizes follow from lens protocol. You need to approve two transactions to completely join a dao and claim delegate<br /><a className='text-gradient font-bold' href="https://docs.lens.dev/docs/follow" target="_blank" rel="noreferrer">Learn More</a></p>
                                <div className='flex items-center justify-center gap-2'>
                                    <UseAnimations animation={loading} size={20} strokeColor="#ffffff" className='text-white' />
                                    <p className='text-sm text-white/50' >joining...</p>
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
                                <p className='text-[#c6c6c6] text-medium text-xs max-w-[40ch] flex-[1] '>Joining a dao utilizes follow from lens protocol. You need to approve two transactions to completely join a dao and claim delegate<br /><a className='text-gradient font-bold' href="https://docs.lens.dev/docs/follow" target="_blank" rel="noreferrer">Learn More</a></p>
                                <div className='flex items-center justify-center w-full px-10 gap-10'>
                                    <button onClick={handleClose} className='button-o px-4 text-xs text-white/60' >close</button>
                                    <a href='#' className='text-xs font-bold  text-gradient' >Joined ↗</a>
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

export default JoinDaoDialog;