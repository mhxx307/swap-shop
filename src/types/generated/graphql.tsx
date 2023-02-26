import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
};

export type Article = {
    __typename?: 'Article';
    createdDate: Scalars['DateTime'];
    description: Scalars['String'];
    id: Scalars['ID'];
    title: Scalars['String'];
    updatedDate: Scalars['DateTime'];
    user: User;
};

export type ArticleMutationResponse = IMutationResponse & {
    __typename?: 'ArticleMutationResponse';
    article?: Maybe<Article>;
    code: Scalars['Float'];
    errors?: Maybe<Array<FieldError>>;
    message?: Maybe<Scalars['String']>;
    success: Scalars['Boolean'];
};

export type ChangePasswordInput = {
    newPassword: Scalars['String'];
};

export type ChangePasswordLoggedInput = {
    newPassword: Scalars['String'];
    oldPassword: Scalars['String'];
};

export type CreateArticleInput = {
    description: Scalars['String'];
    title: Scalars['String'];
};

export type DeleteArticleInput = {
    id: Scalars['String'];
};

export type FieldError = {
    __typename?: 'FieldError';
    field: Scalars['String'];
    message: Scalars['String'];
};

export type FindArticleInput = {
    id: Scalars['String'];
};

export type ForgotPasswordInput = {
    email: Scalars['String'];
};

export type IMutationResponse = {
    code: Scalars['Float'];
    message?: Maybe<Scalars['String']>;
    success: Scalars['Boolean'];
};

export type LoginInput = {
    password: Scalars['String'];
    usernameOrEmail: Scalars['String'];
};

export type Message = {
    __typename?: 'Message';
    content: Scalars['String'];
    createdDate: Scalars['DateTime'];
    id: Scalars['ID'];
    status: Scalars['String'];
    updatedDate: Scalars['DateTime'];
};

export type MessageInput = {
    content: Scalars['String'];
    status: Scalars['String'];
    user: UserInput;
};

export type MessageMutationResponse = IMutationResponse & {
    __typename?: 'MessageMutationResponse';
    code: Scalars['Float'];
    createdMessage?: Maybe<Message>;
    errors?: Maybe<Array<FieldError>>;
    message?: Maybe<Scalars['String']>;
    success: Scalars['Boolean'];
};

export type Mutation = {
    __typename?: 'Mutation';
    changePassword: UserMutationResponse;
    changePasswordLogged: UserMutationResponse;
    createArticle: ArticleMutationResponse;
    createdMessage: MessageMutationResponse;
    deleteArticle: ArticleMutationResponse;
    forgotPassword: UserMutationResponse;
    login: UserMutationResponse;
    logout: Scalars['Boolean'];
    register: UserMutationResponse;
    updateArticle: ArticleMutationResponse;
};

export type MutationChangePasswordArgs = {
    changePasswordInput: ChangePasswordInput;
    token: Scalars['String'];
    userId: Scalars['String'];
};

export type MutationChangePasswordLoggedArgs = {
    changePasswordLoggedInput: ChangePasswordLoggedInput;
};

export type MutationCreateArticleArgs = {
    createArticleInput: CreateArticleInput;
};

export type MutationCreatedMessageArgs = {
    messageInput: MessageInput;
};

export type MutationDeleteArticleArgs = {
    deleteArticleInput: DeleteArticleInput;
};

export type MutationForgotPasswordArgs = {
    forgotPasswordInput: ForgotPasswordInput;
};

export type MutationLoginArgs = {
    loginInput: LoginInput;
};

export type MutationRegisterArgs = {
    registerInput: RegisterInput;
};

export type MutationUpdateArticleArgs = {
    updateArticleInput: UpdateArticleInput;
};

export type PaginatedArticles = {
    __typename?: 'PaginatedArticles';
    cursor: Scalars['DateTime'];
    hasMore: Scalars['Boolean'];
    paginatedArticles: Array<Article>;
    totalCount: Scalars['Float'];
};

