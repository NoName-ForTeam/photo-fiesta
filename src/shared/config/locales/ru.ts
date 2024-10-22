import { LocaleType } from './en'

export const ru: LocaleType = {
  auth: {
    backToSignIn: 'Вернуться к входу',
    backToSignUp: 'Вернуться к регистрации',
    confirm: 'Повторите пароль',
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
    ok: 'ДА',
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
  input: {
    email: 'Введите свою почту',
    lastName: 'Введите свою фамилию',
    name: 'Введите свое имя',
    password: 'Введите свой пароль',
    username: 'Укажите свой никнейм',
  },
  myPayments: {
    dateOfPayment: 'Дата оплаты',
    endDateOfPayment: 'Последний день подписки',
    paymentType: 'Тип оплаты',
    price: 'Цена',
    subscriptionType: 'Тип подписки',
  },
  myProfile: {
    follow: 'Подписаться',
    followers: 'Подписчики',
    following: 'Подписки',
    publications: 'Публикации',
    sendMessage: 'Отправить сообщение',
    settings: 'Настройки профиля',
    unfollow: 'Отписаться',
  },
  no: 'Нет',
  post: {
    addTitle: 'Добавить фотографию профиля',
    close: 'Закрыть Пост',
    closeCreate:
      'Вы действительно хотите закрыть создание публикации? Если закроете, всё будет удалено.',
    contentClose:
      'Вы действительно хотите закрыть редактирование публикации? Если закроете, изменения не будут сохранены',
    delete: 'Удалить пост',
    deleteContent: 'Вы уверены, что хотите удалить этот пост?',
    next: 'Далее',
    noSelected: 'Файл не выбран',
    publish: 'Опубликовать',
    save: 'Сохранить',
    selectBtn: 'Выбрать файл',
  },
  privacyPolicy: {
    introduction: `Добро пожаловать в Inctagram! Ваша конфиденциальность важна для нас. В этой политике объясняется, как мы собираем, используем и защищаем ваши персональные данные. Пожалуйста, ознакомьтесь с ней внимательно.`,
    sections: {
      changesToPolicy: {
        description:
          'Мы можем время от времени обновлять эту Политику конфиденциальности. Любые изменения будут опубликованы на этой странице с обновленной датой пересмотра.',
        title: '7. Изменения в этой политике конфиденциальности',
      },
      contactUs: {
        description:
          'Если у вас есть вопросы или проблемы по поводу этой Политики конфиденциальности, свяжитесь с нами по адресу support@inctagram.com.',
        title: '8. Свяжитесь с нами',
      },
      dataRetention: {
        description:
          'Мы будем хранить вашу информацию, пока она необходима для предоставления наших услуг или выполнения других важнейших целей, таких как соблюдение юридических обязательств.',
        title: '4. Срок хранения данных',
      },
      informationCollection: {
        description: 'Мы собираем следующие виды информации:',
        extra: [
          'Персональная информация: такие как ваше имя, адрес электронной почты и номер телефона при регистрации.',
          'Данные о использовании: информация о том, как вы используете нашу платформу, включая посещаемые страницы, выполняемые действия и другие детали взаимодействия.',
        ],
        title: '1. Информация, которую мы собираем',
      },
      securityMeasures: {
        description:
          'Мы принимаем соответствующие меры безопасности для защиты вашей информации от несанкционированного доступа, изменения, раскрытия или уничтожения. Однако ни один метод передачи данных через интернет не является полностью безопасным.',
        title: '6. Безопасность вашей информации',
      },
      sharingInformation: {
        description: 'Мы можем передавать вашу информацию:',
        extra: [
          'Третьим лицам, предоставляющим нам услуги по поддержке и обслуживанию платформы.',
          'Правоохранительным органам, если это требуется по закону или для защиты наших прав и безопасности.',
        ],
        title: '3. Как мы делимся вашей информацией',
      },
      useOfInformation: {
        description: 'Мы используем собранную информацию для:',
        extra: [
          'Предоставления, работы и поддержания наших услуг.',
          'Улучшения, персонализации и расширения наших услуг.',
          'Связи с вами напрямую или через наших партнеров для обслуживания клиентов, обновлений и других целей.',
        ],
        title: '2. Как мы используем вашу информацию',
      },
      yourRights: {
        description: 'У вас есть право:',
        extra: [
          'Получать доступ к персональным данным, которые мы храним о вас.',
          'Запрашивать исправления неточной или неполной информации.',
          'Требовать удаления ваших данных при определённых обстоятельствах.',
        ],
        title: '5. Ваши права',
      },
    },
    title: 'Политика конфиденциальности',
  },
  settings: {
    addProfilePhoto: 'Добавить фото',
    city: 'Выбери свой город',
    country: 'Выбери свою страну',
    dateOfBirth: 'Дата рождения',
    dateRequired: 'Дата обязательна',
    devices: 'Устройства',
    firstName: 'Имя',
    general: 'Основная информация',
    lastName: 'Фамилия',
    management: 'Управление аккаунтом',
    me: 'Обо мне',
    payments: 'Мои платежи',
    save: 'Сохранить изменения',
    username: 'Никнейм',
  },
  sidebar: {
    create: 'Создать',
    favorites: 'Избранное',
    home: 'Главная',
    logout: 'Выход',
    messenger: 'Сообщения',
    myProfile: 'Мой профиль',
    search: 'Поиск',
    statics: 'Статистика',
  },
  termsOfService: {
    sections: {
      acceptanceOfTerms: {
        description:
          'Создавая аккаунт или используя Inctagram, вы соглашаетесь соблюдать эти условия. Если вы не согласны, вам не следует использовать наши услуги.',
        title: '1. Принятие условий',
      },
      accountSecurity: {
        description:
          'Вы несете ответственность за безопасность своего аккаунта, включая защиту пароля. Inctagram не несет ответственности за убытки, вызванные несанкционированным использованием вашего аккаунта.',
        title: '3. Создание аккаунта и безопасность',
      },
      changes: {
        description:
          'Мы можем вносить изменения в эти условия. Продолжение использования Inctagram после изменений считается вашим согласием с новыми условиями.',
        title: '11. Изменения условий',
      },
      disclaimers: {
        description:
          'Inctagram предоставляется "как есть" без каких-либо гарантий. Мы не гарантируем, что услуги будут предоставляться без ошибок или перебоев.',
        title: '9. Отказ от ответственности',
      },
      eligibility: {
        description:
          'Вам должно быть не менее 13 лет для использования Inctagram. Используя нашу платформу, вы подтверждаете, что соответствуете возрастному требованию и что ваш аккаунт не был ранее заблокирован или удалён.',
        title: '2. Право на использование',
      },
      intellectualProperty: {
        description:
          'Inctagram сохраняет все права на своё название, логотип и материалы бренда. Вы соглашаетесь не копировать, модифицировать или распространять нашу интеллектуальную собственность без явного разрешения.',
        title: '7. Интеллектуальная собственность',
      },
      liability: {
        description:
          'В максимальной степени, разрешенной законом, Inctagram не несет ответственности за любые прямые, косвенные или побочные убытки, возникающие в результате использования сервиса.',
        title: '10. Ограничение ответственности',
      },
      privacy: {
        description:
          'Наша конфиденциальность важна для нас. Пожалуйста, ознакомьтесь с нашей [Политикой конфиденциальности], чтобы узнать, как мы собираем, используем и защищаем ваши данные.',
        title: '5. Конфиденциальность',
      },
      prohibitedActivities: {
        description: 'Вы соглашаетесь не заниматься следующими запрещенными действиями:',
        hack: 'Попытки взлома или несанкционированного доступа к платформе или аккаунтам других пользователей.',
        offensiveContent: 'Размещение спама, рекламных материалов или оскорбительного контента.',
        purposes: 'Использование платформы для незаконных целей.',
        title: '6. Запрещенные действия',
      },
      termination: {
        description:
          'Inctagram оставляет за собой право приостановить или удалить ваш аккаунт в любое время, с или без причины и без предварительного уведомления.',
        title: '8. Прекращение использования',
      },
      userContent: {
        contentRemoval:
          'Удаление контента: Мы оставляем за собой право удалять контент, который нарушает наши правила.',
        description: `
            Inctagram позволяет пользователям загружать, публиковать и делиться контентом. Вы сохраняете права собственности на свой контент, но предоставляете Inctagram неисключительную, бесплатную лицензию на использование и распространение вашего контента.
          `,
        prohibitedContent:
          'Запрещенный контент: Вы соглашаетесь не размещать незаконный, вредоносный или оскорбительный контент.',
        title: '4. Контент пользователя',
      },
    },
    title: 'Добро пожаловать в Inctagram!',
    welcomeMessage:
      'Используя наши услуги, вы соглашаетесь с настоящими Условиями использования. Пожалуйста, внимательно ознакомьтесь с ними.',
  },
  yes: 'Да',
}
