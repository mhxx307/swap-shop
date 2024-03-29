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
    address: Scalars['String'];
    categories: Array<Category>;
    createdDate: Scalars['DateTime'];
    description: Scalars['String'];
    favoritesCount: Scalars['Float'];
    id: Scalars['ID'];
    images: Array<Scalars['String']>;
    isClosed: Scalars['Boolean'];
    price: Scalars['String'];
    productName: Scalars['String'];
    reportsCount: Scalars['Float'];
    status: Scalars['String'];
    thumbnail: Scalars['String'];
    title: Scalars['String'];
    updatedDate: Scalars['DateTime'];
    user: User;
    views: Scalars['Float'];
};

export type ArticleMutationResponse = IMutationResponse & {
    __typename?: 'ArticleMutationResponse';
    article?: Maybe<Article>;
    code: Scalars['Float'];
    errors?: Maybe<Array<FieldError>>;
    message?: Maybe<Scalars['String']>;
    success: Scalars['Boolean'];
};

export type ArticleResponseSuccess = {
    __typename?: 'ArticleResponseSuccess';
    data?: Maybe<ArticlesResponse>;
    message: Scalars['String'];
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
    article: Article;
    createdDate: Scalars['DateTime'];
    id: Scalars['ID'];
    member1: User;
    member2: User;
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
    address: Scalars['String'];
    categoryIds: Array<Scalars['String']>;
    description: Scalars['String'];
    images: Array<Scalars['String']>;
    price?: Scalars['String'];
    productName: Scalars['String'];
    title: Scalars['String'];
};

export type InsertCommentInput = {
    articleId: Scalars['String'];
    text: Scalars['String'];
};

export type InsertMessageInput = {
    conversationId: Scalars['String'];
    images?: InputMaybe<Array<Scalars['String']>>;
    senderId: Scalars['String'];
    text?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
    password: Scalars['String'];
    usernameOrEmail: Scalars['String'];
};

export type Message = {
    __typename?: 'Message';
    conversation: Conversation;
    conversationId: Scalars['String'];
    createdDate: Scalars['DateTime'];
    id: Scalars['ID'];
    images?: Maybe<Array<Scalars['String']>>;
    sender: User;
    status: Scalars['String'];
    text?: Maybe<Scalars['String']>;
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
    cancelReport: ReportMutationResponse;
    changeNotification: NotificationMutationResponse;
    changePassword: UserMutationResponse;
    changePasswordLogged: UserMutationResponse;
    changeStatusArticle: ArticleMutationResponse;
    changeStatusUser: UserMutationResponse;
    closedArticle: ArticleMutationResponse;
    deleteArticle: ArticleMutationResponse;
    deleteComment: CommentMutationResponse;
    deleteNotifications: NotificationMutationResponse;
    deleteReview: ReviewMutationResponse;
    deleteUser: UserMutationResponse;
    forgotPassword: UserMutationResponse;
    insertArticle: ArticleMutationResponse;
    insertCategory: CategoryMutationResponse;
    insertComment: CommentMutationResponse;
    insertMessage: MessageMutationResponse;
    insertRole: RoleMutationResponse;
    insertUserRole: UserMutationResponse;
    login: UserMutationResponse;
    loginDashboardAdmin: UserMutationResponse;
    logout: Scalars['Boolean'];
    newConversation: ConversationMutationResponse;
    pushNotification: NotificationMutationResponse;
    pushPrivateNotification: NotificationMutationResponse;
    register: UserMutationResponse;
    removeFromConversation: ConversationMutationResponse;
    removeFromFavorite: FavoriteMutationResponse;
    removeMessage: MessageMutationResponse;
    report: ReportMutationResponse;
    reviewUser: ReviewMutationResponse;
    updateArticle: ArticleMutationResponse;
    updateCategory: CategoryMutationResponse;
    updateComment: CommentMutationResponse;
    updateMessage: MessageMutationResponse;
    updateProfile: UserMutationResponse;
    uploadAvatarProfile: UserMutationResponse;
    verifyEmail: UserMutationResponse;
};

export type MutationAddToFavoriteArgs = {
    articleId: Scalars['String'];
};

export type MutationCancelReportArgs = {
    articleIds: Array<Scalars['String']>;
};