export type Query = {
    __typename?: 'Query';
    article?: Maybe<Article>;
    articles?: Maybe<PaginatedArticles>;
    me?: Maybe<User>;
};

export type QueryArticleArgs = {
    findArticleInput: FindArticleInput;
};

export type QueryArticlesArgs = {
    cursor?: InputMaybe<Scalars['String']>;
    limit: Scalars['Int'];
};

export type RegisterInput = {
    address: Scalars['String'];
    avatar?: InputMaybe<Scalars['String']>;
    birthday?: InputMaybe<Scalars['String']>;
    email: Scalars['String'];
    fullName: Scalars['String'];
    password: Scalars['String'];
    phoneNumber: Scalars['String'];
    username: Scalars['String'];
};

export type UpdateArticleInput = {
    description?: InputMaybe<Scalars['String']>;
    id: Scalars['String'];
    title?: InputMaybe<Scalars['String']>;
};

export type User = {
    __typename?: 'User';
    address: Scalars['String'];
    avatar?: Maybe<Scalars['String']>;
    birthday?: Maybe<Scalars['String']>;
    createdDate: Scalars['DateTime'];
    email: Scalars['String'];
    fullName: Scalars['String'];
    id: Scalars['ID'];
    isOnline?: Maybe<Scalars['Boolean']>;
    phoneNumber: Scalars['String'];
    updatedDate: Scalars['DateTime'];
    username: Scalars['String'];
};

export type UserInput = {
    id: Scalars['Float'];
};

export type UserMutationResponse = IMutationResponse & {
    __typename?: 'UserMutationResponse';
    code: Scalars['Float'];
    errors?: Maybe<Array<FieldError>>;
    message?: Maybe<Scalars['String']>;
    success: Scalars['Boolean'];
    user?: Maybe<User>;
};

export type ArticleFragment = {
    __typename?: 'Article';
    id: string;
    title: string;
    description: string;
    createdDate: any;
    updatedDate: any;
    user: {
        __typename?: 'User';
        id: string;
        username: string;
        email: string;
        address: string;
        phoneNumber: string;
        fullName: string;
        birthday?: string | null;
        avatar?: string | null;
        isOnline?: boolean | null;
        createdDate: any;
        updatedDate: any;
    };
};

export type UserFragment = {
    __typename?: 'User';
    id: string;
    username: string;
    email: string;
    address: string;
    phoneNumber: string;
    fullName: string;
    birthday?: string | null;
    avatar?: string | null;
    isOnline?: boolean | null;
    createdDate: any;
    updatedDate: any;
};

export type UserMutationResponseFragment = {
    __typename?: 'UserMutationResponse';
    code: number;
    success: boolean;
    message?: string | null;
    user?: {
        __typename?: 'User';
        id: string;
        username: string;
        email: string;
        address: string;
        phoneNumber: string;
        fullName: string;
        birthday?: string | null;
        avatar?: string | null;
        isOnline?: boolean | null;
        createdDate: any;
        updatedDate: any;
    } | null;
    errors?: Array<{
        __typename?: 'FieldError';
        field: string;
        message: string;
    }> | null;
};

export type ErrorsFragment = {
    __typename?: 'FieldError';
    field: string;
    message: string;
};

export type CreateArticleMutationVariables = Exact<{
    createArticleInput: CreateArticleInput;
}>;

export type CreateArticleMutation = {
    __typename?: 'Mutation';
    createArticle: {
        __typename?: 'ArticleMutationResponse';
        code: number;
        success: boolean;
        message?: string | null;
        article?: {
            __typename?: 'Article';
            id: string;
            title: string;
            description: string;
            createdDate: any;
            updatedDate: any;
            user: {
                __typename?: 'User';
                id: string;
                username: string;
                email: string;
                address: string;
                phoneNumber: string;
                fullName: string;
                birthday?: string | null;
                avatar?: string | null;
                isOnline?: boolean | null;
                createdDate: any;
                updatedDate: any;
            };
        } | null;
        errors?: Array<{
            __typename?: 'FieldError';
            field: string;
            message: string;
        }> | null;
    };
};

