import { GetPostByUsernameResponse } from '@/features'
import { ProfileAvatar } from '@/shared/ui'
import { Typography } from '@photo-fiesta/ui-lib'

import s from './resultList.module.scss'

type Props = {
  data: GetPostByUsernameResponse | null
}

const ResultList = ({ data }: Props) => {
  const classNames = {
    fullName: s.fullName,
    img: s.img,
    wrapper: s.wrapper,
  } as const

  return data?.items.length
    ? data?.items.map(item => (
        <div className={classNames.wrapper} key={item.id}>
          <ProfileAvatar avatarOwner={item.avatarOwner} className={classNames.img} />
          <div>
            <Typography variant={'textMedium14'}>{item.userName}</Typography>
            <Typography className={classNames.fullName} variant={'text14'}>
              {item.owner.firstName} {item.owner.lastName}
            </Typography>
          </div>
        </div>
      ))
    : ''
}

export default ResultList
