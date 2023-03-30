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
  categories: Array<Category>;
  createdDate: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  productName: Scalars['String'];
  status: Scalars['String'];
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

export type ArticlesResponse = {
  __typename?: 'ArticlesResponse';
  articles: Array<Article>;
  pagination: Pagination;
};

export type Category = {
  __typename?: 'Category';
  createdDate: Scalars['DateTime'];
  id: Scalars['ID'];
  image: Scalars['String'];
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

export type Conversation = {
  __typename?: 'Conversation';
  createdDate: Scalars['DateTime'];
  id: Scalars['ID'];
  members: Array<User>;
  updatedDate: Scalars['DateTime'];
};

export type ConversationMutationResponse = IMutationResponse & {
  __typename?: 'ConversationMutationResponse';
  code: Scalars['Float'];
  conversation?: Maybe<Conversation>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteArticleInput = {
  id: Scalars['String'];
};

export type Favorite = {
  __typename?: 'Favorite';
  article: Article;
  createdDate: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedDate: Scalars['DateTime'];
  user: User;
};

export type FavoriteMutationResponse = IMutationResponse & {
  __typename?: 'FavoriteMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  favorite?: Maybe<Favorite>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
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
  categoryIds: Array<Scalars['String']>;
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  productName: Scalars['String'];
  title: Scalars['String'];
};

export type InsertCommentInput = {
  articleId: Scalars['String'];
  text: Scalars['String'];
};

export type InsertMessageInput = {
  conversationId: Scalars['String'];
  senderId: Scalars['String'];
  text: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  conversationId: Scalars['String'];
  createdDate: Scalars['DateTime'];
  id: Scalars['ID'];
  sender: User;
  status: Scalars['String'];
  text: Scalars['String'];
  updatedDate: Scalars['DateTime'];
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
  addToFavorite: FavoriteMutationResponse;
  changePassword: UserMutationResponse;
  changePasswordLogged: UserMutationResponse;
  changeStatusArticle: ArticleMutationResponse;
  changeStatusUser: UserMutationResponse;
  deleteArticle: ArticleMutationResponse;
  deleteComment: CommentMutationResponse;
  deleteUser: UserMutationResponse;
  forgotPassword: UserMutationResponse;
  insertArticle: ArticleMutationResponse;
  insertCategory: CategoryMutationResponse;
  insertComment: CommentMutationResponse;
  insertRole: RoleMutationResponse;
  insertUserRole: UserMutationResponse;
  login: UserMutationResponse;
  loginDashboardAdmin: UserMutationResponse;
  logout: Scalars['Boolean'];
  newConversation: ConversationMutationResponse;
  newMessage: MessageMutationResponse;
  ratingUser: UserMutationResponse;
  register: UserMutationResponse;
  removeFromFavorite: FavoriteMutationResponse;
  removeMessage: MessageMutationResponse;
  updateArticle: ArticleMutationResponse;
  updateCategory: CategoryMutationResponse;
  updateComment: CommentMutationResponse;
  updateMessage: MessageMutationResponse;
  updateProfile: UserMutationResponse;
};


export type MutationAddToFavoriteArgs = {
  articleId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationChangePasswordLoggedArgs = {
  changePasswordLoggedInput: ChangePasswordLoggedInput;
};


export type MutationChangeStatusArticleArgs = {
  articleId: Scalars['String'];
  status: Scalars['String'];
};


export type MutationChangeStatusUserArgs = {
  status: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeleteArticleArgs = {
  deleteArticleInput: DeleteArticleInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationInsertArticleArgs = {
  insertArticleInput: InsertArticleInput;
};


export type MutationInsertCategoryArgs = {
  image: Scalars['String'];
  name: Scalars['String'];
};


export type MutationInsertCommentArgs = {
  insertCommentInput: InsertCommentInput;
};


export type MutationInsertRoleArgs = {
  name: Scalars['String'];
};


export type MutationInsertUserRoleArgs = {
  roleId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationLoginDashboardAdminArgs = {
  loginInput: LoginInput;
};


export type MutationNewConversationArgs = {
  userId: Scalars['String'];
};


export type MutationNewMessageArgs = {
  insertMessageInput: InsertMessageInput;
};


export type MutationRatingUserArgs = {
  ratingNumber: Scalars['Float'];
  userId: Scalars['String'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationRemoveFromFavoriteArgs = {
  articleId: Array<Scalars['String']>;
};


export type MutationRemoveMessageArgs = {
  messageId: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  updateArticleInput: UpdateArticleInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdateMessageArgs = {
  messageId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  paginatedComments: Array<Comment>;
  totalCount: Scalars['Float'];
};

export type Pagination = {
  __typename?: 'Pagination';
  limit: Scalars['Float'];
  page: Scalars['Float'];
  page_size: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles: ResponseSuccess;
  categories?: Maybe<Array<Category>>;
  commentListByArticleId?: Maybe<PaginatedComments>;
  favorites?: Maybe<Array<Favorite>>;
  getAllUser: Array<User>;
  getConversation?: Maybe<Conversation>;
  getConversations: Array<Conversation>;
  getUserRoles: Array<UserRole>;
  isFavorite: Scalars['Boolean'];
  me?: Maybe<User>;
  messages?: Maybe<Array<Message>>;
  roles?: Maybe<Array<Role>>;
};


export type QueryArticleArgs = {
  id: Scalars['String'];
};


export type QueryArticlesArgs = {
  queryConfig: QueryConfig;
};


export type QueryCommentListByArticleIdArgs = {
  articleId: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetConversationArgs = {
  userId: Scalars['String'];
};


export type QueryIsFavoriteArgs = {
  articleId: Scalars['String'];
};


export type QueryMessagesArgs = {
  conversationId: Scalars['String'];
};

export type QueryConfig = {
  categories?: InputMaybe<Array<Scalars['String']>>;
  isFree?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['String']>;
  order_by?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['String']>;
  price_max?: InputMaybe<Scalars['String']>;
  price_min?: InputMaybe<Scalars['String']>;
  sort_by?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type RegisterInput = {
  address?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type ResponseSuccess = {
  __typename?: 'ResponseSuccess';
  data?: Maybe<ArticlesResponse>;
  message: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  createdDate: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedDate: Scalars['DateTime'];
};

export type RoleMutationResponse = IMutationResponse & {
  __typename?: 'RoleMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  success: Scalars['Boolean'];
};

export type UpdateArticleInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateCategoryInput = {
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateCommentInput = {
  id: Scalars['String'];
  text: Scalars['String'];
};

export type UpdateProfileInput = {
  address?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
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
  phoneNumber?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  roles: Array<UserRole>;
  status: Scalars['String'];
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

export type UserRole = {
  __typename?: 'UserRole';
  createdDate: Scalars['DateTime'];
  role: Role;
  roleId: Scalars['ID'];
  updatedDate: Scalars['DateTime'];
  user: User;
  userId: Scalars['ID'];
};

export type ArticleFragment = { __typename?: 'Article', id: string, title: string, description: string, price?: number | null, productName: string, thumbnail: string, images: Array<string>, createdDate: any, updatedDate: any, categories: Array<{ __typename?: 'Category', id: string, name: string }>, user: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, createdDate: any, updatedDate: any } };

export type UserFragment = { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, createdDate: any, updatedDate: any };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, createdDate: any, updatedDate: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ErrorsFragment = { __typename?: 'FieldError', field: string, message: string };

export type InsertArticleMutationVariables = Exact<{
  insertArticleInput: InsertArticleInput;
}>;


export type InsertArticleMutation = { __typename?: 'Mutation', insertArticle: { __typename?: 'ArticleMutationResponse', message?: string | null, success: boolean, article?: { __typename?: 'Article', id: string, title: string, description: string, price?: number | null, productName: string, thumbnail: string, images: Array<string>, createdDate: any, updatedDate: any, categories: Array<{ __typename?: 'Category', id: string, name: string }>, user: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, createdDate: any, updatedDate: any } } | null } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, createdDate: any, updatedDate: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, createdDate: any, updatedDate: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

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


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, createdDate: any, updatedDate: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

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

export type AddToFavoriteMutationVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type AddToFavoriteMutation = { __typename?: 'Mutation', addToFavorite: { __typename?: 'FavoriteMutationResponse', code: number, success: boolean, message?: string | null, favorite?: { __typename?: 'Favorite', id: string } | null } };

export type RemoveFromFavoriteMutationVariables = Exact<{
  articleId: Array<Scalars['String']> | Scalars['String'];
}>;


export type RemoveFromFavoriteMutation = { __typename?: 'Mutation', removeFromFavorite: { __typename?: 'FavoriteMutationResponse', message?: string | null, code: number, success: boolean, favorite?: { __typename?: 'Favorite', id: string } | null } };

export type UpdateProfileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'UserMutationResponse', success: boolean, message?: string | null, user?: { __typename?: 'User', username: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null } | null } };

export type ArticlesQueryVariables = Exact<{
  queryConfig: QueryConfig;
}>;


export type ArticlesQuery = { __typename?: 'Query', articles: { __typename?: 'ResponseSuccess', data?: { __typename?: 'ArticlesResponse', articles: Array<{ __typename?: 'Article', id: string, title: string, description: string, price?: number | null, productName: string, thumbnail: string, images: Array<string>, createdDate: any, updatedDate: any, categories: Array<{ __typename?: 'Category', id: string, name: string }>, user: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, createdDate: any, updatedDate: any } }>, pagination: { __typename?: 'Pagination', page: number, limit: number, page_size: number } } | null } };

export type ArticleQueryVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type ArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: string, title: string, description: string, price?: number | null, productName: string, thumbnail: string, images: Array<string>, createdDate: any, updatedDate: any, categories: Array<{ __typename?: 'Category', id: string, name: string }>, user: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, createdDate: any, updatedDate: any } } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string, address?: string | null, phoneNumber?: string | null, fullName: string, birthday?: string | null, avatar?: string | null, createdDate: any, updatedDate: any } | null };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null };

export type CommentListByArticleIdQueryVariables = Exact<{
  limit: Scalars['Int'];
  articleId: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type CommentListByArticleIdQuery = { __typename?: 'Query', commentListByArticleId?: { __typename?: 'PaginatedComments', cursor: any, totalCount: number, hasMore: boolean, paginatedComments: Array<{ __typename?: 'Comment', text: string, updatedDate: any, status?: string | null, id: string, createdDate: any, user: { __typename?: 'User', id: string, username: string, avatar?: string | null } }> } | null };

export type IsFavoriteQueryVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type IsFavoriteQuery = { __typename?: 'Query', isFavorite: boolean };

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
  images
  categories {
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
export const AddToFavoriteDocument = gql`
    mutation AddToFavorite($articleId: String!) {
  addToFavorite(articleId: $articleId) {
    code
    success
    message
    favorite {
      id
    }
  }
}
    `;
export type AddToFavoriteMutationFn = Apollo.MutationFunction<AddToFavoriteMutation, AddToFavoriteMutationVariables>;

/**
 * __useAddToFavoriteMutation__
 *
 * To run a mutation, you first call `useAddToFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToFavoriteMutation, { data, loading, error }] = useAddToFavoriteMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useAddToFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<AddToFavoriteMutation, AddToFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToFavoriteMutation, AddToFavoriteMutationVariables>(AddToFavoriteDocument, options);
      }
export type AddToFavoriteMutationHookResult = ReturnType<typeof useAddToFavoriteMutation>;
export type AddToFavoriteMutationResult = Apollo.MutationResult<AddToFavoriteMutation>;
export type AddToFavoriteMutationOptions = Apollo.BaseMutationOptions<AddToFavoriteMutation, AddToFavoriteMutationVariables>;
export const RemoveFromFavoriteDocument = gql`
    mutation RemoveFromFavorite($articleId: [String!]!) {
  removeFromFavorite(articleId: $articleId) {
    message
    code
    success
    favorite {
      id
    }
  }
}
    `;
export type RemoveFromFavoriteMutationFn = Apollo.MutationFunction<RemoveFromFavoriteMutation, RemoveFromFavoriteMutationVariables>;

/**
 * __useRemoveFromFavoriteMutation__
 *
 * To run a mutation, you first call `useRemoveFromFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromFavoriteMutation, { data, loading, error }] = useRemoveFromFavoriteMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useRemoveFromFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromFavoriteMutation, RemoveFromFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromFavoriteMutation, RemoveFromFavoriteMutationVariables>(RemoveFromFavoriteDocument, options);
      }
export type RemoveFromFavoriteMutationHookResult = ReturnType<typeof useRemoveFromFavoriteMutation>;
export type RemoveFromFavoriteMutationResult = Apollo.MutationResult<RemoveFromFavoriteMutation>;
export type RemoveFromFavoriteMutationOptions = Apollo.BaseMutationOptions<RemoveFromFavoriteMutation, RemoveFromFavoriteMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {
  updateProfile(updateProfileInput: $updateProfileInput) {
    success
    message
    user {
      username
      address
      phoneNumber
      fullName
      birthday
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      updateProfileInput: // value for 'updateProfileInput'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const ArticlesDocument = gql`
    query Articles($queryConfig: QueryConfig!) {
  articles(queryConfig: $queryConfig) {
    data {
      articles {
        ...article
      }
      pagination {
        page
        limit
        page_size
      }
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
 *      queryConfig: // value for 'queryConfig'
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
    query Article($articleId: String!) {
  article(id: $articleId) {
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
 *      articleId: // value for 'articleId'
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
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    name
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
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
export const IsFavoriteDocument = gql`
    query IsFavorite($articleId: String!) {
  isFavorite(articleId: $articleId)
}
    `;

/**
 * __useIsFavoriteQuery__
 *
 * To run a query within a React component, call `useIsFavoriteQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsFavoriteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsFavoriteQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useIsFavoriteQuery(baseOptions: Apollo.QueryHookOptions<IsFavoriteQuery, IsFavoriteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsFavoriteQuery, IsFavoriteQueryVariables>(IsFavoriteDocument, options);
      }
export function useIsFavoriteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsFavoriteQuery, IsFavoriteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsFavoriteQuery, IsFavoriteQueryVariables>(IsFavoriteDocument, options);
        }
export type IsFavoriteQueryHookResult = ReturnType<typeof useIsFavoriteQuery>;
export type IsFavoriteLazyQueryHookResult = ReturnType<typeof useIsFavoriteLazyQuery>;
export type IsFavoriteQueryResult = Apollo.QueryResult<IsFavoriteQuery, IsFavoriteQueryVariables>;