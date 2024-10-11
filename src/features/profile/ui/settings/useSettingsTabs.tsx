/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from 'react'

import AccountManagementsPage from '@/pages/profile/settings/accountManagementsPage'
import DevicesPage from '@/pages/profile/settings/devicesPage'
import GeneralInfoPage from '@/pages/profile/settings/generalInfoPage'
import MyPaymentsPage from '@/pages/profile/settings/myPaymentsPage'
import { useTranslation } from '@/shared/utils'
import { useRouter } from 'next/router'

type TabConfig = {
  content: ReactNode
  label: string
  value: string
}

export const useSettingsTabs = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const TABS_CONFIG: TabConfig[] = [
    { content: <GeneralInfoPage />, label: t.settings.general, value: 'generalInformation' },
    { content: <DevicesPage />, label: t.settings.devices, value: 'devices' },
    {
      content: <AccountManagementsPage />,
      label: t.settings.management,
      value: 'accountManagement',
    },
    { content: <MyPaymentsPage />, label: t.settings.payments, value: 'myPayments' },
  ]

  const [currentTab, setCurrentTab] = useState(TABS_CONFIG[0].value)

  // check if the ?success parameter is present in the URL
  useEffect(() => {
    if ('success' in router.query) {
      setCurrentTab('accountManagement') // set the current tab to "Account Management"
    }
  }, [router.query.success])

  return { TABS_CONFIG, currentTab, setCurrentTab }
}
