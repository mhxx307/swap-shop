import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  category: Category;
  createdDate: Scalars['DateTime'];
  description: Scalars['String'];
  discount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  images: Array<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  productName: Scalars['String'];
  thumbnail: Scalars['String'];
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

export type Category = {
  __typename?: 'Category';
  createdDate: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedDate: Scalars['DateTime'];
};

export type CategoryMutationResponse = IMutationResponse & {
  __typename?: 'CategoryMutationResponse';
  category?: Maybe<Category>;
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

export type Comment = {
  __typename?: 'Comment';
  article: Article;
  createdDate: Scalars['DateTime'];
  id: Scalars['ID'];
  status?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  updatedDate: Scalars['DateTime'];
  user: User;
};

export type CommentMutationResponse = IMutationResponse & {
  __typename?: 'CommentMutationResponse';
  code: Scalars['Float'];
  comment?: Maybe<Comment>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
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

export type InsertArticleInput = {
  categoryId: Scalars['String'];
  description: Scalars['String'];
  discount?: InputMaybe<Scalars['Float']>;
  images: Array<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  productName: Scalars['String'];
  title: Scalars['String'];
};

export type InsertCommentInput = {
  articleId: Scalars['String'];
  text: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserMutationResponse;
  changePasswordLogged: UserMutationResponse;
  deleteArticle: ArticleMutationResponse;
  deleteComment: CommentMutationResponse;
  forgotPassword: UserMutationResponse;
  insertArticle: ArticleMutationResponse;
  insertCategory: CategoryMutationResponse;
  insertComment: CommentMutationResponse;
  login: UserMutationResponse;
  logout: Scalars['Boolean'];
  register: UserMutationResponse;
  updateArticle: ArticleMutationResponse;
  updateComment: CommentMutationResponse;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationChangePasswordLoggedArgs = {
  changePasswordLoggedInput: ChangePasswordLoggedInput;
};


export type MutationDeleteArticleArgs = {
  deleteArticleInput: DeleteArticleInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationInsertArticleArgs = {
  insertArticleInput: InsertArticleInput;
};


export type MutationInsertCategoryArgs = {
  name: Scalars['String'];
};


export type MutationInsertCommentArgs = {
  insertCommentInput: InsertCommentInput;
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


export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};

export type PaginatedArticles = {
  __typename?: 'PaginatedArticles';
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  paginatedArticles: Array<Article>;
  totalCount: Scalars['Float'];
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  paginatedComments: Array<Comment>;
  totalCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles?: Maybe<PaginatedArticles>;
  commentListByArticleId?: Maybe<PaginatedComments>;
  me?: Maybe<User>;
};


export type QueryArticleArgs = {
  findArticleInput: FindArticleInput;
};


export type QueryArticlesArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryCommentListByArticleIdArgs = {
  articleId: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type RegisterInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UpdateArticleInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateCommentInput = {
  id: Scalars['String'];
  text: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  isOnline?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedDate: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type ArticleFragment = { __typename?: 'Article', id: string, title: string, description: string, price?: number | null, productName: string, thumbnail: string, discount?: number | null, images: Array<string>, createdDate: any, updatedDate: any, category: { __typename?: 'Category', id: string, name: string }, user: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, isOnline?: boolean | null, createdDate: any, updatedDate: any } };

export type UserFragment = { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, isOnline?: boolean | null, createdDate: any, updatedDate: any };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, isOnline?: boolean | null, createdDate: any, updatedDate: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ErrorsFragment = { __typename?: 'FieldError', field: string, message: string };

export type InsertArticleMutationVariables = Exact<{
  insertArticleInput: InsertArticleInput;
}>;


export type InsertArticleMutation = { __typename?: 'Mutation', insertArticle: { __typename?: 'ArticleMutationResponse', message?: string | null, success: boolean, article?: { __typename?: 'Article', id: string, title: string, description: string, price?: number | null, productName: string, thumbnail: string, discount?: number | null, images: Array<string>, createdDate: any, updatedDate: any, category: { __typename?: 'Category', id: string, name: string }, user: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, isOnline?: boolean | null, createdDate: any, updatedDate: any } } | null } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, isOnline?: boolean | null, createdDate: any, updatedDate: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, isOnline?: boolean | null, createdDate: any, updatedDate: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPasswordInput: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null } };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
  userId: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, isOnline?: boolean | null, createdDate: any, updatedDate: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangePasswordLoggedMutationVariables = Exact<{
  changePasswordLoggedInput: ChangePasswordLoggedInput;
}>;


export type ChangePasswordLoggedMutation = { __typename?: 'Mutation', changePasswordLogged: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type InsertCommentMutationVariables = Exact<{
  insertCommentInput: InsertCommentInput;
}>;


export type InsertCommentMutation = { __typename?: 'Mutation', insertComment: { __typename?: 'CommentMutationResponse', message?: string | null, success: boolean, comment?: { __typename?: 'Comment', text: string, updatedDate: any, status?: string | null, id: string, createdDate: any, user: { __typename?: 'User', username: string, avatar?: string | null } } | null } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'CommentMutationResponse', message?: string | null, success: boolean } };

export type UpdateCommentMutationVariables = Exact<{
  updateCommentInput: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'CommentMutationResponse', message?: string | null, success: boolean, comment?: { __typename?: 'Comment', text: string, updatedDate: any, status?: string | null, id: string, createdDate: any, user: { __typename?: 'User', username: string, avatar?: string | null } } | null } };

export type ArticlesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type ArticlesQuery = { __typename?: 'Query', articles?: { __typename?: 'PaginatedArticles', totalCount: number, cursor: any, hasMore: boolean, paginatedArticles: Array<{ __typename?: 'Article', id: string, title: string, description: string, price?: number | null, productName: string, thumbnail: string, discount?: number | null, images: Array<string>, createdDate: any, updatedDate: any, category: { __typename?: 'Category', id: string, name: string }, user: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, isOnline?: boolean | null, createdDate: any, updatedDate: any } }> } | null };

export type ArticleQueryVariables = Exact<{
  findArticleInput: FindArticleInput;
}>;


export type ArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: string, title: string, description: string, price?: number | null, productName: string, thumbnail: string, discount?: number | null, images: Array<string>, createdDate: any, updatedDate: any, category: { __typename?: 'Category', id: string, name: string }, user: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, isOnline?: boolean | null, createdDate: any, updatedDate: any } } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, isOnline?: boolean | null, createdDate: any, updatedDate: any } | null };

