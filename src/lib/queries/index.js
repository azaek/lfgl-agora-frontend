import { gql } from "@apollo/client"

/**
 * @variables { walletAddress }
 */
const GET_NONCE = gql`
    query GetDaoNonce($walletAddress: String!) {
        getDaoNonce(walletAddress: $walletAddress) {
            nonce
            newUser
        }
    }
`

const PING = gql`
    query Ping {
        ping
    }
`

/**
 * requires context with auth header { "Authorization": "Bearer " + token }
 */

const CHECK_TOKEN = gql`
    query CheckAuth {
        checkAuth {
            token
            expired
        }
    }
`

const GET_POSTS = gql`
    query GetDaoPosts {
        getDaoPosts {
            id
            daoId
            daoName
            walletAddress
            body
            timestamp
        }
    }
`

const GET_DAO_POSTS = gql`
    query GetDaoPostsOnly($daoId: ID!) {
        getDaoPostsOnly(daoId: $daoId) {
            id
            daoId
            daoName
            walletAddress
            body
            timestamp
        }
    }
`

const GET_DAOS = gql`
    query GetDaos {
        getDaos {
            id
            daoName
            daoDescription
            daoType
            members {
                tokenId
                joiningDate
                walletAddress
            }
            followCost
            followCurrency
        }
    }
`

const GET_DAO = gql`
    query GetDao($id: ID!) {
        getDao(daoId: $id) {
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

module.exports = {
    GET_NONCE,
    PING,
    CHECK_TOKEN,
    GET_POSTS,
    GET_DAO_POSTS,
    GET_DAOS,
    GET_DAO
}