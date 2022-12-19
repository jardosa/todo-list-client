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

export type Comment = Node & TimeStamps & {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  postId: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
};

export type CreateCommentInput = {
  body: Scalars['String'];
  postId: Scalars['ID'];
};

export type CreatePostInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  authToken: Scalars['String'];
  profile: Profile;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  createUser: User;
  echo: Scalars['String'];
  login: LoginPayload;
  register: LoginPayload;
  removeComment: Comment;
  removePost: Post;
  removeUser: User;
  updateComment: Comment;
  updatePost: Post;
  updateUser: User;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationEchoArgs = {
  message: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  registerInput: CreateUserInput;
};


export type MutationRemoveCommentArgs = {
  _id: Scalars['ID'];
};


export type MutationRemovePostArgs = {
  _id: Scalars['ID'];
};


export type MutationRemoveUserArgs = {
  _id: Scalars['ID'];
};


export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Node = {
  _id: Scalars['ID'];
};

export type Post = Node & TimeStamps & {
  __typename?: 'Post';
  _id: Scalars['ID'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  status: PostStatus;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
};


export type PostCommentsArgs = {
  searchInput?: InputMaybe<SearchCommentsInputNoId>;
};

export enum PostStatus {
  Completed = 'Completed',
  InProgress = 'InProgress',
  NotCompleted = 'NotCompleted',
  NotStarted = 'NotStarted'
}

export type Profile = Node & TimeStamps & {
  __typename?: 'Profile';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  ping: Scalars['String'];
  post: Post;
  posts: Array<Post>;
  user?: Maybe<User>;
  users: Array<User>;
  whoAmI: User;
};


export type QueryCommentArgs = {
  _id: Scalars['ID'];
};


export type QueryCommentsArgs = {
  searchInput: SearchCommentsInput;
};


export type QueryPostArgs = {
  _id: Scalars['ID'];
};


export type QueryPostsArgs = {
  searchInput: SearchPostsInput;
};


export type QueryUserArgs = {
  input: SearchUserInput;
};


export type QueryUsersArgs = {
  input?: InputMaybe<SearchUsersInput>;
};

export type SearchCommentsInput = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  postId: Scalars['ID'];
};

export type SearchCommentsInputNoId = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};

export type SearchPostsInput = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  userId: Scalars['ID'];
};

export type SearchUserInput = {
  _id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type SearchUsersInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};

export type TimeStamps = {
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UpdateCommentInput = {
  _id: Scalars['ID'];
  body: Scalars['String'];
};

export type UpdatePostInput = {
  _id: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  status: PostStatus;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  _id: Scalars['ID'];
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = Node & TimeStamps & {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoAmI: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any } };

export type RegisterMutationVariables = Exact<{
  registerInput: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginPayload', authToken: string, profile: { __typename?: 'Profile', _id: string, firstName?: string | null, lastName?: string | null, email: string, createdAt: any, updatedAt: any } } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', authToken: string, profile: { __typename?: 'Profile', _id: string, firstName?: string | null, lastName?: string | null, email: string, createdAt: any, updatedAt: any } } };

export type ProfileFieldsFragment = { __typename?: 'LoginPayload', profile: { __typename?: 'Profile', _id: string, firstName?: string | null, lastName?: string | null, email: string, createdAt: any, updatedAt: any } };

export type CommentQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type CommentQuery = { __typename?: 'Query', comment?: { __typename?: 'Comment', _id: string, postId: string, body: string, userId: string, createdAt: any, updatedAt: any } | null };