export type CommentListByArticleIdQueryVariables = Exact<{
  limit: Scalars['Int'];
  articleId: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type CommentListByArticleIdQuery = { __typename?: 'Query', commentListByArticleId?: { __typename?: 'PaginatedComments', cursor: any, totalCount: number, hasMore: boolean, paginatedComments: Array<{ __typename?: 'Comment', text: string, updatedDate: any, status?: string | null, id: string, createdDate: any, user: { __typename?: 'User', id: string, username: string, avatar?: string | null } }> } | null };

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
  price
  productName
  thumbnail
  discount
  images
  category {
    id
    name
  }
  user {
    ...user
  }
  createdDate
  updatedDate
}
    ${UserFragmentDoc}`;
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
${ErrorsFragmentDoc}`;
export const InsertArticleDocument = gql`
    mutation InsertArticle($insertArticleInput: InsertArticleInput!) {
  insertArticle(insertArticleInput: $insertArticleInput) {
    article {
      ...article
    }
    message
    success
  }
}
    ${ArticleFragmentDoc}`;
export type InsertArticleMutationFn = Apollo.MutationFunction<InsertArticleMutation, InsertArticleMutationVariables>;

/**
 * __useInsertArticleMutation__
 *
 * To run a mutation, you first call `useInsertArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertArticleMutation, { data, loading, error }] = useInsertArticleMutation({
 *   variables: {
 *      insertArticleInput: // value for 'insertArticleInput'
 *   },
 * });
 */
export function useInsertArticleMutation(baseOptions?: Apollo.MutationHookOptions<InsertArticleMutation, InsertArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertArticleMutation, InsertArticleMutationVariables>(InsertArticleDocument, options);
      }