export type MutationChangeNotificationArgs = {
    content: Scalars['String'];
    notificationId: Scalars['String'];
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

export type MutationClosedArticleArgs = {
    articleId: Scalars['String'];
};

export type MutationDeleteArticleArgs = {
    deleteArticleInput: DeleteArticleInput;
};

export type MutationDeleteCommentArgs = {
    id: Scalars['String'];
};

export type MutationDeleteNotificationsArgs = {
    ids: Array<Scalars['String']>;
};

export type MutationDeleteReviewArgs = {
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

export type MutationInsertMessageArgs = {
    insertMessageInput: InsertMessageInput;
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
    articleId: Scalars['String'];
    userId: Scalars['String'];
};

export type MutationPushNotificationArgs = {
    content: Scalars['String'];
};

export type MutationPushPrivateNotificationArgs = {
    content: Scalars['String'];
    recipientId: Scalars['String'];
};

export type MutationRegisterArgs = {
    registerInput: RegisterInput;
};

export type MutationRemoveFromConversationArgs = {
    conversationIds: Array<Scalars['String']>;
};

export type MutationRemoveFromFavoriteArgs = {
    articleIds: Array<Scalars['String']>;
};

export type MutationRemoveMessageArgs = {
    messageId: Scalars['String'];
};

export type MutationReportArgs = {
    articleId: Scalars['String'];
    description: Scalars['String'];
    reason: Scalars['String'];
};

export type MutationReviewUserArgs = {
    reviewUserInput: ReviewUserInput;
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

export type MutationUploadAvatarProfileArgs = {
    imageUrl: Scalars['String'];
};

export type MutationVerifyEmailArgs = {
    token: Scalars['String'];
    userId: Scalars['String'];
};

export type Notification = {
    __typename?: 'Notification';
    content: Scalars['String'];
    createdDate: Scalars['DateTime'];
    id: Scalars['ID'];
    updatedDate: Scalars['DateTime'];
    user: User;
    userId?: Maybe<Scalars['String']>;
};

export type NotificationMutationResponse = IMutationResponse & {
    __typename?: 'NotificationMutationResponse';
    code: Scalars['Float'];
    errors?: Maybe<Array<FieldError>>;
    message?: Maybe<Scalars['String']>;
    notification?: Maybe<Notification>;
    success: Scalars['Boolean'];
};

export type OptionsUser = {
    limit?: InputMaybe<Scalars['String']>;
    order_by?: InputMaybe<Scalars['String']>;
    sort_by?: InputMaybe<Scalars['String']>;
};

export type PaginatedComments = {
    __typename?: 'PaginatedComments';
    cursor?: Maybe<Scalars['DateTime']>;
    hasMore: Scalars['Boolean'];
    paginatedComments?: Maybe<Array<Comment>>;
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
    articles: ArticleResponseSuccess;
    categories?: Maybe<Array<Category>>;
    commentListByArticleId?: Maybe<PaginatedComments>;
    countFavoritesForArticle?: Maybe<Scalars['Float']>;
    countReportsForArticle?: Maybe<Scalars['Float']>;
    favorites?: Maybe<Array<Favorite>>;
    getAllUser?: Maybe<Array<User>>;
    getConversation?: Maybe<Conversation>;
    getConversations?: Maybe<Array<Conversation>>;
    getTopUser?: Maybe<Array<User>>;
    getUserById?: Maybe<User>;
    getUserRoles: Array<UserRole>;
    getUsersByName?: Maybe<Array<User>>;
    isFavorite: Scalars['Boolean'];
    me?: Maybe<User>;
    messages?: Maybe<Array<Message>>;
    notifications?: Maybe<Array<Notification>>;
    notificationsPublic?: Maybe<Array<Notification>>;
    reports?: Maybe<Array<Report>>;
    reviews: ReviewResponseSuccess;
    roles?: Maybe<Array<Role>>;
};

export type QueryArticleArgs = {
    articleId: Scalars['String'];
};

export type QueryArticlesArgs = {
    queryConfig: QueryConfig;
};

export type QueryCommentListByArticleIdArgs = {
    articleId: Scalars['String'];
    cursor?: InputMaybe<Scalars['String']>;
    limit: Scalars['Int'];
};

export type QueryCountFavoritesForArticleArgs = {
    articleId: Scalars['String'];
};

export type QueryCountReportsForArticleArgs = {
    articleId: Scalars['String'];
};

export type QueryGetConversationArgs = {
    articleId: Scalars['String'];
    userId: Scalars['String'];
};

export type QueryGetTopUserArgs = {
    optionsUser: OptionsUser;
};

export type QueryGetUserByIdArgs = {
    userId: Scalars['String'];
};

export type QueryGetUsersByNameArgs = {
    name: Scalars['String'];
};

export type QueryIsFavoriteArgs = {
    articleId: Scalars['String'];
};

export type QueryMessagesArgs = {
    conversationId: Scalars['String'];
};

export type QueryReviewsArgs = {
    reviewOptions: ReviewOptions;
};

export type QueryConfig = {
    all?: InputMaybe<Scalars['Boolean']>;
    categories?: InputMaybe<Array<Scalars['String']>>;
    end_date?: InputMaybe<Scalars['String']>;
    limit?: InputMaybe<Scalars['String']>;
    order_by?: InputMaybe<Scalars['String']>;
    page?: InputMaybe<Scalars['String']>;
    price_max?: InputMaybe<Scalars['String']>;
    price_min?: InputMaybe<Scalars['String']>;
    sort_by?: InputMaybe<Scalars['String']>;
    start_date?: InputMaybe<Scalars['String']>;
    status?: InputMaybe<Scalars['String']>;
    title?: InputMaybe<Scalars['String']>;
    userId?: InputMaybe<Scalars['String']>;
    user_rating?: InputMaybe<Scalars['String']>;
};

export type RegisterInput = {
    email: Scalars['String'];
    fullName: Scalars['String'];
    password: Scalars['String'];
    username: Scalars['String'];
};

export type Report = {
    __typename?: 'Report';
    article: Article;
    createdDate: Scalars['DateTime'];
    description: Scalars['String'];
    id: Scalars['ID'];
    reason: Scalars['String'];
    updatedDate: Scalars['DateTime'];
    user: User;
};

export type ReportMutationResponse = IMutationResponse & {
    __typename?: 'ReportMutationResponse';
    code: Scalars['Float'];
    errors?: Maybe<Array<FieldError>>;
    message?: Maybe<Scalars['String']>;
    report?: Maybe<Report>;
    success: Scalars['Boolean'];
};

export type Review = {
    __typename?: 'Review';
    assessor: User;
    content: Scalars['String'];
    createdDate: Scalars['DateTime'];
    id: Scalars['ID'];
    rating: Scalars['Float'];
    updatedDate: Scalars['DateTime'];
    user: User;
};

export type ReviewMutationResponse = IMutationResponse & {
    __typename?: 'ReviewMutationResponse';
    code: Scalars['Float'];
    errors?: Maybe<Array<FieldError>>;
    message?: Maybe<Scalars['String']>;
    review?: Maybe<Review>;
    success: Scalars['Boolean'];
};

export type ReviewOptions = {
    limit?: InputMaybe<Scalars['String']>;
    page?: InputMaybe<Scalars['String']>;
    userId?: InputMaybe<Scalars['String']>;
};

export type ReviewResponseSuccess = {
    __typename?: 'ReviewResponseSuccess';
    data?: Maybe<ReviewsResponse>;
    message: Scalars['String'];
};

export type ReviewUserInput = {
    content: Scalars['String'];
    rating: Scalars['Float'];
    userId: Scalars['String'];
};

export type ReviewsResponse = {
    __typename?: 'ReviewsResponse';
    pagination: Pagination;
    reviews: Array<Review>;
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

export type Subscription = {
    __typename?: 'Subscription';
    deletedMessage: MessageMutationResponse;
    messageIncoming: MessageMutationResponse;
    newNotification: NotificationMutationResponse;
    newNotificationPrivate: NotificationMutationResponse;
    updateNotification: NotificationMutationResponse;
    updatedMessage: MessageMutationResponse;
};

export type SubscriptionNewNotificationPrivateArgs = {
    userId: Scalars['String'];
};

export type UpdateArticleInput = {
    address: Scalars['String'];
    categoryIds: Array<Scalars['String']>;
    description: Scalars['String'];
    id: Scalars['String'];
    images: Array<Scalars['String']>;
    price?: Scalars['String'];
    productName: Scalars['String'];
    status: Scalars['String'];
    title: Scalars['String'];
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
    isVerified: Scalars['Boolean'];
    phoneNumber?: Maybe<Scalars['String']>;
    rating: Scalars['Float'];
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

export type ArticleFragment = {
    __typename?: 'Article';
    id: string;
    title: string;
    description: string;
    price: string;
    productName: string;
    thumbnail: string;
    images: Array<string>;
    views: number;
    status: string;
    favoritesCount: number;
    address: string;
    createdDate: any;
    updatedDate: any;
    isClosed: boolean;
    categories: Array<{ __typename?: 'Category'; id: string; name: string }>;
    user: {
        __typename?: 'User';
        id: string;
        username: string;
        email: string;
        address?: string | null;
        phoneNumber?: string | null;
        fullName: string;
        birthday?: string | null;
        avatar?: string | null;
        createdDate: any;
        updatedDate: any;
        status: string;
        rating: number;
    };
};

export type UserFragment = {
    __typename?: 'User';
    id: string;
    username: string;
    email: string;
    address?: string | null;
    phoneNumber?: string | null;
    fullName: string;
    birthday?: string | null;
    avatar?: string | null;
    createdDate: any;
    updatedDate: any;
    status: string;
    rating: number;
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
        address?: string | null;
        phoneNumber?: string | null;
        fullName: string;
        birthday?: string | null;
        avatar?: string | null;
        createdDate: any;
        updatedDate: any;
        status: string;
        rating: number;
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

export type InsertArticleMutationVariables = Exact<{
    insertArticleInput: InsertArticleInput;
}>;

export type InsertArticleMutation = {
    __typename?: 'Mutation';
    insertArticle: {
        __typename?: 'ArticleMutationResponse';
        message?: string | null;
        success: boolean;
        article?: {
            __typename?: 'Article';
            id: string;
            title: string;
            description: string;
            price: string;
            productName: string;
            thumbnail: string;
            images: Array<string>;
            views: number;
            status: string;
            favoritesCount: number;
            address: string;
            createdDate: any;
            updatedDate: any;
            isClosed: boolean;
            categories: Array<{
                __typename?: 'Category';
                id: string;
                name: string;
            }>;
            user: {
                __typename?: 'User';
                id: string;
                username: string;
                email: string;
                address?: string | null;
                phoneNumber?: string | null;
                fullName: string;
                birthday?: string | null;
                avatar?: string | null;
                createdDate: any;
                updatedDate: any;
                status: string;
                rating: number;
            };
        } | null;
    };
};

export type UpdateArticleMutationVariables = Exact<{
    updateArticleInput: UpdateArticleInput;
}>;

export type UpdateArticleMutation = {
    __typename?: 'Mutation';
    updateArticle: {
        __typename?: 'ArticleMutationResponse';
        message?: string | null;
        success: boolean;
        article?: {
            __typename?: 'Article';
            id: string;
            title: string;
            description: string;
            price: string;
            productName: string;
            thumbnail: string;
            images: Array<string>;
            views: number;
            status: string;
            favoritesCount: number;
            address: string;
            createdDate: any;
            updatedDate: any;
            isClosed: boolean;
            categories: Array<{
                __typename?: 'Category';
                id: string;
                name: string;
            }>;
            user: {
                __typename?: 'User';
                id: string;
                username: string;
                email: string;
                address?: string | null;
                phoneNumber?: string | null;
                fullName: string;
                birthday?: string | null;
                avatar?: string | null;
                createdDate: any;
                updatedDate: any;
                status: string;
                rating: number;
            };
        } | null;
    };
};

export type ClosedArticleMutationVariables = Exact<{
    articleId: Scalars['String'];
}>;

export type ClosedArticleMutation = {
    __typename?: 'Mutation';
    closedArticle: {
        __typename?: 'ArticleMutationResponse';
        success: boolean;
        message?: string | null;
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
            address?: string | null;
            phoneNumber?: string | null;
            fullName: string;
            birthday?: string | null;
            avatar?: string | null;
            createdDate: any;
            updatedDate: any;
            status: string;
            rating: number;
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
            address?: string | null;
            phoneNumber?: string | null;
            fullName: string;
            birthday?: string | null;
            avatar?: string | null;
            createdDate: any;
            updatedDate: any;
            status: string;
            rating: number;
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
            address?: string | null;
            phoneNumber?: string | null;
            fullName: string;
            birthday?: string | null;
            avatar?: string | null;
            createdDate: any;
            updatedDate: any;
            status: string;
            rating: number;
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

export type UploadAvatarProfileMutationVariables = Exact<{
    imageUrl: Scalars['String'];
}>;

export type UploadAvatarProfileMutation = {
    __typename?: 'Mutation';
    uploadAvatarProfile: {
        __typename?: 'UserMutationResponse';
        success: boolean;
        message?: string | null;
        user?: {
            __typename?: 'User';
            id: string;
            username: string;
            email: string;
            address?: string | null;
            phoneNumber?: string | null;
            fullName: string;
            birthday?: string | null;
            avatar?: string | null;
            createdDate: any;
            updatedDate: any;
            status: string;
            rating: number;
        } | null;
    };
};

export type VerifyEmailMutationVariables = Exact<{
    userId: Scalars['String'];
    token: Scalars['String'];
}>;

export type VerifyEmailMutation = {
    __typename?: 'Mutation';
    verifyEmail: {
        __typename?: 'UserMutationResponse';
        message?: string | null;
        success: boolean;
        user?: {
            __typename?: 'User';
            id: string;
            username: string;
            email: string;
            address?: string | null;
            phoneNumber?: string | null;
            fullName: string;
            birthday?: string | null;
            avatar?: string | null;
            createdDate: any;
            updatedDate: any;
            status: string;
            rating: number;
        } | null;
    };
};

export type InsertCommentMutationVariables = Exact<{
    insertCommentInput: InsertCommentInput;
}>;

export type InsertCommentMutation = {
    __typename?: 'Mutation';
    insertComment: {
        __typename?: 'CommentMutationResponse';
        message?: string | null;
        success: boolean;
        comment?: {
            __typename?: 'Comment';
            text: string;
            updatedDate: any;
            status?: string | null;
            id: string;
            createdDate: any;
            user: {
                __typename?: 'User';
                username: string;
                avatar?: string | null;
            };
        } | null;
    };
};

export type DeleteCommentMutationVariables = Exact<{
    deleteCommentId: Scalars['String'];
}>;

export type DeleteCommentMutation = {
    __typename?: 'Mutation';
    deleteComment: {
        __typename?: 'CommentMutationResponse';
        message?: string | null;
        success: boolean;
    };
};

export type UpdateCommentMutationVariables = Exact<{
    updateCommentInput: UpdateCommentInput;
}>;

export type UpdateCommentMutation = {
    __typename?: 'Mutation';
    updateComment: {
        __typename?: 'CommentMutationResponse';
        message?: string | null;
        success: boolean;
        comment?: {
            __typename?: 'Comment';
            text: string;
            updatedDate: any;
            status?: string | null;
            id: string;
            createdDate: any;
            user: {
                __typename?: 'User';
                username: string;
                avatar?: string | null;
            };
        } | null;
    };
};

export type NewConversationMutationVariables = Exact<{
    articleId: Scalars['String'];
    userId: Scalars['String'];
}>;

export type NewConversationMutation = {
    __typename?: 'Mutation';
    newConversation: {
        __typename?: 'ConversationMutationResponse';
        success: boolean;
        message?: string | null;
        conversation?: {
            __typename?: 'Conversation';
            id: string;
            createdDate: any;
            updatedDate: any;
            member1: {
                __typename?: 'User';
                username: string;
                id: string;
                avatar?: string | null;
            };
            member2: {
                __typename?: 'User';
                username: string;
                id: string;
                avatar?: string | null;
            };
            article: {
                __typename?: 'Article';
                title: string;
                thumbnail: string;
                productName: string;
                price: string;
                id: string;
                description: string;
            };
        } | null;
    };
};

export type RemoveFromConversationMutationVariables = Exact<{
    conversationIds: Array<Scalars['String']> | Scalars['String'];
}>;

export type RemoveFromConversationMutation = {
    __typename?: 'Mutation';
    removeFromConversation: {
        __typename?: 'ConversationMutationResponse';
        success: boolean;
        message?: string | null;
    };
};

export type AddToFavoriteMutationVariables = Exact<{
    articleId: Scalars['String'];
}>;

export type AddToFavoriteMutation = {
    __typename?: 'Mutation';
    addToFavorite: {
        __typename?: 'FavoriteMutationResponse';
        code: number;
        success: boolean;
        message?: string | null;
        favorite?: { __typename?: 'Favorite'; id: string } | null;
    };
};

export type RemoveFromFavoriteMutationVariables = Exact<{
    articleIds: Array<Scalars['String']> | Scalars['String'];
}>;

export type RemoveFromFavoriteMutation = {
    __typename?: 'Mutation';
    removeFromFavorite: {
        __typename?: 'FavoriteMutationResponse';
        message?: string | null;
        code: number;
        success: boolean;
        favorite?: { __typename?: 'Favorite'; id: string } | null;
    };
};

export type InsertMessageMutationVariables = Exact<{
    insertMessageInput: InsertMessageInput;
}>;

export type InsertMessageMutation = {
    __typename?: 'Mutation';
    insertMessage: {
        __typename?: 'MessageMutationResponse';
        message?: string | null;
        success: boolean;
    };
};

export type RemoveMessageMutationVariables = Exact<{
    messageId: Scalars['String'];
}>;

export type RemoveMessageMutation = {
    __typename?: 'Mutation';
    removeMessage: {
        __typename?: 'MessageMutationResponse';
        message?: string | null;
        success: boolean;
    };
};

export type UpdateMessageMutationVariables = Exact<{
    text: Scalars['String'];
    messageId: Scalars['String'];
}>;

export type UpdateMessageMutation = {
    __typename?: 'Mutation';
    updateMessage: {
        __typename?: 'MessageMutationResponse';
        message?: string | null;
        success: boolean;
    };
};

export type DeleteNotificationsMutationVariables = Exact<{
    ids: Array<Scalars['String']> | Scalars['String'];
}>;

export type DeleteNotificationsMutation = {
    __typename?: 'Mutation';
    deleteNotifications: {
        __typename?: 'NotificationMutationResponse';
        message?: string | null;
        success: boolean;
    };
};

export type PushNotificationMutationVariables = Exact<{
    content: Scalars['String'];
}>;

export type PushNotificationMutation = {
    __typename?: 'Mutation';
    pushNotification: {
        __typename?: 'NotificationMutationResponse';
        message?: string | null;
        success: boolean;
        notification?: {
            __typename?: 'Notification';
            id: string;
            content: string;
            createdDate: any;
            updatedDate: any;
        } | null;
    };
};

export type PushPrivateNotificationMutationVariables = Exact<{
    recipientId: Scalars['String'];
    content: Scalars['String'];
}>;

export type PushPrivateNotificationMutation = {
    __typename?: 'Mutation';
    pushPrivateNotification: {
        __typename?: 'NotificationMutationResponse';
        message?: string | null;
        success: boolean;
        notification?: {
            __typename?: 'Notification';
            id: string;
            content: string;
            userId?: string | null;
            createdDate: any;
            updatedDate: any;
        } | null;
    };
};

export type UpdateProfileMutationVariables = Exact<{
    updateProfileInput: UpdateProfileInput;
}>;

export type UpdateProfileMutation = {
    __typename?: 'Mutation';
    updateProfile: {
        __typename?: 'UserMutationResponse';
        success: boolean;
        message?: string | null;
        user?: {
            __typename?: 'User';
            username: string;
            address?: string | null;
            phoneNumber?: string | null;
            fullName: string;
            birthday?: string | null;
        } | null;
    };
};

export type ReportMutationVariables = Exact<{
    reason: Scalars['String'];
    description: Scalars['String'];
    articleId: Scalars['String'];
}>;

export type ReportMutation = {
    __typename?: 'Mutation';
    report: {
        __typename?: 'ReportMutationResponse';
        success: boolean;
        message?: string | null;
    };
};

export type ReviewUserMutationVariables = Exact<{
    reviewUserInput: ReviewUserInput;
}>;

export type ReviewUserMutation = {
    __typename?: 'Mutation';
    reviewUser: {
        __typename?: 'ReviewMutationResponse';
        message?: string | null;
        success: boolean;
        review?: {
            __typename?: 'Review';
            updatedDate: any;
            id: string;
            createdDate: any;
            content: string;
            user: {
                __typename?: 'User';
                id: string;
                username: string;
                email: string;
                address?: string | null;
                phoneNumber?: string | null;
                fullName: string;
                birthday?: string | null;
                avatar?: string | null;
                createdDate: any;
                updatedDate: any;
                status: string;
                rating: number;
            };
        } | null;
    };
};

export type DeleteReviewMutationVariables = Exact<{
    deleteReviewId: Scalars['String'];
}>;

export type DeleteReviewMutation = {
    __typename?: 'Mutation';
    deleteReview: {
        __typename?: 'ReviewMutationResponse';
        message?: string | null;
        success: boolean;
    };
};

export type ArticlesQueryVariables = Exact<{
    queryConfig: QueryConfig;
}>;

export type ArticlesQuery = {
    __typename?: 'Query';
    articles: {
        __typename?: 'ArticleResponseSuccess';
        data?: {
            __typename?: 'ArticlesResponse';
            articles: Array<{
                __typename?: 'Article';
                id: string;
                title: string;
                description: string;
                price: string;
                productName: string;
                thumbnail: string;
                images: Array<string>;
                views: number;
                status: string;
                favoritesCount: number;
                address: string;
                createdDate: any;
                updatedDate: any;
                isClosed: boolean;
                categories: Array<{
                    __typename?: 'Category';
                    id: string;
                    name: string;
                }>;
                user: {
                    __typename?: 'User';
                    id: string;
                    username: string;
                    email: string;
                    address?: string | null;
                    phoneNumber?: string | null;
                    fullName: string;
                    birthday?: string | null;
                    avatar?: string | null;
                    createdDate: any;
                    updatedDate: any;
                    status: string;
                    rating: number;
                };
            }>;
            pagination: {
                __typename?: 'Pagination';
                page: number;
                limit: number;
                page_size: number;
            };
        } | null;
    };
};

export type ArticleQueryVariables = Exact<{
    articleId: Scalars['String'];
}>;

export type ArticleQuery = {
    __typename?: 'Query';
    article?: {
        __typename?: 'Article';
        id: string;
        title: string;
        description: string;
        price: string;
        productName: string;
        thumbnail: string;
        images: Array<string>;
        views: number;
        status: string;
        favoritesCount: number;
        address: string;
        createdDate: any;
        updatedDate: any;
        isClosed: boolean;
        categories: Array<{
            __typename?: 'Category';
            id: string;
            name: string;
        }>;
        user: {
            __typename?: 'User';
            id: string;
            username: string;
            email: string;
            address?: string | null;
            phoneNumber?: string | null;
            fullName: string;
            birthday?: string | null;
            avatar?: string | null;
            createdDate: any;
            updatedDate: any;
            status: string;
            rating: number;
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
        address?: string | null;
        phoneNumber?: string | null;
        fullName: string;
        birthday?: string | null;
        avatar?: string | null;
        createdDate: any;
        updatedDate: any;
        status: string;
        rating: number;
    } | null;
};

export type UserByIdQueryVariables = Exact<{
    userId: Scalars['String'];
}>;

export type UserByIdQuery = {
    __typename?: 'Query';
    getUserById?: {
        __typename?: 'User';
        id: string;
        username: string;
        email: string;
        address?: string | null;
        phoneNumber?: string | null;
        fullName: string;
        birthday?: string | null;
        avatar?: string | null;
        status: string;
        createdDate: any;
        updatedDate: any;
    } | null;
};

export type GetUsersByNameQueryVariables = Exact<{
    name: Scalars['String'];
}>;

export type GetUsersByNameQuery = {
    __typename?: 'Query';
    getUsersByName?: Array<{
        __typename?: 'User';
        id: string;
        username: string;
        avatar?: string | null;
    }> | null;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
    __typename?: 'Query';
    categories?: Array<{
        __typename?: 'Category';
        id: string;
        name: string;
        image: string;
    }> | null;
};

export type CommentListByArticleIdQueryVariables = Exact<{
    limit: Scalars['Int'];
    articleId: Scalars['String'];
    cursor?: InputMaybe<Scalars['String']>;
}>;

export type CommentListByArticleIdQuery = {
    __typename?: 'Query';
    commentListByArticleId?: {
        __typename?: 'PaginatedComments';
        cursor?: any | null;
        totalCount: number;
        hasMore: boolean;
        paginatedComments?: Array<{
            __typename?: 'Comment';
            text: string;
            updatedDate: any;
            status?: string | null;
            id: string;
            createdDate: any;
            user: {
                __typename?: 'User';
                id: string;
                username: string;
                avatar?: string | null;
                fullName: string;
                rating: number;
            };
        }> | null;
    } | null;
};

export type GetConversationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetConversationsQuery = {
    __typename?: 'Query';
    getConversations?: Array<{
        __typename?: 'Conversation';
        id: string;
        createdDate: any;
        updatedDate: any;
        member1: {
            __typename?: 'User';
            username: string;
            id: string;
            avatar?: string | null;
        };
        member2: {
            __typename?: 'User';
            username: string;
            id: string;
            avatar?: string | null;
        };
        article: {
            __typename?: 'Article';
            id: string;
            productName: string;
            thumbnail: string;
            price: string;
            title: string;
            description: string;
        };
    }> | null;
};

export type GetConversationQueryVariables = Exact<{
    articleId: Scalars['String'];
    userId: Scalars['String'];
}>;

export type GetConversationQuery = {
    __typename?: 'Query';
    getConversation?: {
        __typename?: 'Conversation';
        id: string;
        createdDate: any;
        updatedDate: any;
        member1: {
            __typename?: 'User';
            username: string;
            id: string;
            avatar?: string | null;
        };
        member2: {
            __typename?: 'User';
            username: string;
            id: string;
            avatar?: string | null;
        };
        article: {
            __typename?: 'Article';
            id: string;
            productName: string;
            thumbnail: string;
            price: string;
            title: string;
            description: string;
        };
    } | null;
};

export type IsFavoriteQueryVariables = Exact<{
    articleId: Scalars['String'];
}>;

export type IsFavoriteQuery = { __typename?: 'Query'; isFavorite: boolean };

export type FavoritesQueryVariables = Exact<{ [key: string]: never }>;

export type FavoritesQuery = {
    __typename?: 'Query';
    favorites?: Array<{
        __typename?: 'Favorite';
        id: string;
        article: {
            __typename?: 'Article';
            id: string;
            title: string;
            description: string;
            price: string;
            productName: string;
            thumbnail: string;
            images: Array<string>;
            views: number;
            status: string;
            favoritesCount: number;
            address: string;
            createdDate: any;
            updatedDate: any;
            isClosed: boolean;
            categories: Array<{
                __typename?: 'Category';
                id: string;
                name: string;
            }>;
            user: {
                __typename?: 'User';
                id: string;
                username: string;
                email: string;
                address?: string | null;
                phoneNumber?: string | null;
                fullName: string;
                birthday?: string | null;
                avatar?: string | null;
                createdDate: any;
                updatedDate: any;
                status: string;
                rating: number;
            };
        };
    }> | null;
};

export type CountFavoritesForArticleQueryVariables = Exact<{
    articleId: Scalars['String'];
}>;

export type CountFavoritesForArticleQuery = {
    __typename?: 'Query';
    countFavoritesForArticle?: number | null;
};

export type MessagesQueryVariables = Exact<{
    conversationId: Scalars['String'];
}>;

export type MessagesQuery = {
    __typename?: 'Query';
    messages?: Array<{
        __typename?: 'Message';
        id: string;
        createdDate: any;
        text?: string | null;
        images?: Array<string> | null;
        status: string;
        updatedDate: any;
        sender: {
            __typename?: 'User';
            id: string;
            username: string;
            email: string;
            address?: string | null;
            phoneNumber?: string | null;
            fullName: string;
            birthday?: string | null;
            avatar?: string | null;
            createdDate: any;
            updatedDate: any;
            status: string;
            rating: number;
        };
        conversation: {
            __typename?: 'Conversation';
            id: string;
            article: {
                __typename?: 'Article';
                id: string;
                title: string;
                thumbnail: string;
                description: string;
                productName: string;
                user: { __typename?: 'User'; id: string; username: string };
            };
            member1: { __typename?: 'User'; id: string; username: string };
            member2: { __typename?: 'User'; id: string; username: string };
        };
    }> | null;
};

export type NotificationsQueryVariables = Exact<{ [key: string]: never }>;

export type NotificationsQuery = {
    __typename?: 'Query';
    notifications?: Array<{
        __typename?: 'Notification';
        id: string;
        content: string;
        userId?: string | null;
        createdDate: any;
        updatedDate: any;
    }> | null;
};

export type ReviewsQueryVariables = Exact<{
    reviewOptions: ReviewOptions;
}>;

export type ReviewsQuery = {
    __typename?: 'Query';
    reviews: {
        __typename?: 'ReviewResponseSuccess';
        message: string;
        data?: {
            __typename?: 'ReviewsResponse';
            pagination: {
                __typename?: 'Pagination';
                limit: number;
                page: number;
                page_size: number;
            };
            reviews: Array<{
                __typename?: 'Review';
                id: string;
                content: string;
                rating: number;
                createdDate: any;
                updatedDate: any;
                user: {
                    __typename?: 'User';
                    id: string;
                    username: string;
                    email: string;
                    address?: string | null;
                    phoneNumber?: string | null;
                    fullName: string;
                    birthday?: string | null;
                    avatar?: string | null;
                    createdDate: any;
                    updatedDate: any;
                    status: string;
                    rating: number;
                };
                assessor: {
                    __typename?: 'User';
                    id: string;
                    username: string;
                    email: string;
                    address?: string | null;
                    phoneNumber?: string | null;
                    fullName: string;
                    birthday?: string | null;
                    avatar?: string | null;
                    createdDate: any;
                    updatedDate: any;
                    status: string;
                    rating: number;
                };
            }>;
        } | null;
    };
};

export type UpdatedMessageSubscriptionVariables = Exact<{
    [key: string]: never;
}>;

export type UpdatedMessageSubscription = {
    __typename?: 'Subscription';
    updatedMessage: {
        __typename?: 'MessageMutationResponse';
        message?: string | null;
        success: boolean;
        createdMessage?: {
            __typename?: 'Message';
            text?: string | null;
            id: string;
        } | null;
    };
};

export type DeletedMessageSubscriptionVariables = Exact<{
    [key: string]: never;
}>;

export type DeletedMessageSubscription = {
    __typename?: 'Subscription';
    deletedMessage: {
        __typename?: 'MessageMutationResponse';
        message?: string | null;
        success: boolean;
    };
};

export type MessageIncomingSubscriptionVariables = Exact<{
    [key: string]: never;
}>;

export type MessageIncomingSubscription = {
    __typename?: 'Subscription';
    messageIncoming: {
        __typename?: 'MessageMutationResponse';
        message?: string | null;
        success: boolean;
    };
};

export type NewNotificationSubscriptionVariables = Exact<{
    [key: string]: never;
}>;

export type NewNotificationSubscription = {
    __typename?: 'Subscription';
    newNotification: {
        __typename?: 'NotificationMutationResponse';
        message?: string | null;
        success: boolean;
        notification?: {
            __typename?: 'Notification';
            id: string;
            content: string;
            createdDate: any;
            updatedDate: any;
        } | null;
    };
};

export type NewNotificationPrivateSubscriptionVariables = Exact<{
    userId: Scalars['String'];
}>;

export type NewNotificationPrivateSubscription = {
    __typename?: 'Subscription';
    newNotificationPrivate: {
        __typename?: 'NotificationMutationResponse';
        message?: string | null;
        success: boolean;
        notification?: {
            __typename?: 'Notification';
            id: string;
            content: string;
            createdDate: any;
            updatedDate: any;
        } | null;
    };
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
        createdDate
        updatedDate
        status
        rating
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
        views
        categories {
            id
            name
        }
        user {
            ...user
        }
        status
        favoritesCount
        views
        address
        createdDate
        updatedDate
        isClosed
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
    ${ArticleFragmentDoc}
`;
export type InsertArticleMutationFn = Apollo.MutationFunction<
    InsertArticleMutation,
    InsertArticleMutationVariables
>;

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
export function useInsertArticleMutation(
    baseOptions?: Apollo.MutationHookOptions<
        InsertArticleMutation,
        InsertArticleMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        InsertArticleMutation,
        InsertArticleMutationVariables
    >(InsertArticleDocument, options);
}
export type InsertArticleMutationHookResult = ReturnType<
    typeof useInsertArticleMutation
>;
export type InsertArticleMutationResult =
    Apollo.MutationResult<InsertArticleMutation>;
export type InsertArticleMutationOptions = Apollo.BaseMutationOptions<
    InsertArticleMutation,
    InsertArticleMutationVariables
>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($updateArticleInput: UpdateArticleInput!) {
        updateArticle(updateArticleInput: $updateArticleInput) {
            article {
                ...article
            }
            message
            success
        }
    }
    ${ArticleFragmentDoc}
`;
export type UpdateArticleMutationFn = Apollo.MutationFunction<
    UpdateArticleMutation,
    UpdateArticleMutationVariables
>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      updateArticleInput: // value for 'updateArticleInput'
 *   },
 * });
 */
export function useUpdateArticleMutation(
    baseOptions?: Apollo.MutationHookOptions<
        UpdateArticleMutation,
        UpdateArticleMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        UpdateArticleMutation,
        UpdateArticleMutationVariables
    >(UpdateArticleDocument, options);
}
export type UpdateArticleMutationHookResult = ReturnType<
    typeof useUpdateArticleMutation
>;
export type UpdateArticleMutationResult =
    Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<
    UpdateArticleMutation,
    UpdateArticleMutationVariables
>;
export const ClosedArticleDocument = gql`
    mutation ClosedArticle($articleId: String!) {
        closedArticle(articleId: $articleId) {
            success
            message
        }
    }
`;
export type ClosedArticleMutationFn = Apollo.MutationFunction<
    ClosedArticleMutation,
    ClosedArticleMutationVariables
>;

/**
 * __useClosedArticleMutation__
 *
 * To run a mutation, you first call `useClosedArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClosedArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closedArticleMutation, { data, loading, error }] = useClosedArticleMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useClosedArticleMutation(
    baseOptions?: Apollo.MutationHookOptions<
        ClosedArticleMutation,
        ClosedArticleMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        ClosedArticleMutation,
        ClosedArticleMutationVariables
    >(ClosedArticleDocument, options);
}
export type ClosedArticleMutationHookResult = ReturnType<
    typeof useClosedArticleMutation
>;
export type ClosedArticleMutationResult =
    Apollo.MutationResult<ClosedArticleMutation>;
export type ClosedArticleMutationOptions = Apollo.BaseMutationOptions<
    ClosedArticleMutation,
    ClosedArticleMutationVariables
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
export const UploadAvatarProfileDocument = gql`
    mutation UploadAvatarProfile($imageUrl: String!) {
        uploadAvatarProfile(imageUrl: $imageUrl) {
            success
            message
            user {
                ...user
            }
        }
    }
    ${UserFragmentDoc}
`;
export type UploadAvatarProfileMutationFn = Apollo.MutationFunction<
    UploadAvatarProfileMutation,
    UploadAvatarProfileMutationVariables
>;

/**
 * __useUploadAvatarProfileMutation__
 *
 * To run a mutation, you first call `useUploadAvatarProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAvatarProfileMutation, { data, loading, error }] = useUploadAvatarProfileMutation({
 *   variables: {
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useUploadAvatarProfileMutation(
    baseOptions?: Apollo.MutationHookOptions<
        UploadAvatarProfileMutation,
        UploadAvatarProfileMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        UploadAvatarProfileMutation,
        UploadAvatarProfileMutationVariables
    >(UploadAvatarProfileDocument, options);
}
export type UploadAvatarProfileMutationHookResult = ReturnType<
    typeof useUploadAvatarProfileMutation
>;
export type UploadAvatarProfileMutationResult =
    Apollo.MutationResult<UploadAvatarProfileMutation>;
export type UploadAvatarProfileMutationOptions = Apollo.BaseMutationOptions<
    UploadAvatarProfileMutation,
    UploadAvatarProfileMutationVariables
>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($userId: String!, $token: String!) {
        verifyEmail(userId: $userId, token: $token) {
            message
            success
            user {
                ...user
            }
        }
    }
    ${UserFragmentDoc}
`;
export type VerifyEmailMutationFn = Apollo.MutationFunction<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(
    baseOptions?: Apollo.MutationHookOptions<
        VerifyEmailMutation,
        VerifyEmailMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        VerifyEmailMutation,
        VerifyEmailMutationVariables
    >(VerifyEmailDocument, options);
}
export type VerifyEmailMutationHookResult = ReturnType<
    typeof useVerifyEmailMutation
>;
export type VerifyEmailMutationResult =
    Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
>;
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
export type InsertCommentMutationFn = Apollo.MutationFunction<
    InsertCommentMutation,
    InsertCommentMutationVariables
>;

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
export function useInsertCommentMutation(
    baseOptions?: Apollo.MutationHookOptions<
        InsertCommentMutation,
        InsertCommentMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        InsertCommentMutation,
        InsertCommentMutationVariables
    >(InsertCommentDocument, options);
}
export type InsertCommentMutationHookResult = ReturnType<
    typeof useInsertCommentMutation
>;
export type InsertCommentMutationResult =
    Apollo.MutationResult<InsertCommentMutation>;
export type InsertCommentMutationOptions = Apollo.BaseMutationOptions<
    InsertCommentMutation,
    InsertCommentMutationVariables
>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentId: String!) {
        deleteComment(id: $deleteCommentId) {
            message
            success
        }
    }
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
>;

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
export function useDeleteCommentMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeleteCommentMutation,
        DeleteCommentMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        DeleteCommentMutation,
        DeleteCommentMutationVariables
    >(DeleteCommentDocument, options);
}
export type DeleteCommentMutationHookResult = ReturnType<
    typeof useDeleteCommentMutation
>;
export type DeleteCommentMutationResult =
    Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
>;
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
export type UpdateCommentMutationFn = Apollo.MutationFunction<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
>;

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
export function useUpdateCommentMutation(
    baseOptions?: Apollo.MutationHookOptions<
        UpdateCommentMutation,
        UpdateCommentMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        UpdateCommentMutation,
        UpdateCommentMutationVariables
    >(UpdateCommentDocument, options);
}
export type UpdateCommentMutationHookResult = ReturnType<
    typeof useUpdateCommentMutation
>;
export type UpdateCommentMutationResult =
    Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
>;
export const NewConversationDocument = gql`
    mutation NewConversation($articleId: String!, $userId: String!) {
        newConversation(articleId: $articleId, userId: $userId) {
            success
            message
            conversation {
                id
                member1 {
                    username
                    id
                    avatar
                }
                member2 {
                    username
                    id
                    avatar
                }
                article {
                    title
                    thumbnail
                    productName
                    price
                    id
                    description
                }
                createdDate
                updatedDate
            }
        }
    }
`;
export type NewConversationMutationFn = Apollo.MutationFunction<
    NewConversationMutation,
    NewConversationMutationVariables
>;

/**
 * __useNewConversationMutation__
 *
 * To run a mutation, you first call `useNewConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newConversationMutation, { data, loading, error }] = useNewConversationMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewConversationMutation(
    baseOptions?: Apollo.MutationHookOptions<
        NewConversationMutation,
        NewConversationMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        NewConversationMutation,
        NewConversationMutationVariables
    >(NewConversationDocument, options);
}
export type NewConversationMutationHookResult = ReturnType<
    typeof useNewConversationMutation
>;
export type NewConversationMutationResult =
    Apollo.MutationResult<NewConversationMutation>;
export type NewConversationMutationOptions = Apollo.BaseMutationOptions<
    NewConversationMutation,
    NewConversationMutationVariables
>;
export const RemoveFromConversationDocument = gql`
    mutation RemoveFromConversation($conversationIds: [String!]!) {
        removeFromConversation(conversationIds: $conversationIds) {
            success
            message
        }
    }
`;
export type RemoveFromConversationMutationFn = Apollo.MutationFunction<
    RemoveFromConversationMutation,
    RemoveFromConversationMutationVariables
>;

/**
 * __useRemoveFromConversationMutation__
 *
 * To run a mutation, you first call `useRemoveFromConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromConversationMutation, { data, loading, error }] = useRemoveFromConversationMutation({
 *   variables: {
 *      conversationIds: // value for 'conversationIds'
 *   },
 * });
 */
export function useRemoveFromConversationMutation(
    baseOptions?: Apollo.MutationHookOptions<
        RemoveFromConversationMutation,
        RemoveFromConversationMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        RemoveFromConversationMutation,
        RemoveFromConversationMutationVariables
    >(RemoveFromConversationDocument, options);
}
export type RemoveFromConversationMutationHookResult = ReturnType<
    typeof useRemoveFromConversationMutation
>;
export type RemoveFromConversationMutationResult =
    Apollo.MutationResult<RemoveFromConversationMutation>;
export type RemoveFromConversationMutationOptions = Apollo.BaseMutationOptions<
    RemoveFromConversationMutation,
    RemoveFromConversationMutationVariables
>;
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
export type AddToFavoriteMutationFn = Apollo.MutationFunction<
    AddToFavoriteMutation,
    AddToFavoriteMutationVariables
>;

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
export function useAddToFavoriteMutation(
    baseOptions?: Apollo.MutationHookOptions<
        AddToFavoriteMutation,
        AddToFavoriteMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        AddToFavoriteMutation,
        AddToFavoriteMutationVariables
    >(AddToFavoriteDocument, options);
}
export type AddToFavoriteMutationHookResult = ReturnType<
    typeof useAddToFavoriteMutation
>;
export type AddToFavoriteMutationResult =
    Apollo.MutationResult<AddToFavoriteMutation>;
export type AddToFavoriteMutationOptions = Apollo.BaseMutationOptions<
    AddToFavoriteMutation,
    AddToFavoriteMutationVariables
>;
export const RemoveFromFavoriteDocument = gql`
    mutation RemoveFromFavorite($articleIds: [String!]!) {
        removeFromFavorite(articleIds: $articleIds) {
            message
            code
            success
            favorite {
                id
            }
        }
    }
`;
export type RemoveFromFavoriteMutationFn = Apollo.MutationFunction<
    RemoveFromFavoriteMutation,
    RemoveFromFavoriteMutationVariables
>;

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
 *      articleIds: // value for 'articleIds'
 *   },
 * });
 */
export function useRemoveFromFavoriteMutation(
    baseOptions?: Apollo.MutationHookOptions<
        RemoveFromFavoriteMutation,
        RemoveFromFavoriteMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        RemoveFromFavoriteMutation,
        RemoveFromFavoriteMutationVariables
    >(RemoveFromFavoriteDocument, options);
}
export type RemoveFromFavoriteMutationHookResult = ReturnType<
    typeof useRemoveFromFavoriteMutation
>;
export type RemoveFromFavoriteMutationResult =
    Apollo.MutationResult<RemoveFromFavoriteMutation>;
export type RemoveFromFavoriteMutationOptions = Apollo.BaseMutationOptions<
    RemoveFromFavoriteMutation,
    RemoveFromFavoriteMutationVariables
>;
export const InsertMessageDocument = gql`
    mutation InsertMessage($insertMessageInput: InsertMessageInput!) {
        insertMessage(insertMessageInput: $insertMessageInput) {
            message
            success
        }
    }
`;
export type InsertMessageMutationFn = Apollo.MutationFunction<
    InsertMessageMutation,
    InsertMessageMutationVariables
>;

/**
 * __useInsertMessageMutation__
 *
 * To run a mutation, you first call `useInsertMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertMessageMutation, { data, loading, error }] = useInsertMessageMutation({
 *   variables: {
 *      insertMessageInput: // value for 'insertMessageInput'
 *   },
 * });
 */
export function useInsertMessageMutation(
    baseOptions?: Apollo.MutationHookOptions<
        InsertMessageMutation,
        InsertMessageMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        InsertMessageMutation,
        InsertMessageMutationVariables
    >(InsertMessageDocument, options);
}
export type InsertMessageMutationHookResult = ReturnType<
    typeof useInsertMessageMutation
>;
export type InsertMessageMutationResult =
    Apollo.MutationResult<InsertMessageMutation>;
export type InsertMessageMutationOptions = Apollo.BaseMutationOptions<
    InsertMessageMutation,
    InsertMessageMutationVariables
>;
export const RemoveMessageDocument = gql`
    mutation RemoveMessage($messageId: String!) {
        removeMessage(messageId: $messageId) {
            message
            success
        }
    }
`;
export type RemoveMessageMutationFn = Apollo.MutationFunction<
    RemoveMessageMutation,
    RemoveMessageMutationVariables
>;

/**
 * __useRemoveMessageMutation__
 *
 * To run a mutation, you first call `useRemoveMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMessageMutation, { data, loading, error }] = useRemoveMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useRemoveMessageMutation(
    baseOptions?: Apollo.MutationHookOptions<
        RemoveMessageMutation,
        RemoveMessageMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        RemoveMessageMutation,
        RemoveMessageMutationVariables
    >(RemoveMessageDocument, options);
}
export type RemoveMessageMutationHookResult = ReturnType<
    typeof useRemoveMessageMutation
>;
export type RemoveMessageMutationResult =
    Apollo.MutationResult<RemoveMessageMutation>;
export type RemoveMessageMutationOptions = Apollo.BaseMutationOptions<
    RemoveMessageMutation,
    RemoveMessageMutationVariables
>;
export const UpdateMessageDocument = gql`
    mutation UpdateMessage($text: String!, $messageId: String!) {
        updateMessage(text: $text, messageId: $messageId) {
            message
            success
        }
    }
`;
export type UpdateMessageMutationFn = Apollo.MutationFunction<
    UpdateMessageMutation,
    UpdateMessageMutationVariables
>;

/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useUpdateMessageMutation(
    baseOptions?: Apollo.MutationHookOptions<
        UpdateMessageMutation,
        UpdateMessageMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        UpdateMessageMutation,
        UpdateMessageMutationVariables
    >(UpdateMessageDocument, options);
}
export type UpdateMessageMutationHookResult = ReturnType<
    typeof useUpdateMessageMutation
>;
export type UpdateMessageMutationResult =
    Apollo.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<
    UpdateMessageMutation,
    UpdateMessageMutationVariables
>;
export const DeleteNotificationsDocument = gql`
    mutation DeleteNotifications($ids: [String!]!) {
        deleteNotifications(ids: $ids) {
            message
            success
        }
    }
`;
export type DeleteNotificationsMutationFn = Apollo.MutationFunction<
    DeleteNotificationsMutation,
    DeleteNotificationsMutationVariables
>;

/**
 * __useDeleteNotificationsMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationsMutation, { data, loading, error }] = useDeleteNotificationsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteNotificationsMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeleteNotificationsMutation,
        DeleteNotificationsMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        DeleteNotificationsMutation,
        DeleteNotificationsMutationVariables
    >(DeleteNotificationsDocument, options);
}
export type DeleteNotificationsMutationHookResult = ReturnType<
    typeof useDeleteNotificationsMutation
>;
export type DeleteNotificationsMutationResult =
    Apollo.MutationResult<DeleteNotificationsMutation>;
export type DeleteNotificationsMutationOptions = Apollo.BaseMutationOptions<
    DeleteNotificationsMutation,
    DeleteNotificationsMutationVariables
>;
export const PushNotificationDocument = gql`
    mutation PushNotification($content: String!) {
        pushNotification(content: $content) {
            message
            success
            notification {
                id
                content
                createdDate
                updatedDate
            }
        }
    }
`;
export type PushNotificationMutationFn = Apollo.MutationFunction<
    PushNotificationMutation,
    PushNotificationMutationVariables
>;

/**
 * __usePushNotificationMutation__
 *
 * To run a mutation, you first call `usePushNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePushNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pushNotificationMutation, { data, loading, error }] = usePushNotificationMutation({
 *   variables: {
 *      content: // value for 'content'
 *   },
 * });
 */
export function usePushNotificationMutation(
    baseOptions?: Apollo.MutationHookOptions<
        PushNotificationMutation,
        PushNotificationMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        PushNotificationMutation,
        PushNotificationMutationVariables
    >(PushNotificationDocument, options);
}
export type PushNotificationMutationHookResult = ReturnType<
    typeof usePushNotificationMutation
>;
export type PushNotificationMutationResult =
    Apollo.MutationResult<PushNotificationMutation>;
export type PushNotificationMutationOptions = Apollo.BaseMutationOptions<
    PushNotificationMutation,
    PushNotificationMutationVariables
>;
export const PushPrivateNotificationDocument = gql`
    mutation PushPrivateNotification($recipientId: String!, $content: String!) {
        pushPrivateNotification(recipientId: $recipientId, content: $content) {
            message
            success
            notification {
                id
                content
                userId
                createdDate
                updatedDate
            }
        }
    }
`;
export type PushPrivateNotificationMutationFn = Apollo.MutationFunction<
    PushPrivateNotificationMutation,
    PushPrivateNotificationMutationVariables
>;

/**
 * __usePushPrivateNotificationMutation__
 *
 * To run a mutation, you first call `usePushPrivateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePushPrivateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pushPrivateNotificationMutation, { data, loading, error }] = usePushPrivateNotificationMutation({
 *   variables: {
 *      recipientId: // value for 'recipientId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function usePushPrivateNotificationMutation(
    baseOptions?: Apollo.MutationHookOptions<
        PushPrivateNotificationMutation,
        PushPrivateNotificationMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        PushPrivateNotificationMutation,
        PushPrivateNotificationMutationVariables
    >(PushPrivateNotificationDocument, options);
}
export type PushPrivateNotificationMutationHookResult = ReturnType<
    typeof usePushPrivateNotificationMutation
>;
export type PushPrivateNotificationMutationResult =
    Apollo.MutationResult<PushPrivateNotificationMutation>;
export type PushPrivateNotificationMutationOptions = Apollo.BaseMutationOptions<
    PushPrivateNotificationMutation,
    PushPrivateNotificationMutationVariables
>;
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
export type UpdateProfileMutationFn = Apollo.MutationFunction<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
>;

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
export function useUpdateProfileMutation(
    baseOptions?: Apollo.MutationHookOptions<
        UpdateProfileMutation,
        UpdateProfileMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        UpdateProfileMutation,
        UpdateProfileMutationVariables
    >(UpdateProfileDocument, options);
}
export type UpdateProfileMutationHookResult = ReturnType<
    typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult =
    Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
>;
export const ReportDocument = gql`
    mutation Report(
        $reason: String!
        $description: String!
        $articleId: String!
    ) {
        report(
            reason: $reason
            description: $description
            articleId: $articleId
        ) {
            success
            message
        }
    }
`;
export type ReportMutationFn = Apollo.MutationFunction<
    ReportMutation,
    ReportMutationVariables
>;

/**
 * __useReportMutation__
 *
 * To run a mutation, you first call `useReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportMutation, { data, loading, error }] = useReportMutation({
 *   variables: {
 *      reason: // value for 'reason'
 *      description: // value for 'description'
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useReportMutation(
    baseOptions?: Apollo.MutationHookOptions<
        ReportMutation,
        ReportMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<ReportMutation, ReportMutationVariables>(
        ReportDocument,
        options,
    );
}
export type ReportMutationHookResult = ReturnType<typeof useReportMutation>;
export type ReportMutationResult = Apollo.MutationResult<ReportMutation>;
export type ReportMutationOptions = Apollo.BaseMutationOptions<
    ReportMutation,
    ReportMutationVariables
>;
export const ReviewUserDocument = gql`
    mutation ReviewUser($reviewUserInput: ReviewUserInput!) {
        reviewUser(reviewUserInput: $reviewUserInput) {
            message
            review {
                updatedDate
                id
                createdDate
                content
                user {
                    ...user
                }
            }
            success
        }
    }
    ${UserFragmentDoc}
`;
export type ReviewUserMutationFn = Apollo.MutationFunction<
    ReviewUserMutation,
    ReviewUserMutationVariables
>;

/**
 * __useReviewUserMutation__
 *
 * To run a mutation, you first call `useReviewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReviewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reviewUserMutation, { data, loading, error }] = useReviewUserMutation({
 *   variables: {
 *      reviewUserInput: // value for 'reviewUserInput'
 *   },
 * });
 */
export function useReviewUserMutation(
    baseOptions?: Apollo.MutationHookOptions<
        ReviewUserMutation,
        ReviewUserMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<ReviewUserMutation, ReviewUserMutationVariables>(
        ReviewUserDocument,
        options,
    );
}
export type ReviewUserMutationHookResult = ReturnType<
    typeof useReviewUserMutation
>;
export type ReviewUserMutationResult =
    Apollo.MutationResult<ReviewUserMutation>;
export type ReviewUserMutationOptions = Apollo.BaseMutationOptions<
    ReviewUserMutation,
    ReviewUserMutationVariables
>;
export const DeleteReviewDocument = gql`
    mutation DeleteReview($deleteReviewId: String!) {
        deleteReview(id: $deleteReviewId) {
            message
            success
        }
    }
`;
export type DeleteReviewMutationFn = Apollo.MutationFunction<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
>;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      deleteReviewId: // value for 'deleteReviewId'
 *   },
 * });
 */
export function useDeleteReviewMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeleteReviewMutation,
        DeleteReviewMutationVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        DeleteReviewMutation,
        DeleteReviewMutationVariables
    >(DeleteReviewDocument, options);
}
export type DeleteReviewMutationHookResult = ReturnType<
    typeof useDeleteReviewMutation