export type CommentsQueryVariables = Exact<{
  searchInput: SearchCommentsInput;
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', _id: string, postId: string, body: string, userId: string, createdAt: any, updatedAt: any }> };

export type CreateCommentMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', _id: string, postId: string, body: string, userId: string, createdAt: any, updatedAt: any } };

export type UpdateCommentMutationVariables = Exact<{
  updateCommentInput: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', _id: string, postId: string, body: string, userId: string, createdAt: any, updatedAt: any } };

export type RemoveCommentMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type RemoveCommentMutation = { __typename?: 'Mutation', removeComment: { __typename?: 'Comment', _id: string, postId: string, body: string, userId: string, createdAt: any, updatedAt: any } };

export type CommentFieldsFragment = { __typename?: 'Comment', _id: string, postId: string, body: string, userId: string, createdAt: any, updatedAt: any };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', ping: string };

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', _id: string, title: string, description: string, status: PostStatus, userId: string, createdAt: any, updatedAt: any } };

export type PostQueryVariables = Exact<{
  _id: Scalars['ID'];
  searchInput?: InputMaybe<SearchCommentsInputNoId>;
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', _id: string, title: string, description: string, status: PostStatus, userId: string, createdAt: any, updatedAt: any, comments: Array<{ __typename?: 'Comment', _id: string, postId: string, body: string, userId: string, createdAt: any, updatedAt: any }> } };

export type PostsQueryVariables = Exact<{
  searchInput: SearchPostsInput;
  searchCommentsInput?: InputMaybe<SearchCommentsInputNoId>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', _id: string, title: string, description: string, status: PostStatus, userId: string, createdAt: any, updatedAt: any, comments: Array<{ __typename?: 'Comment', _id: string, postId: string, body: string, userId: string, createdAt: any, updatedAt: any }> }> };

export type RemovePostMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type RemovePostMutation = { __typename?: 'Mutation', removePost: { __typename?: 'Post', _id: string, title: string, description: string, status: PostStatus, userId: string, createdAt: any, updatedAt: any } };

export type UpdatePostMutationVariables = Exact<{
  updatePostInput: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', _id: string, title: string, description: string, status: PostStatus, userId: string, createdAt: any, updatedAt: any } };

export type PostFieldsFragment = { __typename?: 'Post', _id: string, title: string, description: string, status: PostStatus, userId: string, createdAt: any, updatedAt: any };

type TimestampFields_Comment_Fragment = { __typename?: 'Comment', createdAt: any, updatedAt: any };

type TimestampFields_Post_Fragment = { __typename?: 'Post', createdAt: any, updatedAt: any };

type TimestampFields_Profile_Fragment = { __typename?: 'Profile', createdAt: any, updatedAt: any };

type TimestampFields_User_Fragment = { __typename?: 'User', createdAt: any, updatedAt: any };

export type TimestampFieldsFragment = TimestampFields_Comment_Fragment | TimestampFields_Post_Fragment | TimestampFields_Profile_Fragment | TimestampFields_User_Fragment;

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any } };

export type RemoveUserMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any } };

export type UsersQueryVariables = Exact<{
  input?: InputMaybe<SearchUsersInput>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any }> };

export type UserQueryVariables = Exact<{
  input: SearchUserInput;
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any } | null };

export type UserFieldsFragment = { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any };

export const ProfileFieldsFragmentDoc = gql`
    fragment profileFields on LoginPayload {
  profile {
    _id
    firstName
    lastName
    email
    createdAt
    updatedAt
  }
}
    `;
export const CommentFieldsFragmentDoc = gql`
    fragment commentFields on Comment {
  _id
  postId
  body
  userId
  createdAt
  updatedAt
}
    `;
export const PostFieldsFragmentDoc = gql`
    fragment postFields on Post {
  _id
  title
  description
  status
  userId
  createdAt
  updatedAt
}
    `;
export const TimestampFieldsFragmentDoc = gql`
    fragment timestampFields on TimeStamps {
  createdAt
  updatedAt
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment userFields on User {
  _id
  firstName
  lastName
  email
  createdAt
  updatedAt
}
    `;
