const IconSvg = () => {
    return (
        <div>
            Enter
        </div>
    );
}

const HomeIcon = ({ active = false }) => {
    return (
        <>
            {!active && <svg className="group-hover:scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18V15V18ZM10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997V2.81997Z" stroke="#A29997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}

            {active && <svg className="scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18V15V18ZM10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997V2.81997Z" stroke="url(#paint0_linear_466_183)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                    <linearGradient id="paint0_linear_466_183" x1="1.99683" y1="11.9968" x2="21.9998" y2="11.9968" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBED96" />
                        <stop offset="1" stopColor="#ABECD6" />
                    </linearGradient>
                </defs>
            </svg>}
        </>
    );
}
const CommIcon = ({ active = false }) => {
    return (
        <>
            {!active && <svg className="group-hover:scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.41 3.99999C18.35 3.99999 19.91 5.56999 19.91 7.49999C19.91 9.38999 18.41 10.93 16.54 11C16.4536 10.99 16.3664 10.99 16.28 11M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14M9.15997 10.87C9.05997 10.86 8.93997 10.86 8.82997 10.87C7.68218 10.831 6.59461 10.3468 5.7976 9.51995C5.00059 8.69307 4.55671 7.58844 4.55997 6.43999C4.55997 3.98999 6.53997 1.99999 8.99997 1.99999C10.1762 1.97877 11.3127 2.42568 12.1594 3.2424C13.0061 4.05912 13.4938 5.17875 13.515 6.35499C13.5362 7.53123 13.0893 8.66771 12.2726 9.51444C11.4558 10.3612 10.3362 10.8488 9.15997 10.87ZM4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z" stroke="#A29997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}

            {active && <svg className="scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.41 3.99999C18.35 3.99999 19.91 5.56999 19.91 7.49999C19.91 9.38999 18.41 10.93 16.54 11C16.4536 10.99 16.3664 10.99 16.28 11M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14M9.15997 10.87C9.05997 10.86 8.93997 10.86 8.82997 10.87C7.68218 10.831 6.59461 10.3468 5.7976 9.51995C5.00059 8.69307 4.55671 7.58844 4.55997 6.43999C4.55997 3.98999 6.53997 1.99999 8.99997 1.99999C10.1762 1.97877 11.3127 2.42568 12.1594 3.2424C13.0061 4.05912 13.4938 5.17875 13.515 6.35499C13.5362 7.53123 13.0893 8.66771 12.2726 9.51444C11.4558 10.3612 10.3362 10.8488 9.15997 10.87ZM4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z" stroke="url(#paint0_linear_467_185)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                    <linearGradient id="paint0_linear_467_185" x1="2.34497" y1="11.9046" x2="21.47" y2="11.9046" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBED96" />
                        <stop offset="1" stopColor="#ABECD6" />
                    </linearGradient>
                </defs>
            </svg>}
        </>
    );
}

const AssemblyIcon = ({ active = false }) => {
    return (
        <>
            {!active && <svg className="group-hover:scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9.86V14.15M9 8.43V15.57M12 7V17M15 8.43V15.57M18 9.86V14.15M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#A29997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}

            {active && <svg className="scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9.86V14.15M9 8.43V15.57M12 7V17M15 8.43V15.57M18 9.86V14.15M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="url(#paint0_linear_468_189)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                    <linearGradient id="paint0_linear_468_189" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBED96" />
                        <stop offset="1" stopColor="#ABECD6" />
                    </linearGradient>
                </defs>
            </svg>}
        </>

    );
}

const ContributionIcon = ({ active = false }) => {
    return (
        <>
            {!active && <svg className="group-hover:scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.24998 10H14.75M6.72798 19.7C7.54798 18.82 8.79798 18.89 9.51798 19.85L10.528 21.2C11.338 22.27 12.648 22.27 13.458 21.2L14.468 19.85C15.188 18.89 16.438 18.82 17.258 19.7C19.038 21.6 20.488 20.97 20.488 18.31V7.04C20.488 3.01 19.548 2 15.768 2H8.20798C4.42798 2 3.48798 3.01 3.48798 7.04V18.3C3.49798 20.97 4.95798 21.59 6.72798 19.7V19.7Z" stroke="#A29997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}

            {active && <svg className="scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25004 10H14.75M6.72804 19.7C7.54804 18.82 8.79804 18.89 9.51804 19.85L10.528 21.2C11.338 22.27 12.648 22.27 13.458 21.2L14.468 19.85C15.188 18.89 16.438 18.82 17.258 19.7C19.038 21.6 20.488 20.97 20.488 18.31V7.04C20.488 3.01 19.548 2 15.768 2H8.20804C4.42804 2 3.48804 3.01 3.48804 7.04V18.3C3.49804 20.97 4.95804 21.59 6.72804 19.7V19.7Z" stroke="url(#paint0_linear_468_193)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                    <linearGradient id="paint0_linear_468_193" x1="3.48804" y1="12.0013" x2="20.488" y2="12.0013" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBED96" />
                        <stop offset="1" stopColor="#ABECD6" />
                    </linearGradient>
                </defs>
            </svg>}
        </>

    );
}

const MessageIcon = ({ active = false }) => {
    return (
        <>
            {!active && <svg className="group-hover:scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 10.5H15.5H8.5ZM7 18.43H11L15.45 21.39C15.6002 21.4901 15.7747 21.5476 15.955 21.5563C16.1353 21.5649 16.3145 21.5245 16.4736 21.4393C16.6328 21.3541 16.7658 21.2273 16.8585 21.0725C16.9512 20.9176 17.0001 20.7405 17 20.56V18.43C20 18.43 22 16.43 22 13.43V7.42999C22 4.42999 20 2.42999 17 2.42999H7C4 2.42999 2 4.42999 2 7.42999V13.43C2 16.43 4 18.43 7 18.43V18.43Z" stroke="#A29997" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}

            {active && <svg className="scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 10.5H15.5H8.5ZM7 18.43H11L15.45 21.39C15.6002 21.4901 15.7747 21.5476 15.955 21.5563C16.1353 21.5649 16.3145 21.5245 16.4736 21.4393C16.6328 21.3541 16.7658 21.2273 16.8585 21.0725C16.9512 20.9176 17.0001 20.7405 17 20.56V18.43C20 18.43 22 16.43 22 13.43V7.42999C22 4.42999 20 2.42999 17 2.42999H7C4 2.42999 2 4.42999 2 7.42999V13.43C2 16.43 4 18.43 7 18.43V18.43Z" stroke="url(#paint0_linear_468_197)" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                    <linearGradient id="paint0_linear_468_197" x1="2" y1="11.9937" x2="22" y2="11.9937" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBED96" />
                        <stop offset="1" stopColor="#ABECD6" />
                    </linearGradient>
                </defs>
            </svg>}

        </>

    );
}

const ProfileIcon = ({ active = false }) => {
    return (
        <>
            {!active && <svg className="group-hover:scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C10.6822 10.831 9.59461 10.3468 8.7976 9.51995C8.00059 8.69307 7.55671 7.58844 7.55997 6.43999C7.55997 3.98999 9.53997 1.99999 12 1.99999C12.5824 1.98948 13.1612 2.0938 13.7033 2.30697C14.2454 2.52014 14.7402 2.838 15.1594 3.2424C15.5787 3.6468 15.9142 4.12982 16.1468 4.66388C16.3793 5.19794 16.5045 5.77258 16.515 6.35499C16.5255 6.9374 16.4212 7.51618 16.208 8.05828C15.9948 8.60038 15.677 9.09518 15.2726 9.51444C14.8682 9.9337 14.3851 10.2692 13.8511 10.5018C13.317 10.7344 12.7424 10.8595 12.16 10.87V10.87ZM7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56V14.56Z" stroke="#A29997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}

            {active && <svg className="scale-110 t-all-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C10.6822 10.831 9.59461 10.3468 8.7976 9.51995C8.00059 8.69307 7.55671 7.58844 7.55997 6.43999C7.55997 3.98999 9.53997 1.99999 12 1.99999C12.5824 1.98948 13.1612 2.0938 13.7033 2.30697C14.2454 2.52014 14.7402 2.838 15.1594 3.2424C15.5787 3.6468 15.9142 4.12982 16.1468 4.66388C16.3793 5.19794 16.5045 5.77258 16.515 6.35499C16.5255 6.9374 16.4212 7.51618 16.208 8.05828C15.9948 8.60038 15.677 9.09518 15.2726 9.51444C14.8682 9.9337 14.3851 10.2692 13.8511 10.5018C13.317 10.7344 12.7424 10.8595 12.16 10.87V10.87ZM7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56V14.56Z" stroke="url(#paint0_linear_468_201)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                    <linearGradient id="paint0_linear_468_201" x1="5.34497" y1="11.9046" x2="18.985" y2="11.9046" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FBED96" />
                        <stop offset="1" stopColor="#ABECD6" />
                    </linearGradient>
                </defs>
            </svg>}

        </>

    );
}

const LogOutIcon = () => {
    return (
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4M17.44 14.62L20 12.06L17.44 9.5V14.62ZM9.76001 12.06H19.93H9.76001Z" stroke="#f87171" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
}

const UpVoteIcon = () => {
    return (
        <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.34915 2.7475L1.79082 9.50833C0.944986 11.1125 2.65415 12.8567 4.27582 12.0458L6.16582 11.1008C6.69082 10.8383 7.30915 10.8383 7.83415 11.1008L9.72415 12.0458C11.3458 12.8567 13.0492 11.1125 12.2092 9.50833L8.65082 2.7475C7.95082 1.4175 6.04915 1.4175 5.34915 2.7475V2.7475Z" stroke="#5E5E5E" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        </>
    );
}

const DownVoteIcon = () => {
    return (
        <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.34915 11.2525L1.79082 4.49167C0.944986 2.8875 2.65415 1.14334 4.27582 1.95417L6.16582 2.89917C6.69082 3.16167 7.30915 3.16167 7.83415 2.89917L9.72415 1.95417C11.3458 1.14334 13.0492 2.8875 12.2092 4.49167L8.65082 11.2525C7.95082 12.5825 6.04915 12.5825 5.34915 11.2525Z" stroke="#5E5E5E" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
}

const CommentIcon = () => {
    return (
        <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.95833 6.12498H9.04166H4.95833ZM4.08333 10.7508H6.41666L9.0125 12.4775C9.1001 12.5359 9.20192 12.5694 9.30708 12.5745C9.41224 12.5795 9.51681 12.556 9.60963 12.5063C9.70244 12.4566 9.78002 12.3826 9.8341 12.2923C9.88817 12.2019 9.91671 12.0986 9.91666 11.9933V10.7508C11.6667 10.7508 12.8333 9.58415 12.8333 7.83415V4.33415C12.8333 2.58415 11.6667 1.41748 9.91666 1.41748H4.08333C2.33333 1.41748 1.16666 2.58415 1.16666 4.33415V7.83415C1.16666 9.58415 2.33333 10.7508 4.08333 10.7508V10.7508Z" stroke="#5E5E5E" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
}

const CreatePostIcon = () => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33337 7.99992H10.6667M8.00004 10.6666V5.33325M6.00004 14.6666H10C14.6667 14.6666 10.3334 14.6666 14.6667 14.6666V5.99992C14.6667 2.66659 13.3334 1.33325 10 1.33325H6.00004C2.66671 1.33325 1.33337 2.66659 1.33337 5.99992V14.6666C6.00004 14.6666 2.66671 14.6666 6.00004 14.6666Z" stroke="url(#paint0_linear_555_548)" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="paint0_linear_555_548" x1="1.33337" y1="7.99992" x2="14.6667" y2="7.99992" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FBED96" />
                    <stop offset="1" stopColor="#ABECD6" />
                </linearGradient>
            </defs>
        </svg>

    )
}





module.exports = {
    IconSvg,
    HomeIcon,
    CommIcon,
    AssemblyIcon,
    ContributionIcon,
    MessageIcon,
    ProfileIcon,
    LogOutIcon,
    UpVoteIcon,
    DownVoteIcon,
    CommentIcon,
    CreatePostIcon
}