>;
export type DeleteReviewMutationResult =
    Apollo.MutationResult<DeleteReviewMutation>;
export type DeleteReviewMutationOptions = Apollo.BaseMutationOptions<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
>;
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
    ${ArticleFragmentDoc}
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
 *      queryConfig: // value for 'queryConfig'
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
    query Article($articleId: String!) {
        article(articleId: $articleId) {
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
 *      articleId: // value for 'articleId'
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
export const UserByIdDocument = gql`
    query UserById($userId: String!) {
        getUserById(userId: $userId) {
            id
            username
            email
            address
            phoneNumber
            fullName
            birthday
            avatar
            status
            createdDate
            updatedDate
        }
    }
`;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserByIdQuery(
    baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(
        UserByIdDocument,
        options,
    );
}
export function useUserByIdLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        UserByIdQuery,
        UserByIdQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(
        UserByIdDocument,
        options,
    );
}
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<
    typeof useUserByIdLazyQuery
>;
export type UserByIdQueryResult = Apollo.QueryResult<
    UserByIdQuery,
    UserByIdQueryVariables
>;
export const GetUsersByNameDocument = gql`
    query GetUsersByName($name: String!) {
        getUsersByName(name: $name) {
            id
            username
            avatar
        }
    }
`;

/**
 * __useGetUsersByNameQuery__
 *
 * To run a query within a React component, call `useGetUsersByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetUsersByNameQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetUsersByNameQuery,
        GetUsersByNameQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetUsersByNameQuery, GetUsersByNameQueryVariables>(
        GetUsersByNameDocument,
        options,
    );
}
export function useGetUsersByNameLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetUsersByNameQuery,
        GetUsersByNameQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        GetUsersByNameQuery,
        GetUsersByNameQueryVariables
    >(GetUsersByNameDocument, options);
}
export type GetUsersByNameQueryHookResult = ReturnType<
    typeof useGetUsersByNameQuery
>;
export type GetUsersByNameLazyQueryHookResult = ReturnType<
    typeof useGetUsersByNameLazyQuery
>;
export type GetUsersByNameQueryResult = Apollo.QueryResult<
    GetUsersByNameQuery,
    GetUsersByNameQueryVariables
>;
export const CategoriesDocument = gql`
    query Categories {
        categories {
            id
            name
            image
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
export function useCategoriesQuery(
    baseOptions?: Apollo.QueryHookOptions<
        CategoriesQuery,
        CategoriesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(
        CategoriesDocument,
        options,
    );
}
export function useCategoriesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        CategoriesQuery,
        CategoriesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(
        CategoriesDocument,
        options,
    );
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<
    typeof useCategoriesLazyQuery
>;
export type CategoriesQueryResult = Apollo.QueryResult<
    CategoriesQuery,
    CategoriesQueryVariables
>;
export const CommentListByArticleIdDocument = gql`
    query CommentListByArticleId(
        $limit: Int!
        $articleId: String!
        $cursor: String
    ) {
        commentListByArticleId(
            limit: $limit
            articleId: $articleId
            cursor: $cursor
        ) {
            paginatedComments {
                text
                user {
                    id
                    username
                    avatar
                    fullName
                    rating
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
export function useCommentListByArticleIdQuery(
    baseOptions: Apollo.QueryHookOptions<
        CommentListByArticleIdQuery,
        CommentListByArticleIdQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<
        CommentListByArticleIdQuery,
        CommentListByArticleIdQueryVariables
    >(CommentListByArticleIdDocument, options);
}
export function useCommentListByArticleIdLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        CommentListByArticleIdQuery,
        CommentListByArticleIdQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        CommentListByArticleIdQuery,
        CommentListByArticleIdQueryVariables
    >(CommentListByArticleIdDocument, options);
}
export type CommentListByArticleIdQueryHookResult = ReturnType<
    typeof useCommentListByArticleIdQuery
>;
export type CommentListByArticleIdLazyQueryHookResult = ReturnType<
    typeof useCommentListByArticleIdLazyQuery
>;
export type CommentListByArticleIdQueryResult = Apollo.QueryResult<
    CommentListByArticleIdQuery,
    CommentListByArticleIdQueryVariables
>;
export const GetConversationsDocument = gql`
    query GetConversations {
        getConversations {
            id
            createdDate
            updatedDate
            member1 {
                username
                id
                avatar
            }
            member2 {
                username
                id
                avatar
            }
            article {
                id
                productName
                thumbnail
                price
                title
                description
            }
        }
    }
`;

/**
 * __useGetConversationsQuery__
 *
 * To run a query within a React component, call `useGetConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConversationsQuery(
    baseOptions?: Apollo.QueryHookOptions<
        GetConversationsQuery,
        GetConversationsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<
        GetConversationsQuery,
        GetConversationsQueryVariables
    >(GetConversationsDocument, options);
}
export function useGetConversationsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetConversationsQuery,
        GetConversationsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        GetConversationsQuery,
        GetConversationsQueryVariables
    >(GetConversationsDocument, options);
}
export type GetConversationsQueryHookResult = ReturnType<
    typeof useGetConversationsQuery
>;
export type GetConversationsLazyQueryHookResult = ReturnType<
    typeof useGetConversationsLazyQuery
>;
export type GetConversationsQueryResult = Apollo.QueryResult<
    GetConversationsQuery,
    GetConversationsQueryVariables
>;
export const GetConversationDocument = gql`
    query GetConversation($articleId: String!, $userId: String!) {
        getConversation(articleId: $articleId, userId: $userId) {
            id
            member1 {
                username
                id
                avatar
            }
            member2 {
                username
                id
                avatar
            }
            article {
                id
                productName
                thumbnail
                price
                title
                description
            }
            createdDate
            updatedDate
        }
    }
`;

/**
 * __useGetConversationQuery__
 *
 * To run a query within a React component, call `useGetConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetConversationQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetConversationQuery,
        GetConversationQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetConversationQuery, GetConversationQueryVariables>(
        GetConversationDocument,
        options,
    );
}
export function useGetConversationLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetConversationQuery,
        GetConversationQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        GetConversationQuery,
        GetConversationQueryVariables
    >(GetConversationDocument, options);
}
export type GetConversationQueryHookResult = ReturnType<
    typeof useGetConversationQuery
>;
export type GetConversationLazyQueryHookResult = ReturnType<
    typeof useGetConversationLazyQuery
>;
export type GetConversationQueryResult = Apollo.QueryResult<
    GetConversationQuery,
    GetConversationQueryVariables
>;
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
export function useIsFavoriteQuery(
    baseOptions: Apollo.QueryHookOptions<
        IsFavoriteQuery,
        IsFavoriteQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<IsFavoriteQuery, IsFavoriteQueryVariables>(
        IsFavoriteDocument,
        options,
    );
}
export function useIsFavoriteLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        IsFavoriteQuery,
        IsFavoriteQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<IsFavoriteQuery, IsFavoriteQueryVariables>(
        IsFavoriteDocument,
        options,
    );
}
export type IsFavoriteQueryHookResult = ReturnType<typeof useIsFavoriteQuery>;
export type IsFavoriteLazyQueryHookResult = ReturnType<
    typeof useIsFavoriteLazyQuery
>;
export type IsFavoriteQueryResult = Apollo.QueryResult<
    IsFavoriteQuery,
    IsFavoriteQueryVariables
>;
export const FavoritesDocument = gql`
    query Favorites {
        favorites {
            id
            article {
                ...article
            }
        }
    }
    ${ArticleFragmentDoc}
`;

/**
 * __useFavoritesQuery__
 *
 * To run a query within a React component, call `useFavoritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoritesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFavoritesQuery(
    baseOptions?: Apollo.QueryHookOptions<
        FavoritesQuery,
        FavoritesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<FavoritesQuery, FavoritesQueryVariables>(
        FavoritesDocument,
        options,
    );
}
export function useFavoritesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        FavoritesQuery,
        FavoritesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<FavoritesQuery, FavoritesQueryVariables>(
        FavoritesDocument,
        options,
    );
}
export type FavoritesQueryHookResult = ReturnType<typeof useFavoritesQuery>;
export type FavoritesLazyQueryHookResult = ReturnType<
    typeof useFavoritesLazyQuery
>;
export type FavoritesQueryResult = Apollo.QueryResult<
    FavoritesQuery,
    FavoritesQueryVariables
>;
export const CountFavoritesForArticleDocument = gql`
    query CountFavoritesForArticle($articleId: String!) {
        countFavoritesForArticle(articleId: $articleId)
    }
`;

/**
 * __useCountFavoritesForArticleQuery__
 *
 * To run a query within a React component, call `useCountFavoritesForArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountFavoritesForArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountFavoritesForArticleQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useCountFavoritesForArticleQuery(
    baseOptions: Apollo.QueryHookOptions<
        CountFavoritesForArticleQuery,
        CountFavoritesForArticleQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<
        CountFavoritesForArticleQuery,
        CountFavoritesForArticleQueryVariables
    >(CountFavoritesForArticleDocument, options);
}
export function useCountFavoritesForArticleLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        CountFavoritesForArticleQuery,
        CountFavoritesForArticleQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<
        CountFavoritesForArticleQuery,
        CountFavoritesForArticleQueryVariables
    >(CountFavoritesForArticleDocument, options);
}
export type CountFavoritesForArticleQueryHookResult = ReturnType<
    typeof useCountFavoritesForArticleQuery
>;
export type CountFavoritesForArticleLazyQueryHookResult = ReturnType<
    typeof useCountFavoritesForArticleLazyQuery
>;
export type CountFavoritesForArticleQueryResult = Apollo.QueryResult<
    CountFavoritesForArticleQuery,
    CountFavoritesForArticleQueryVariables
>;
export const MessagesDocument = gql`
    query Messages($conversationId: String!) {
        messages(conversationId: $conversationId) {
            id
            sender {
                ...user
            }
            conversation {
                article {
                    id
                    title
                    thumbnail
                    description
                    productName
                    user {
                        id
                        username
                    }
                }
                member1 {
                    id
                    username
                }
                member2 {
                    id
                    username
                }
                id
            }
            createdDate
            text
            images
            status
            updatedDate
        }
    }
    ${UserFragmentDoc}
`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useMessagesQuery(
    baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(
        MessagesDocument,
        options,
    );
}
export function useMessagesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        MessagesQuery,
        MessagesQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(
        MessagesDocument,
        options,
    );
}
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<
    typeof useMessagesLazyQuery
>;
export type MessagesQueryResult = Apollo.QueryResult<
    MessagesQuery,
    MessagesQueryVariables
>;
export const NotificationsDocument = gql`
    query Notifications {
        notifications {
            id
            content
            userId
            createdDate
            updatedDate
        }
    }
`;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsQuery(
    baseOptions?: Apollo.QueryHookOptions<
        NotificationsQuery,
        NotificationsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(
        NotificationsDocument,
        options,
    );
}
export function useNotificationsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        NotificationsQuery,
        NotificationsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(
        NotificationsDocument,
        options,
    );
}
export type NotificationsQueryHookResult = ReturnType<
    typeof useNotificationsQuery
>;
export type NotificationsLazyQueryHookResult = ReturnType<
    typeof useNotificationsLazyQuery
>;
export type NotificationsQueryResult = Apollo.QueryResult<
    NotificationsQuery,
    NotificationsQueryVariables
>;
export const ReviewsDocument = gql`
    query Reviews($reviewOptions: ReviewOptions!) {
        reviews(reviewOptions: $reviewOptions) {
            message
            data {
                pagination {
                    limit
                    page
                    page_size
                }
                reviews {
                    id
                    content
                    rating
                    user {
                        ...user
                    }
                    createdDate
                    updatedDate
                    assessor {
                        ...user
                    }
                }
            }
        }
    }
    ${UserFragmentDoc}
`;

/**
 * __useReviewsQuery__
 *
 * To run a query within a React component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsQuery({
 *   variables: {
 *      reviewOptions: // value for 'reviewOptions'
 *   },
 * });
 */
export function useReviewsQuery(
    baseOptions: Apollo.QueryHookOptions<ReviewsQuery, ReviewsQueryVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<ReviewsQuery, ReviewsQueryVariables>(
        ReviewsDocument,
        options,
    );
}
export function useReviewsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        ReviewsQuery,
        ReviewsQueryVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(
        ReviewsDocument,
        options,
    );
}
export type ReviewsQueryHookResult = ReturnType<typeof useReviewsQuery>;
export type ReviewsLazyQueryHookResult = ReturnType<typeof useReviewsLazyQuery>;
export type ReviewsQueryResult = Apollo.QueryResult<
    ReviewsQuery,
    ReviewsQueryVariables