export const WhoAmIDocument = gql`
    query WhoAmI {
  whoAmI {
    _id
    firstName
    lastName
    email
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(baseOptions?: Apollo.QueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
      }
export function useWhoAmILazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
        }
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmIQueryResult = Apollo.QueryResult<WhoAmIQuery, WhoAmIQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: CreateUserInput!) {
  register(registerInput: $registerInput) {
    authToken
    ...profileFields
  }
}
    ${ProfileFieldsFragmentDoc}`;
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
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    authToken
    ...profileFields
  }
}
    ${ProfileFieldsFragmentDoc}`;
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
 *      email: // value for 'email'
 *      password: // value for 'password'
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
export const CommentDocument = gql`
    query Comment($_id: ID!) {
  comment(_id: $_id) {
    ...commentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

/**
 * __useCommentQuery__
 *
 * To run a query within a React component, call `useCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useCommentQuery(baseOptions: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options);
      }
export function useCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options);
        }
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export type CommentQueryResult = Apollo.QueryResult<CommentQuery, CommentQueryVariables>;
export const CommentsDocument = gql`
    query Comments($searchInput: SearchCommentsInput!) {
  comments(searchInput: $searchInput) {
    ...commentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($createCommentInput: CreateCommentInput!) {
  createComment(createCommentInput: $createCommentInput) {
    ...commentFields
  }
}
    ${CommentFieldsFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      createCommentInput: // value for 'createCommentInput'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($updateCommentInput: UpdateCommentInput!) {
  updateComment(updateCommentInput: $updateCommentInput) {
    ...commentFields
  }
}
    ${CommentFieldsFragmentDoc}`;
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
export const RemoveCommentDocument = gql`
    mutation RemoveComment($_id: ID!) {
  removeComment(_id: $_id) {
    ...commentFields
  }
}
    ${CommentFieldsFragmentDoc}`;
export type RemoveCommentMutationFn = Apollo.MutationFunction<RemoveCommentMutation, RemoveCommentMutationVariables>;

/**
 * __useRemoveCommentMutation__
 *
 * To run a mutation, you first call `useRemoveCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCommentMutation, { data, loading, error }] = useRemoveCommentMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useRemoveCommentMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCommentMutation, RemoveCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCommentMutation, RemoveCommentMutationVariables>(RemoveCommentDocument, options);
      }
export type RemoveCommentMutationHookResult = ReturnType<typeof useRemoveCommentMutation>;
export type RemoveCommentMutationResult = Apollo.MutationResult<RemoveCommentMutation>;
export type RemoveCommentMutationOptions = Apollo.BaseMutationOptions<RemoveCommentMutation, RemoveCommentMutationVariables>;
export const PingDocument = gql`
    query Ping {
  ping
}
    `;

/**
 * __usePingQuery__
 *
 * To run a query within a React component, call `usePingQuery` and pass it any options that fit your needs.
 * When your component renders, `usePingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePingQuery({
 *   variables: {
 *   },
 * });
 */
export function usePingQuery(baseOptions?: Apollo.QueryHookOptions<PingQuery, PingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PingQuery, PingQueryVariables>(PingDocument, options);
      }
export function usePingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PingQuery, PingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PingQuery, PingQueryVariables>(PingDocument, options);
        }
export type PingQueryHookResult = ReturnType<typeof usePingQuery>;
export type PingLazyQueryHookResult = ReturnType<typeof usePingLazyQuery>;
export type PingQueryResult = Apollo.QueryResult<PingQuery, PingQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($createPostInput: CreatePostInput!) {
  createPost(createPostInput: $createPostInput) {
    ...postFields
  }
}
    ${PostFieldsFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const PostDocument = gql`
    query Post($_id: ID!, $searchInput: SearchCommentsInputNoID) {
  post(_id: $_id) {
    ...postFields
    comments(searchInput: $searchInput) {
      ...commentFields
    }
  }
}
    ${PostFieldsFragmentDoc}
${CommentFieldsFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      _id: // value for '_id'
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($searchInput: SearchPostsInput!, $searchCommentsInput: SearchCommentsInputNoID) {
  posts(searchInput: $searchInput) {
    ...postFields
    comments(searchInput: $searchCommentsInput) {
      ...commentFields
    }
  }
}
    ${PostFieldsFragmentDoc}
${CommentFieldsFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *      searchCommentsInput: // value for 'searchCommentsInput'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const RemovePostDocument = gql`
    mutation RemovePost($_id: ID!) {
  removePost(_id: $_id) {
    ...postFields
  }
}
    ${PostFieldsFragmentDoc}`;
export type RemovePostMutationFn = Apollo.MutationFunction<RemovePostMutation, RemovePostMutationVariables>;

/**
 * __useRemovePostMutation__
 *
 * To run a mutation, you first call `useRemovePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePostMutation, { data, loading, error }] = useRemovePostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useRemovePostMutation(baseOptions?: Apollo.MutationHookOptions<RemovePostMutation, RemovePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePostMutation, RemovePostMutationVariables>(RemovePostDocument, options);
      }
export type RemovePostMutationHookResult = ReturnType<typeof useRemovePostMutation>;
export type RemovePostMutationResult = Apollo.MutationResult<RemovePostMutation>;
export type RemovePostMutationOptions = Apollo.BaseMutationOptions<RemovePostMutation, RemovePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($updatePostInput: UpdatePostInput!) {
  updatePost(updatePostInput: $updatePostInput) {
    ...postFields
  }
}
    ${PostFieldsFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostInput: // value for 'updatePostInput'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($_id: ID!) {
  removeUser(_id: $_id) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const UsersDocument = gql`
    query Users($input: SearchUsersInput) {
  users(input: $input) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
    query User($input: SearchUserInput!) {
  user(input: $input) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;