export type RegisterMutationVariables = Exact<{
    registerInput: RegisterInput;
}>;

export type RegisterMutation = {
    __typename?: 'Mutation';
    register: {
        __typename?: 'UserMutationResponse';
        code: number;
        success: boolean;
        message?: string | null;
        user?: {
            __typename?: 'User';
            id: string;
            username: string;
            email: string;
            address: string;
            phoneNumber: string;
            fullName: string;
            birthday?: string | null;
            avatar?: string | null;
            isOnline?: boolean | null;
            createdDate: any;
            updatedDate: any;
        } | null;
        errors?: Array<{
            __typename?: 'FieldError';
            field: string;
            message: string;
        }> | null;
    };
};

export type LoginMutationVariables = Exact<{
    loginInput: LoginInput;
}>;

export type LoginMutation = {
    __typename?: 'Mutation';
    login: {
        __typename?: 'UserMutationResponse';
        code: number;
        success: boolean;
        message?: string | null;
        user?: {
            __typename?: 'User';
            id: string;
            username: string;
            email: string;
            address: string;
            phoneNumber: string;
            fullName: string;
            birthday?: string | null;
            avatar?: string | null;
            isOnline?: boolean | null;
            createdDate: any;
            updatedDate: any;
        } | null;
        errors?: Array<{
            __typename?: 'FieldError';
            field: string;
            message: string;
        }> | null;
    };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type ForgotPasswordMutationVariables = Exact<{
    forgotPasswordInput: ForgotPasswordInput;
}>;

export type ForgotPasswordMutation = {
    __typename?: 'Mutation';
    forgotPassword: {
        __typename?: 'UserMutationResponse';
        code: number;
        success: boolean;
        message?: string | null;
    };
};

export type ChangePasswordMutationVariables = Exact<{
    changePasswordInput: ChangePasswordInput;
    userId: Scalars['String'];
    token: Scalars['String'];
}>;

export type ChangePasswordMutation = {
    __typename?: 'Mutation';
    changePassword: {
        __typename?: 'UserMutationResponse';
        code: number;
        success: boolean;
        message?: string | null;
        user?: {
            __typename?: 'User';
            id: string;
            username: string;
            email: string;
            address: string;
            phoneNumber: string;
            fullName: string;
            birthday?: string | null;
            avatar?: string | null;
            isOnline?: boolean | null;
            createdDate: any;
            updatedDate: any;
        } | null;
        errors?: Array<{
            __typename?: 'FieldError';
            field: string;
            message: string;
        }> | null;
    };
};

export type ChangePasswordLoggedMutationVariables = Exact<{
    changePasswordLoggedInput: ChangePasswordLoggedInput;
}>;

export type ChangePasswordLoggedMutation = {
    __typename?: 'Mutation';
    changePasswordLogged: {
        __typename?: 'UserMutationResponse';
        code: number;
        success: boolean;
        message?: string | null;
        errors?: Array<{
            __typename?: 'FieldError';
            field: string;
            message: string;
        }> | null;
    };
};

export type ArticlesQueryVariables = Exact<{
    limit: Scalars['Int'];
    cursor?: InputMaybe<Scalars['String']>;
}>;

export type ArticlesQuery = {
    __typename?: 'Query';
    articles?: {
        __typename?: 'PaginatedArticles';
        totalCount: number;
        cursor: any;
        hasMore: boolean;
        paginatedArticles: Array<{
            __typename?: 'Article';
            id: string;
            title: string;
            description: string;
            createdDate: any;
            updatedDate: any;
            user: {
                __typename?: 'User';
                id: string;
                username: string;
                email: string;
                address: string;
                phoneNumber: string;
                fullName: string;
                birthday?: string | null;
                avatar?: string | null;
                isOnline?: boolean | null;
                createdDate: any;
                updatedDate: any;
            };
        }>;
    } | null;
};

export type ArticleQueryVariables = Exact<{
    findArticleInput: FindArticleInput;
}>;

export type ArticleQuery = {
    __typename?: 'Query';
    article?: {
        __typename?: 'Article';
        id: string;
        title: string;
        description: string;
        createdDate: any;
        updatedDate: any;
        user: {
            __typename?: 'User';
            id: string;
            username: string;
            email: string;
            address: string;
            phoneNumber: string;
            fullName: string;
            birthday?: string | null;
            avatar?: string | null;
            isOnline?: boolean | null;
            createdDate: any;
            updatedDate: any;
        };
    } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
    __typename?: 'Query';
    me?: {
        __typename?: 'User';
        id: string;
        username: string;
        email: string;
        address: string;
        phoneNumber: string;
        fullName: string;
        birthday?: string | null;
        avatar?: string | null;
        isOnline?: boolean | null;
        createdDate: any;
        updatedDate: any;
    } | null;
};

export const UserFragmentDoc = gql`
    fragment user on User {
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
`;
export const ArticleFragmentDoc = gql`
    fragment article on Article {
        id
        title
        description
        user {
            ...user
        }
        createdDate
        updatedDate
    }
    ${UserFragmentDoc}
`;
export const ErrorsFragmentDoc = gql`
    fragment errors on FieldError {
        field
        message
    }
`;
export const UserMutationResponseFragmentDoc = gql`
    fragment userMutationResponse on UserMutationResponse {
        code
        success
        message
        user {
            ...user
        }
        errors {
            ...errors
        }
    }
    ${UserFragmentDoc}
    ${ErrorsFragmentDoc}
`;
export const CreateArticleDocument = gql`
    mutation CreateArticle($createArticleInput: CreateArticleInput!) {
        createArticle(createArticleInput: $createArticleInput) {
            code
            success
            message
            article {
                ...article
            }
            errors {
                ...errors
            }
        }
    }
    ${ArticleFragmentDoc}
    ${ErrorsFragmentDoc}
`;
export type CreateArticleMutationFn = Apollo.MutationFunction<
    CreateArticleMutation,
    CreateArticleMutationVariables
>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      createArticleInput: // value for 'createArticleInput'
 *   },
 * });
 */
