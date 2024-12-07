export const API_URLS = {
  AUTH: {
    CHECK_RECOVERY_CODE: 'v1/auth/check-recovery-code',
    LOGIN: 'v1/auth/login',
    LOGOUT: 'v1/auth/logout',
    ME: 'v1/auth/me',
    NEW_PASSWORD: 'v1/auth/new-password',
    PASSWORD_RECOVERY: 'v1/auth/password-recovery',
    REGISTRATION: 'v1/auth/registration',
    REGISTRATION_CONFIRMATION: 'v1/auth/registration-confirmation',
    REGISTRATION_EMAIL_RESENDING: 'v1/auth/registration-email-resending',
    UPDATE_TOKENS: 'v1/auth/update-tokens',
  },
  BASE_URL: 'https://inctagram.work/api/',
  DEVICES: {
    DELETE_SESSION_TEMPLATE_ALL: 'v1/sessions/terminate-all',
    DeleteSessionByDeviceId: (deviceId: number) => `v1/sessions/${deviceId}`,
    GET_SESSIONS: 'v1/sessions',
  },
  FOLLOW: {
    FOLLOW_USER: 'v1/users/following',
    GET_USER_PROFILE: 'v1/users',
    GetFollowers: (userName: string) => `v1/users/${userName}/followers`,
    GetFollowing: (userName: string) => `v1/users/${userName}/following`,
    GetProfileUserWithPost: (userName: string) => `v1/users/${userName}`,
    RemoveFollower: (userId: number) => `v1/users/follower/${userId}`,
  },
  NOTIFICATIONS: {
    DeleteNotifications: (id: number) => `v1/notifications/${id}`,
    GetAllNotifications: (cursor: number | undefined) => `v1/notifications/${cursor}`,
    MARK_NOTIFICATION_AS_READ: 'v1/notifications/mark-as-read',
  },
  POSTS: {
    CREATE_POST: 'v1/posts',
    CreateAnswerComment: (postId: number, commentId: number) =>
      `v1/posts/${postId}/comments/${commentId}/answers`,
    CreateComment: (postId: number) => `v1/posts/${postId}/comments`,
    DeletePost: (postId: number) => `v1/posts/${postId}`,
    DeleteUploadImage: (uploadId: string | string[]) => `v1/posts/image/${uploadId}`,
    GetCommentAnswers: (commentId: number, postId: number) =>
      `v1/posts/${postId}/comments/${commentId}/answers`,
    GetCommentAnswersLikes: (commentId: number, postId: number, answerId: number) =>
      `v1/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
    GetCommentLikes: (commentId: number, postId: number) =>
      `v1/posts/${postId}/comments/${commentId}/likes`,
    GetPostComments: (postId: number) => `v1/posts/${postId}/comments`,
    GetPostLikes: (postId: number) => `v1/posts/${postId}/likes`,
    GetPostsByUsername: (userName: string) => `v1/posts/${userName}`,
    UPLOAD_POST_IMAGE: 'v1/posts/image',
    UpdateAnswerLikeStatus: (answerId: number, commentId: number, postId: number) =>
      `v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
    UpdateCommentLikeStatus: (commentId: number, postId: number) =>
      `v1/posts/${postId}/comments/${commentId}/like-status`,
    UpdatePost: (postId: number) => `v1/posts/${postId}`,
    UpdatePostLikeStatus: (postId: number) => `v1/posts/${postId}/like-status`,
  },
  PROFILE: {
    DELETE_AVATAR: 'v1/users/profile/avatar',
    DELETE_PROFILE: 'v1/users/profile',
    DeleteProfileById: (id: number) => `v1/users/profile/${id}`,
    GET_PROFILE: 'v1/users/profile',
    POST_AVATAR: 'v1/users/profile/avatar',
    UPDATE_PROFILE: 'v1/users/profile',
  },

  PUBLIC: {
    GET_TOTAL_COUNT_USERS: 'v1/public-user',
    GetAllPublicPosts: (endCursorPostId: number | undefined) =>
      `v1/public-posts/all/${endCursorPostId}`,
    GetPostById: (postId: number | undefined) => `v1/public-posts/${postId}`,
    GetPublicPostComments: (postId: number) => `v1/public-posts/${postId}/comments`,
    GetPublicProfileById: (profileId: number) => `v1/public-user/profile/${profileId}`,
    GetUserPublicPosts: (endCursorPostId: null | number, userId: number) =>
      `v1/public-posts/user/${userId}/${endCursorPostId}`,
  },
  SOCKET_URL: 'https://inctagram.work',
  SUBSCRIPTIONS: {
    CANCEL_AUTO_RENEWAL: 'v1/subscriptions/canceled-auto-renewal',
    CREATE_SUBSCRIPTIONS: 'v1/subscriptions',
    GET_MY_PAYMENTS: 'v1/subscriptions/my-payments',
    GET_SUBSCRIPTIONS_COST_PAYMENT: 'v1/subscriptions/cost-of-payment-subscriptions',
    GET_SUBSCRIPTIONS_CURRENT_PAYMENT: 'v1/subscriptions/current-payment-subscriptions',
  },
}

export const METHOD = {
  DELETE: 'DELETE',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
} as const

export const WS_EVENT_PATH = {
  ERROR: 'error',
  MESSAGE_DELETED: 'message-deleted',
  MESSAGE_SENT: 'message-sent',
  NOTIFICATIONS: 'notifications',
  RECEIVE_MESSAGE: 'receive-message',
  UPDATE_MESSAGE: 'update-message',
} as const
