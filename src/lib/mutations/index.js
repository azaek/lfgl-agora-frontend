import { gql } from "@apollo/client"

/**
 * @variables { walletAddress, signature }
 */
const VERIFY_NONCE = gql`
    mutation VerifySignatureDao($signature: String!, $walletAddress: String!) {
        verifySignatureDao(signature: $signature, walletAddress: $walletAddress) {
            verified
            token
            walletAddress
            lensProfileConnected
            lensProfile_id
        }
    }
`

const JOIN_DAO = gql`
    mutation JoinDao($joinDaoId: ID!, $tokenId: Int!) {
        joinDao(daoId: $joinDaoId, tokenId: $tokenId) {
            daoName
            daoAddress
            id
            governorAddress
            profile_id
            forum_pub_id
            daoOverview
            daoDescription
            daoPurpose
            daoLinks {
                link
                platform
            }
            daoType
            daoImg
            daoCoverImg
            feeFollow
            quorumPercentage
            votingPeriod
            minimumDelay
            members {
                tokenId
                walletAddress
                joiningDate
            }
            creator
            followNFTAddress
            followCurrency
            followCost
        }
    }
`

const POST_DAO_POST = gql`
    mutation CreateDaoPost($createDaoPostInput: DaoPostInput!) {
        createDaoPost(daoPostInput: $createDaoPostInput) {
            id
            daoId
            daoName
            pub_id_pointed
            profile_id_pointed
            pub_id
            profile_id
            walletAddress
            body
            images
            timestamp
            upVotes {
                timestamp
                walletAddress
            }
            downVotes {
                walletAddress
                timestamp
            }
            topics
        }
    }
`

const PROFILE_MINTED = gql`
    mutation ProfileMinted($profileId: Int!) {
        profileMinted(profile_id: $profileId) {
            id
            nonce
            lastLogin
            lensProfileConnected
            lensProfile_id
            walletAddress
        }
    }
`

module.exports = {
    VERIFY_NONCE,
    JOIN_DAO,
    POST_DAO_POST,
    PROFILE_MINTED
}