export function useCreateArticleMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreateArticleMutation,
        CreateArticleMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        CreateArticleMutation,
        CreateArticleMutationVariables
    >(CreateArticleDocument, options);
}
export type CreateArticleMutationHookResult = ReturnType<
    typeof useCreateArticleMutation
>;
export type CreateArticleMutationResult =
    Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<
    CreateArticleMutation,
    CreateArticleMutationVariables
>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
        register(registerInput: $registerInput) {
            ...userMutationResponse
        }
    }
    ${UserMutationResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
    RegisterMutation,
    RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(
    baseOptions?: Apollo.MutationHookOptions<
        RegisterMutation,
        RegisterMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        options,
    );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
    RegisterMutation,
    RegisterMutationVariables
>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            ...userMutationResponse
        }
    }
    ${UserMutationResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
    LoginMutation,
    LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LoginMutation,
        LoginMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        options,
    );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
    LoginMutation,
    LoginMutationVariables
>;
export const LogoutDocument = gql`
    mutation Logout {
        logout
    }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
    LogoutMutation,
    LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LogoutMutation,
        LogoutMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
        LogoutDocument,
        options,
    );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
    LogoutMutation,
    LogoutMutationVariables
>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
        forgotPassword(forgotPasswordInput: $forgotPasswordInput) {
            code
            success
            message
        }
    }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPasswordInput: // value for 'forgotPasswordInput'
 *   },
 * });
 */
export function useForgotPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<
        ForgotPasswordMutation,
        ForgotPasswordMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        ForgotPasswordMutation,
        ForgotPasswordMutationVariables
    >(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
    typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
    Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword(
        $changePasswordInput: ChangePasswordInput!
        $userId: String!
        $token: String!
    ) {
        changePassword(
            changePasswordInput: $changePasswordInput
            userId: $userId
            token: $token
        ) {
            ...userMutationResponse
        }
    }
    ${UserMutationResponseFragmentDoc}
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      changePasswordInput: // value for 'changePasswordInput'
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<
        ChangePasswordMutation,
        ChangePasswordMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        ChangePasswordMutation,
        ChangePasswordMutationVariables
    >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
    typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
    Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>;
export const ChangePasswordLoggedDocument = gql`
    mutation ChangePasswordLogged(
        $changePasswordLoggedInput: ChangePasswordLoggedInput!
    ) {
        changePasswordLogged(
            changePasswordLoggedInput: $changePasswordLoggedInput
        ) {
            code
            success
            message
            errors {
                ...errors
            }
        }
    }
    ${ErrorsFragmentDoc}