>;
export const UpdatedMessageDocument = gql`
    subscription UpdatedMessage {
        updatedMessage {
            message
            success
            createdMessage {
                text
                id
            }
        }
    }
`;

/**
 * __useUpdatedMessageSubscription__
 *
 * To run a query within a React component, call `useUpdatedMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdatedMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdatedMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUpdatedMessageSubscription(
    baseOptions?: Apollo.SubscriptionHookOptions<
        UpdatedMessageSubscription,
        UpdatedMessageSubscriptionVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription<
        UpdatedMessageSubscription,
        UpdatedMessageSubscriptionVariables
    >(UpdatedMessageDocument, options);
}
export type UpdatedMessageSubscriptionHookResult = ReturnType<
    typeof useUpdatedMessageSubscription
>;
export type UpdatedMessageSubscriptionResult =
    Apollo.SubscriptionResult<UpdatedMessageSubscription>;
export const DeletedMessageDocument = gql`
    subscription DeletedMessage {
        deletedMessage {
            message
            success
        }
    }
`;

/**
 * __useDeletedMessageSubscription__
 *
 * To run a query within a React component, call `useDeletedMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeletedMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeletedMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDeletedMessageSubscription(
    baseOptions?: Apollo.SubscriptionHookOptions<
        DeletedMessageSubscription,
        DeletedMessageSubscriptionVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription<
        DeletedMessageSubscription,
        DeletedMessageSubscriptionVariables
    >(DeletedMessageDocument, options);
}
export type DeletedMessageSubscriptionHookResult = ReturnType<
    typeof useDeletedMessageSubscription
>;
export type DeletedMessageSubscriptionResult =
    Apollo.SubscriptionResult<DeletedMessageSubscription>;
export const MessageIncomingDocument = gql`
    subscription MessageIncoming {
        messageIncoming {
            message
            success
        }
    }
`;

/**
 * __useMessageIncomingSubscription__
 *
 * To run a query within a React component, call `useMessageIncomingSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageIncomingSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageIncomingSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageIncomingSubscription(
    baseOptions?: Apollo.SubscriptionHookOptions<
        MessageIncomingSubscription,
        MessageIncomingSubscriptionVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription<
        MessageIncomingSubscription,
        MessageIncomingSubscriptionVariables
    >(MessageIncomingDocument, options);
}
export type MessageIncomingSubscriptionHookResult = ReturnType<
    typeof useMessageIncomingSubscription
>;
export type MessageIncomingSubscriptionResult =
    Apollo.SubscriptionResult<MessageIncomingSubscription>;
export const NewNotificationDocument = gql`
    subscription NewNotification {
        newNotification {
            message
            success
            notification {
                id
                content
                createdDate
                updatedDate
            }
        }
    }
`;

/**
 * __useNewNotificationSubscription__
 *
 * To run a query within a React component, call `useNewNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewNotificationSubscription(
    baseOptions?: Apollo.SubscriptionHookOptions<
        NewNotificationSubscription,
        NewNotificationSubscriptionVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription<
        NewNotificationSubscription,
        NewNotificationSubscriptionVariables
    >(NewNotificationDocument, options);
}
export type NewNotificationSubscriptionHookResult = ReturnType<
    typeof useNewNotificationSubscription
>;
export type NewNotificationSubscriptionResult =
    Apollo.SubscriptionResult<NewNotificationSubscription>;
export const NewNotificationPrivateDocument = gql`
    subscription NewNotificationPrivate($userId: String!) {
        newNotificationPrivate(userId: $userId) {
            message
            success
            notification {
                id
                content
                createdDate
                updatedDate
            }
        }
    }
`;

/**
 * __useNewNotificationPrivateSubscription__
 *
 * To run a query within a React component, call `useNewNotificationPrivateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationPrivateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationPrivateSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNewNotificationPrivateSubscription(
    baseOptions: Apollo.SubscriptionHookOptions<
        NewNotificationPrivateSubscription,
        NewNotificationPrivateSubscriptionVariables
    >,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useSubscription<
        NewNotificationPrivateSubscription,
        NewNotificationPrivateSubscriptionVariables
    >(NewNotificationPrivateDocument, options);
}
export type NewNotificationPrivateSubscriptionHookResult = ReturnType<
    typeof useNewNotificationPrivateSubscription
>;
export type NewNotificationPrivateSubscriptionResult =
    Apollo.SubscriptionResult<NewNotificationPrivateSubscription>;
