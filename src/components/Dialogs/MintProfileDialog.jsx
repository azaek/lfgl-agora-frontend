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
import { updateLens } from "../../store/slices/userSlice";
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import { PROFILE_MINTED } from "../../lib/mutations";


const loadLensContract = async () => {
    return await new window.web3.eth.Contract(
        LensHub,
        addresses.lensHub_proxy
    );
}


const getUsername = (str) => {
        return str.substring(str.length - 6);
    };


const MintProfileDialog = ({ open, setOpen, uData }) => {
    let buttonRef = useRef(null);

    const [minting, setMinting] = useState(false);
    const [postMinted, setPostMinted] = useState(false);
    const [txnId, setTxnId] = useState('');
    const [ postBody, setPostBody ] = useState('');

    const route = useRouter();

    
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    console.log(getUsername(user.walletAddress).toLowerCase());

    const [mintProfile, { data: mintingProfileData, loading: mintingProfile, error: mintingProfileError }] = useMutation(PROFILE_MINTED, {
        context: {
            headers: {
                authorization: `Bearer ${user.token}`
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
        if (mintingProfileData) {

            dispatch(
                updateLens(
                    {
                        lensProfileConnected: mintingProfileData.profileMinted.lensProfileConnected,
                        lensProfile_id: mintingProfileData.profileMinted.lensProfile_id,

                    }
                )
            )

            setMinting(false);
            setPostMinted(true);
        }
    }, [mintingProfileData]);

    const handleMint = async () => {
        setMinting(true);
        await loadWeb3();

        try {

            const data = {
                to: user.walletAddress,
                handle: getUsername(user.walletAddress).toLowerCase(),
                imageURI: "",
                followModule: "0x0000000000000000000000000000000000000000",
                followModuleData: [],
                followNFTURI: "",
            };
            const tx = await window.contract.methods.createProfile(
                data
            ).send({
                from: user.walletAddress
            });

            console.log("tx :", tx);
            setTxnId(tx.transactionHash);
            

            mintProfile({
                variables: {
                    profileId: +tx.events.ProfileCreated.returnValues.profileId,
                }
            })

        } catch (error) {
            console.log(error);
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

                                Mint Profile To Post
                                
                                <div className='flex items-center'>
                                    <p className='text-xs text-white/60 font-normal'>{shortenAddress(user.walletAddress)}</p>
                                </div>

                                
                            </Dialog.Title>
                            <Dialog.Description className="flex flex-col  w-full  gap-4 justify-between mt-4">
                            <p className='text-[#c6c6c6] text-medium text-xs max-w-[40ch] flex-[1] '>To be able to post in the Forum, you need to mint you profile on lens first. This is globally one-time action for every dao<br /><a className='text-gradient font-bold' href="https://docs.lens.dev/docs/profile" target="_blank" rel="noreferrer">Learn More</a></p>
                                <div className='flex justify-evenly w-full gap-4'>
                                    <button onClick={handleClose} className='button-o font-semibold tracking-wide py-3 px-4 text-xs border border-[#212427] rounded-lg'>Cancel</button>
                                    <button onClick={handleMint} ref={buttonRef} className={`button-s button-s font-semibold tracking-wide px-6 py-3  text-xs bg-[#212427] rounded-lg outline-none`}>Mint</button>
                                </div>
                            </Dialog.Description>
                        </>
                        }
                        {/* Minting.. Post View */}
                        {minting &&
                            <>
                            <Dialog.Title className="text-white text-base flex flex-col  font-bold tracking-wide gap-2 w-max self-center ">

                                Mint Profile To Post
                                
                                <div className='flex items-center'>
                                    <p className='text-xs text-white/60 font-normal'>{shortenAddress(user.walletAddress)}</p>
                                </div>

                                
                            </Dialog.Title>
                            <Dialog.Description className="flex flex-col  w-full items-center  gap-4 text-center justify-between mt-4">
                            <p className='text-[#c6c6c6] text-medium text-xs max-w-[40ch] flex-[1] '>To be able to post in the Forum, you need to mint you profile on lens first. This is globally one-time action for every dao<br /><a className='text-gradient font-bold' href="https://docs.lens.dev/docs/profile" target="_blank" rel="noreferrer">Learn More</a></p>
                                <div className='flex items-center justify-center gap-2'>
                                    <UseAnimations animation={loading} size={20} strokeColor="#ffffff" className='text-white' />
                                    <p className='text-sm text-white/50' >minting...</p>
                                </div>
                            </Dialog.Description>
                            </>
                        }
                        {/* Minted Post */}
                        {!minting && postMinted &&
                            <>
                            <Dialog.Title className="text-white text-base flex flex-col  font-bold tracking-wide gap-2 w-max self-center ">

                                Mint Profile To Post
                                
                                <div className='flex items-center'>
                                    <p className='text-xs text-white/60 font-normal'>{shortenAddress(user.walletAddress)}</p>
                                </div>
                                
                            </Dialog.Title>
                            <Dialog.Description className="flex flex-col  w-full items-center  gap-4 text-center justify-between mt-4">
                            <p className='text-[#c6c6c6] text-medium text-xs max-w-[40ch] flex-[1] '>To be able to post in the Forum, you need to mint you profile on lens first. This is globally one-time action for every dao<br /><a className='text-gradient font-bold' href="https://docs.lens.dev/docs/profile" target="_blank" rel="noreferrer">Learn More</a></p>
                                <div className='flex items-center justify-center w-full px-10 gap-10'>
                                    <button onClick={handleClose} className='button-o px-4 text-xs text-white/60' >close</button>
                                    <a href='#' className='text-xs font-bold  text-gradient' >Minted ↗</a>
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

export default MintProfileDialog;