`;
export type ChangePasswordLoggedMutationFn = Apollo.MutationFunction<
    ChangePasswordLoggedMutation,
    ChangePasswordLoggedMutationVariables
>;

/**
 * __useChangePasswordLoggedMutation__
 *
 * To run a mutation, you first call `useChangePasswordLoggedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordLoggedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordLoggedMutation, { data, loading, error }] = useChangePasswordLoggedMutation({
 *   variables: {
 *      changePasswordLoggedInput: // value for 'changePasswordLoggedInput'
 *   },
 * });
 */
export function useChangePasswordLoggedMutation(
    baseOptions?: Apollo.MutationHookOptions<
        ChangePasswordLoggedMutation,
        ChangePasswordLoggedMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        ChangePasswordLoggedMutation,
        ChangePasswordLoggedMutationVariables
    >(ChangePasswordLoggedDocument, options);
}
export type ChangePasswordLoggedMutationHookResult = ReturnType<
    typeof useChangePasswordLoggedMutation
>;
export type ChangePasswordLoggedMutationResult =
    Apollo.MutationResult<ChangePasswordLoggedMutation>;
export type ChangePasswordLoggedMutationOptions = Apollo.BaseMutationOptions<
    ChangePasswordLoggedMutation,
    ChangePasswordLoggedMutationVariables
>;
export const ArticlesDocument = gql`
    query Articles($limit: Int!, $cursor: String) {
        articles(limit: $limit, cursor: $cursor) {
            totalCount
            cursor
            hasMore
            paginatedArticles {
                id
                title
                description
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
                createdDate
                updatedDate
            }
        }
    }
`;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useArticlesQuery(
    baseOptions: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(
        ArticlesDocument,
        options,
    );
}
export function useArticlesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        ArticlesQuery,
        ArticlesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(
        ArticlesDocument,
        options,
    );
}
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<
    typeof useArticlesLazyQuery
>;
export type ArticlesQueryResult = Apollo.QueryResult<
    ArticlesQuery,
    ArticlesQueryVariables
>;
export const ArticleDocument = gql`
    query Article($findArticleInput: FindArticleInput!) {
        article(findArticleInput: $findArticleInput) {
            ...article
        }
    }
    ${ArticleFragmentDoc}
`;

/**
 * __useArticleQuery__
 *
 * To run a query within a React component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleQuery({
 *   variables: {
 *      findArticleInput: // value for 'findArticleInput'
 *   },
 * });
 */
export function useArticleQuery(
    baseOptions: Apollo.QueryHookOptions<ArticleQuery, ArticleQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<ArticleQuery, ArticleQueryVariables>(
        ArticleDocument,
        options,
    );
}
export function useArticleLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        ArticleQuery,
        ArticleQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<ArticleQuery, ArticleQueryVariables>(
        ArticleDocument,
        options,
    );
}
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleQueryResult = Apollo.QueryResult<
    ArticleQuery,
    ArticleQueryVariables
>;
export const MeDocument = gql`
    query Me {
        me {
            ...user
        }
    }
    ${UserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
    baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
