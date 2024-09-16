export const ru = {
  auth: {
    backToSignIn: 'Вернуться к входу',
    backToSignUp: 'Вернуться к регистрации',
    confirmPassword: 'Подтверждение пароля',
    congratulations: 'Поздравляем!',
    createNewPassword: 'Создание нового пароля',
    email: 'Почта',
    emailConfirmed: 'Ваш адрес электронной почты подтвержден',
    emailExpired: 'Срок действия ссылки для подтверждения электронной почты истек',
    emailSent: 'Письмо отправлено',
    emailSentText: (email: string) =>
      `Мы отправили ссылку для подтверждения вашего адреса электронной почты на ${email}`,
    emailType: 'Адрес почты должен соответствовать формату example@example.com',
    enterEmailInstructions:
      'Введите свой адрес электронной почты и мы вышлем вам дальнейшие инструкции',
    forgotPassword: 'Забыл пароль?',
    haveAccount: 'У вас есть аккаунт?',
    incorrectFields: 'Адрес электронной почты или пароль неверны. Попробуйте еще раз, пожалуйста',
    invalidAuth: 'Неверный пароль или адрес электронной почты',
    linkExpired: () => `Ссылка устарела`,
    linkExpiredDescription:
      'Похоже, срок действия ссылки для проверки истек. Не волнуйтесь, мы можем отправить ссылку еще раз',
    linkSentByEmail:
      'Ссылка была отправлена по электронной почте.\nЕсли вы не получили ссылку по электронной почте, отправьте её еще раз',
    loginViaGithub: 'Вход через GitHub',
    loginViaGoogle: 'Вход через Google',
    maxCharsNumber: (maxChars: number) => `Максимальное количество символов  ${maxChars}`,
    minCharsNumber: (minChars: number) => `Минимальное количество символов ${minChars}`,
    missingRecaptchaKey: 'Отсутствует ключ рекапчи',
    newPassword: 'Новый пароль',
    noAccount: 'Нет аккаунта?',
    password: 'Пароль',
    passwordMatch: 'Пароли должны совпадать',
    passwordMustContain:
      'Пароль должен содержать 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~}',
    passwordRecovery: 'Восстановление пароля',
    passwordRequirements: (minChars: number, maxChars: number) =>
      `Ваш пароль должен содержать от ${minChars} до ${maxChars} символов`,
    privacyPolicy: 'Политика конфиденциальности',
    registrationAgree: 'Я согласен с <1>terms</1> и <2>policy</2>',
    resendLink: 'Повторно отправить ссылку для подтверждения',
    sendLink: 'Отправить ссылку',
    sendLinkAgain: 'Отправить ссылку повторно',
    signIn: 'Войти',
    signInTitle: 'Вход',
    signUp: 'Зарегистрироваться',
    signUpTitle: 'Регистрация',
    termsOfService: 'Условия пользования',
    userName: 'Имя пользователя',
    userNameContains: 'Имя пользователя должно содержать 0-9; A-Z; a-z; _; -',
  },
  getPlaceholder: (title: string) => `Введите свой ${title}`,
}

export type LocaleType = typeof ru
