export const en = {
  auth: {
    backToSignIn: 'Back to Sign In',
    backToSignUp: 'Back to Sign Up',
    confirm: 'Confirm password',
    confirmPassword: 'Password confirmation',
    congratulations: 'Congratulations!',
    createNewPassword: 'Create new password',
    email: 'Email',
    emailConfirmed: 'Your email has been confirmed',
    emailExpired: 'Email verification link expired',
    emailSent: 'Email sent',
    emailSentText: (email: string) => `We have sent a link to confirm your email to ${email}`,
    emailType: 'The email must match the format example@example.com',
    enterEmailInstructions: 'Enter your email address and we will send you further instructions',
    forgotPassword: 'Forgot Password?',
    haveAccount: 'Do you have an account?',
    incorrectFields: 'The email or password are incorrect. Try again please',
    invalidAuth: 'Invalid password or email',
    linkExpired: () => `Link expired`,
    linkExpiredDescription:
      'Looks like the link has expired. Not to worry, we can send the link again',
    linkSentByEmail:
      'The link has been sent by email.\nIf you don’t receive an email send link again',
    loginViaGithub: 'Login via GitHub',
    loginViaGoogle: 'Login via Google',
    maxCharsNumber: (maxChars: number) => `Maximum number of characters ${maxChars}`,
    minCharsNumber: (minChars: number) => `Minimum number of characters ${minChars}`,
    missingRecaptchaKey: 'Missing recaptcha key',
    newPassword: 'New password',
    noAccount: 'Don’t have an account?',
    ok: 'Ok',
    password: 'Password',
    passwordMatch: 'The passwords must match',
    passwordMustContain:
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~}',
    passwordRecovery: 'Password recovery',
    passwordRequirements: (minChars: number, maxChars: number) =>
      `Your password must be between ${minChars} and ${maxChars} characters`,
    privacyPolicy: 'Privacy Policy',
    registrationAgree: 'I agree to the <1>terms</1> and <2>policy</2>',
    resendLink: 'Resend verification link',
    sendLink: 'Send Link',
    sendLinkAgain: 'Send Link Again',
    signIn: 'Sign In',
    signInTitle: 'Sign In',
    signUp: 'Sign Up',
    signUpTitle: 'Sign Up',
    termsOfService: 'Terms of Service',
    userName: 'Username',
    userNameContains: 'Username may contain 0-9; A-Z; a-z; _; -',
  },
  input: {
    email: 'Enter your email',
    lastName: 'Enter your last name',
    name: 'Enter your first name',
    password: 'Enter your password',
    username: 'Enter your username',
  },
  myProfile: {
    follow: 'Follow',
    followers: 'Followers',
    following: 'Following',
    publications: 'Publications',
    sendMessage: 'Send Message',
    settings: 'Profile Settings',
    unfollow: 'Unfollow',
  },
  privacyPolicy: {
    introduction: `Welcome to Inctagram! Your privacy is important to us, and this policy explains how we collect, use, and protect your personal data. Please read it carefully.`,
    sections: {
      changesToPolicy: {
        description:
          'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.',
        title: '7. Changes to this Privacy Policy',
      },
      contactUs: {
        description:
          'If you have any questions or concerns about this Privacy Policy, please contact us at support@inctagram.com.',
        title: '8. Contact Us',
      },
      dataRetention: {
        description:
          'We will retain your information as long as it is necessary to provide you with our services or for other essential purposes such as complying with legal obligations.',
        title: '4. Data Retention',
      },
      informationCollection: {
        description: 'We collect the following types of information:',
        extra: [
          'Personal Information: such as your name, email address, and phone number when you sign up.',
          'Usage Data: information about how you use our platform, such as pages visited, actions taken, and other interaction details.',
        ],
        title: '1. Information We Collect',
      },
      securityMeasures: {
        description:
          'We take appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.',
        title: '6. Security of Your Information',
      },
      sharingInformation: {
        description: 'We may share your information with:',
        extra: [
          'Third-party service providers who assist us in providing and maintaining our services.',
          'Legal authorities if required by law or to protect our rights and safety.',
        ],
        title: '3. Sharing Your Information',
      },
      useOfInformation: {
        description: 'We use the collected information to:',
        extra: [
          'Provide, operate, and maintain our services.',
          'Improve, personalize, and expand our services.',
          'Communicate with you, either directly or through one of our partners, for customer service, updates, and other purposes.',
        ],
        title: '2. How We Use Your Information',
      },
      yourRights: {
        description: 'You have the right to:',
        extra: [
          'Access the personal data we hold about you.',
          'Request corrections to any inaccurate or incomplete information.',
          'Request the deletion of your data under certain circumstances.',
        ],
        title: '5. Your Rights',
      },
    },
    title: 'Privacy Policy',
  },
  settings: {
    addProfilePhoto: 'Add a Profile Photo',
    city: 'Select your city',
    country: 'Select your country',
    dateOfBirth: 'Date of birth',
    dateRequired: 'Date is required',
    devices: 'Devices',
    firstName: 'First Name',
    general: 'General Information',
    lastName: 'Last Name',
    management: 'Account management',
    me: 'About me',
    payments: 'My payments',
    save: 'Save Changes',
    username: 'Username',
  },
  sidebar: {
    create: 'Create',
    favorites: 'Favorites',
    home: 'Home',
    logout: 'Log out',
    messenger: 'Messenger',
    myProfile: 'My Profile',
    search: 'Search',
    statics: 'Statics',
  },
  termsOfService: {
    sections: {
      acceptanceOfTerms: {
        description:
          'By creating an account or using Inctagram, you agree to comply with these terms and conditions. If you do not agree, you should not use our services.',
        title: '1. Acceptance of Terms',
      },
      accountSecurity: {
        description:
          'You are responsible for maintaining the security of your account, including safeguarding your password. Inctagram is not liable for any losses caused by unauthorized use of your account.',
        title: '3. Account Creation and Security',
      },
      changes: {
        description:
          'We may update these terms from time to time. Continued use of Inctagram after any changes constitutes your acceptance of the new terms.',
        title: '11. Changes to the Terms',
      },
      disclaimers: {
        description:
          'Inctagram is provided on an "as is" basis without warranties of any kind. We do not guarantee that the service will be error-free or uninterrupted.',
        title: '9. Disclaimers',
      },
      eligibility: {
        description:
          'You must be at least 13 years old to use Inctagram. By using our platform, you confirm that you meet the minimum age requirement and that your account has not been previously suspended or terminated by us.',
        title: '2. Eligibility',
      },
      intellectualProperty: {
        description:
          'Inctagram retains all rights to its name, logo, and branding materials. You agree not to copy, modify, or distribute our intellectual property without explicit permission.',
        title: '7. Intellectual Property',
      },
      liability: {
        description:
          'To the fullest extent permitted by law, Inctagram will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the service.',
        title: '10. Limitation of Liability',
      },
      privacy: {
        description:
          'Your privacy is important to us. Please refer to our [Privacy Policy] for information on how we collect, use, and protect your personal data.',
        title: '5. Privacy',
      },
      prohibitedActivities: {
        description: 'You agree not to engage in the following prohibited activities:',
        hack: 'Attempting to hack or gain unauthorized access to the platform or other users’ accounts.',
        offensiveContent: 'Posting spam, unsolicited promotions, or offensive content.',
        purposes: 'Using the platform for any unlawful purposes.',
        title: '6. Prohibited Activities',
      },
      termination: {
        description:
          'Inctagram reserves the right to suspend or terminate your account at any time, with or without cause, and without prior notice.',
        title: '8. Termination',
      },
      userContent: {
        contentRemoval:
          'Content Removal: We reserve the right to remove any content that violates our guidelines.',
        description: `
            Inctagram allows users to upload, post, and share content. You retain ownership of your content but grant Inctagram a non-exclusive, royalty-free, worldwide license to use, modify, and distribute your content in connection with the services.
          `,
        prohibitedContent:
          'Prohibited Content: You agree not to post content that is illegal, harmful, or abusive.',
        title: '4. User Content',
      },
    },
    title: 'Welcome to Inctagram!',
    welcomeMessage:
      'By accessing or using our services, you agree to the following Terms of Service. Please read them carefully.',
  },
}

export type LocaleType = typeof en
