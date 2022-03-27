const TreasuryCard = () => {
    return (
        <div className="w-full rounded-xl bg-[#141515]/50 mt-28 ring-2 ring-[#212427] backdrop-blur-sm flex flex-col gap-2 p-4">
            <div className="flex items-end justify-between w-full">
                <h5 className="text-[10px] text-white/60 uppercase tracking-widest">
                    treasury
                </h5>
                <a
                    href="#"
                    className="text-[10px] text-[#CDCDCD] bg-[#141515] px-2 py-1 rounded-lg btn-hvr "
                >
                    Month ▼
                </a>
            </div>

            <div className="flex flex-col">
                <h3 className="text-base text-white/90 ">$ 1,694,899.72</h3>
                <p className="text-[10px] text-white/60 font-medium tracking-wider">
                    4 tokens &rarr;
                </p>
            </div>

            {/* temp graph */}
            <div className=" h-36 w-full">
                <svg
                    className="w-full h-full"
                    width="241"
                    height="78"
                    viewBox="0 0 241 78"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.64807 76.8632L57.5506 71.2452C59.592 70.8809 63.6747 70.1523 67.7575 61.4904C71.8402 52.8285 75.923 36.2331 80.0057 32.3333C84.0885 28.4335 88.1712 37.2292 92.254 44.7415C96.3367 52.2538 100.419 58.4826 104.502 55.8937C108.585 53.3048 112.668 41.8982 116.75 35.4736C120.833 29.0491 124.916 27.6067 128.999 26.6301C133.081 25.6536 137.164 25.1429 141.247 26.0218C145.33 26.9007 149.412 29.1693 153.495 28.1797C157.578 27.1901 161.661 22.9423 165.743 18.7751C169.826 14.6079 173.909 10.5213 177.992 8.88647C182.074 7.25164 186.157 8.06858 190.24 9.54524C194.323 11.0219 198.405 13.1583 202.488 15.0352C206.571 16.9122 210.654 18.5297 214.736 15.2813C218.819 12.0329 222.902 3.91864 226.985 1.81636C231.067 -0.285925 235.15 3.62377 237.191 5.57862L239.233 7.53346"
                        stroke="url(#paint0_linear_460_813)"
                        strokeWidth="1.63135"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_460_813"
                            x1="1.64807"
                            y1="39.0379"
                            x2="239.233"
                            y2="39.0379"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#FBED96" />
                            <stop offset="1" stopColor="#ABECD6" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Activities */}
            {/* <div className="flex items-center w-full justify-end">
                <a
                    href="#"
                    className="text-[10px] text-[#CDCDCD] hover:text-gradient "
                >
                    Show All
                </a>
            </div> */}

            {/* Activity List */}
            {/* <div className="w-full flex flex-col gap-2">

            </div> */}
        </div>
    );
};

export default TreasuryCard;