export type InsertArticleMutationHookResult = ReturnType<typeof useInsertArticleMutation>;
export type InsertArticleMutationResult = Apollo.MutationResult<InsertArticleMutation>;
export type InsertArticleMutationOptions = Apollo.BaseMutationOptions<InsertArticleMutation, InsertArticleMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
  forgotPassword(forgotPasswordInput: $forgotPasswordInput) {
    code
    success
    message
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

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
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($changePasswordInput: ChangePasswordInput!, $userId: String!, $token: String!) {
  changePassword(
    changePasswordInput: $changePasswordInput
    userId: $userId
    token: $token
  ) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

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
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangePasswordLoggedDocument = gql`
    mutation ChangePasswordLogged($changePasswordLoggedInput: ChangePasswordLoggedInput!) {
  changePasswordLogged(changePasswordLoggedInput: $changePasswordLoggedInput) {
    code
    success
    message
    errors {
      ...errors
    }
  }
}
    ${ErrorsFragmentDoc}`;
export type ChangePasswordLoggedMutationFn = Apollo.MutationFunction<ChangePasswordLoggedMutation, ChangePasswordLoggedMutationVariables>;

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
export function useChangePasswordLoggedMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordLoggedMutation, ChangePasswordLoggedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordLoggedMutation, ChangePasswordLoggedMutationVariables>(ChangePasswordLoggedDocument, options);
      }
export type ChangePasswordLoggedMutationHookResult = ReturnType<typeof useChangePasswordLoggedMutation>;
export type ChangePasswordLoggedMutationResult = Apollo.MutationResult<ChangePasswordLoggedMutation>;
export type ChangePasswordLoggedMutationOptions = Apollo.BaseMutationOptions<ChangePasswordLoggedMutation, ChangePasswordLoggedMutationVariables>;
export const InsertCommentDocument = gql`
    mutation InsertComment($insertCommentInput: InsertCommentInput!) {
  insertComment(insertCommentInput: $insertCommentInput) {
    message
    success
    comment {
      text
      user {
        username
        avatar
      }
      updatedDate
      status
      id
      createdDate
    }
  }
}
    `;
export type InsertCommentMutationFn = Apollo.MutationFunction<InsertCommentMutation, InsertCommentMutationVariables>;

/**
 * __useInsertCommentMutation__
 *
 * To run a mutation, you first call `useInsertCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertCommentMutation, { data, loading, error }] = useInsertCommentMutation({
 *   variables: {
 *      insertCommentInput: // value for 'insertCommentInput'
 *   },
 * });
 */
export function useInsertCommentMutation(baseOptions?: Apollo.MutationHookOptions<InsertCommentMutation, InsertCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertCommentMutation, InsertCommentMutationVariables>(InsertCommentDocument, options);
      }
export type InsertCommentMutationHookResult = ReturnType<typeof useInsertCommentMutation>;
export type InsertCommentMutationResult = Apollo.MutationResult<InsertCommentMutation>;
export type InsertCommentMutationOptions = Apollo.BaseMutationOptions<InsertCommentMutation, InsertCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentId: String!) {
  deleteComment(id: $deleteCommentId) {
    message
    success
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      deleteCommentId: // value for 'deleteCommentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {
  updateComment(updateCommentInput: $updateCommentInput) {
    message
    success
    comment {
      text
      user {
        username
        avatar
      }
      updatedDate
      status
      id
      createdDate
    }
  }
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      updateCommentInput: // value for 'updateCommentInput'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const ArticlesDocument = gql`
    query Articles($limit: Int!, $cursor: String) {
  articles(limit: $limit, cursor: $cursor) {
    totalCount
    cursor
    hasMore
    paginatedArticles {
      ...article
    }
  }
}
    ${ArticleFragmentDoc}`;

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
export function useArticlesQuery(baseOptions: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
export const ArticleDocument = gql`
    query Article($findArticleInput: FindArticleInput!) {
  article(findArticleInput: $findArticleInput) {
    ...article
  }
}
    ${ArticleFragmentDoc}`;

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
export function useArticleQuery(baseOptions: Apollo.QueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
      }
export function useArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
        }
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleQueryResult = Apollo.QueryResult<ArticleQuery, ArticleQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...user
  }
}
    ${UserFragmentDoc}`;

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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CommentListByArticleIdDocument = gql`
    query CommentListByArticleId($limit: Int!, $articleId: String!, $cursor: String) {
  commentListByArticleId(limit: $limit, articleId: $articleId, cursor: $cursor) {
    paginatedComments {
      text
      user {
        id
        username
        avatar
      }
      updatedDate
      status
      id
      createdDate
    }
    cursor
    totalCount
    hasMore
  }
}
    `;

/**
 * __useCommentListByArticleIdQuery__
 *
 * To run a query within a React component, call `useCommentListByArticleIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentListByArticleIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentListByArticleIdQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      articleId: // value for 'articleId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCommentListByArticleIdQuery(baseOptions: Apollo.QueryHookOptions<CommentListByArticleIdQuery, CommentListByArticleIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentListByArticleIdQuery, CommentListByArticleIdQueryVariables>(CommentListByArticleIdDocument, options);
      }
export function useCommentListByArticleIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentListByArticleIdQuery, CommentListByArticleIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentListByArticleIdQuery, CommentListByArticleIdQueryVariables>(CommentListByArticleIdDocument, options);
        }
export type CommentListByArticleIdQueryHookResult = ReturnType<typeof useCommentListByArticleIdQuery>;
export type CommentListByArticleIdLazyQueryHookResult = ReturnType<typeof useCommentListByArticleIdLazyQuery>;
export type CommentListByArticleIdQueryResult = Apollo.QueryResult<CommentListByArticleIdQuery, CommentListByArticleIdQueryVariables>;