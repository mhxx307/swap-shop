import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
    mutation Register($registerInput: RegisterInput!) {
        register(registerInput: $registerInput) {
            code
            success
            message
            user {
                id
                username
                email
                address
                phoneNumber
                fullName
                birthday
                avatar
                isOnline
                createdDate
                updatedDate
            }
            errors {
                field
                message
            }
        }
    }
`;
