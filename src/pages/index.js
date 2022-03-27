import { useState, useEffect, useRef } from "react";
import { LandingMesh } from "../components/Utils/SvgUtil";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

import { useLazyQuery, useMutation, useQuery, gql } from "@apollo/client";
import { PING, GET_NONCE, CHECK_TOKEN } from "../lib/queries";
import { VERIFY_NONCE } from "../lib/mutations";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { useRouter } from "next/router";

import { motion, useViewportScroll, useTransform, useElementScroll } from "framer-motion";
import { ethers } from "ethers";
import { data } from "autoprefixer";


export default function Home() {

    const ref = useRef()
    const { scrollYProgress } = useViewportScroll(ref);
    const sp = useTransform(scrollYProgress, [0, 1], [0, 1])
    const v = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const opac = useTransform(scrollYProgress, [0, 0.3], [0.6, 1])
    const lPos = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const bPos = useTransform(scrollYProgress, [0, 1], [50, 25]);
    const blurVal = useTransform(scrollYProgress, [0, 1], [64, 1]);
    const spotW = useTransform(scrollYProgress, [0, 1], [20, 100]);
    const spotBorder = useTransform(scrollYProgress, [0, 0.6 ,1], [99999, 99999, 0]);
    const [bv, setBv] = useState(64);
    const [leftPos, setLeftPos] = useState(0);
    const [bottomPos, setBottomPos] = useState(50);
    const [ sWidth, setSWidth ] = useState(10);
    const [ sBorder, setSBorder ] = useState(99999);
    const [ sPos, setSPos ] = useState(0);

    const getBlurClass = (val) => {
      let b = "blur-[" + Math.floor(val) + "px]";
      console.log(b);
      return b;
    }

    const getLeftPos = (val) => {
      console.log(val);
      return "left-[" + Math.floor(val) + "px]";
    }

    useEffect(() => {
      blurVal.onChange((v) => {
        setBv(v);
      });
    }, [blurVal])

    useEffect(() => {
      lPos.onChange((v) => {
        setLeftPos(v);
      });
    }, [lPos])

    useEffect(() => {
      bPos.onChange((v) => {
        setBottomPos(v);
      });
    }, [bPos])

    useEffect(() => {
      spotW.onChange((v) => {
        setSWidth(v);
      });
    }, [spotW])

    useEffect(() => {
      spotBorder.onChange((v) => {
        setSBorder(v);
      });
    }, [spotBorder])

    useEffect(() => {
      sp.onChange((v) => {
        if (v == 1) {
          setSPos(1);
        } else {
          setSPos(0);
        }
      });
    }, [sp])


    /** animation end */

    const dispatch = useDispatch();
    const route = useRouter();
    const user = useSelector(state => state.user);

    const { loading : pingLoading, error: pingError, data: pingData } = useQuery(PING);
    const [getNonce, { loading : getNonceLoading, error: getNonceError, data: getNonceData }] = useLazyQuery(GET_NONCE);
    const [verifyNonce, { loading: verifyNonceLoading, error: verifyNonceError, data: verifyNonceData }] = useMutation(VERIFY_NONCE);
    const [checkToken, { loading: checkTokenLoading, error: checkTokenError, data: checkTokenData }] = useLazyQuery(CHECK_TOKEN, {
      context: {
        headers: {
          "authorization": "Bearer " + user.token
        }
      }
    });


    const [walletAddress, setWalletAddress] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
      if (checkTokenData && walletAddress !== "") {
        if (!checkTokenData.checkAuth.expired) {
          // TODO: refresh token
          route.push("/home");
        }
      }
    },[checkTokenData, route, walletAddress])

    useEffect( () => {
      const loginCheck = async () => {
        try {
          if (window.ethereum === 'undefined') {
            alert("Please install MetaMask to use this application.")
            return;
          }
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            checkToken();
          }

        }
        catch (error) {
          console.log(error);
        }
      }
      loginCheck();
    }, [checkToken])


    useEffect(() => {
      if (getNonceData) {
        signAndVerifyData(getNonceData.getDaoNonce);
      }
    },[getNonceData])

    useEffect(() => {
      if (verifyNonceData) {
        if (verifyNonceData.verifySignatureDao.verified) {
          setIsLoading(false);
          // signature matched
          dispatch(
            setUser({
              walletAddress: verifyNonceData.verifySignatureDao.walletAddress,
              lastLogin: new Date().toISOString(),
              token: verifyNonceData.verifySignatureDao.token,
              lensProfileConnected: verifyNonceData.verifySignatureDao.lensProfileConnected,
              lensProfile_id: verifyNonceData.verifySignatureDao.lensProfile_id,
            })
          )

          route.push("/home");
        } else {
          alert("Signature did not match");
        }
      }
    }, [verifyNonceData])

    const signAndVerifyData = async (data) => {
      const signData = await signNonce(data.nonce)
        .catch(err => {
          console.log(err);
          alert("Error signing data");
          return;
        });

        if (signData.signature) {
          verifyNonce({
            variables: {
              signature: signData.signature,
              walletAddress: signData.address
            }
          })
        }

        return;
    } // eslint-disable-line react-hooks/exhaustive-deps

    const signNonce = async (nonce) => {
      try {
        if(window.ethereum === 'undefined') {
          alert("Please install MetaMask");
          return;
        }

        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(nonce)
          .catch(err => {
            alert("Error occured!");
            return;
          })
        const address = await signer.getAddress();
        return {
          signature,
          address
        }
      } catch (err) {
        alert("Error occured!");
        setIsLoading(false);
        console.log(err);
      }
    }

    const handleConnectWallet = async () => {
      setIsLoading(true);

      try {
        if (window.ethereum === 'undefined') {
          alert("Please install MetaMask to use this application.")
          return;
        }

        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        console.log("Connected to MetaMask: " + address);
        setWalletAddress(address);
        getNonce({ variables: { walletAddress: address } });

      }
      catch (error) {

        // error.code === 4001 means user rejected transaction

        setIsLoading(false);
        console.log(error);
      }

    }


    return (
        <div className="min-h-screen w-full bg-[#000000] relative overflow-clip">
            <div className="fixed inset-0 top-0 w-full h-screen overflow-hidden z-[1]">
                <LandingMesh sp={sPos} />
            </div>

            <span className={` ${pingError ? 'text-red-400' : 'text-green-400'} absolute top-0 right-4`}>.</span>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ opacity: opac, left: `${leftPos}%`, bottom: `${bottomPos}%`, transform: 'translate(-50%, 50%)', width: `${sWidth}%`, height: `${sWidth}%`, borderRadius: `${sBorder}px` }}
                className={`w-72 h-72 gradient-spot rounded-[100px] blur-[44px] absolute scale-150 z-0 transform translate-x-1/2`}
            ></motion.div>

            <div className="flex flex-col bg-black" ref={ref} >
                <div className="w-full h-screen flex flex-col justify-center items-center relative">
                    <motion.h1 initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity:1 }} transition={{ duration: 1 }} className="text-white text-3xl flex items-center">
                        Enriching web3 social experience
                    </motion.h1>

                    <motion.h1 initial={{ opacity: 0, bottom: '200px' }} animate={{ opacity: 1, bottom: '40px' }} style={{ opacity: v }} transition={{ duration: 1, delay: 0.5 }} className="text-white text-3xl absolute bottom-10">
                        &darr;
                    </motion.h1>
                </div>

                <div className="w-full h-screen flex flex-col justify-center items-center relative gap-4">
                    <h1 className="text-black text-3xl font-medium flex flex-col">
                        Let&apos;s go
                    </h1>

                    <button onClick={handleConnectWallet} className="px-4 py-2 text-white font-bold text-sm bg-black rounded-xl z-20 flex items-center gap-2">
                        { !isLoading && <img src="/metamask.svg" alt="" />}
                        { isLoading && <UseAnimations animation={loading} size={24} strokeColor="#ffffff" />}


                        { isLoading ? 'Connecting..': 'Connect Wallet'}
                    </button>
                </div>
            </div>
        </div>
    );
}
