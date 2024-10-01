import { ReactNode } from 'react'

import AccountManagementsPage from '@/pages/profile/settings/accountManagementsPage'
import DevicesPage from '@/pages/profile/settings/devicesPage'
import GeneralInfoPage from '@/pages/profile/settings/generalInfoPage'
import MyPaymentsPage from '@/pages/profile/settings/myPaymentsPage'
import { useTranslation } from '@/shared/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@photo-fiesta/ui-lib'

import styles from './settings.module.scss'

type TabConfig = {
  content: ReactNode
  label: string
  value: string
}

/**
 * The Settings component renders a tabbed interface for managing user profile settings.
 * It uses the `@photo-fiesta/ui-lib` Tabs component to switch between different settings pages.
 *
 */
export const Settings = () => {
  const { t } = useTranslation()

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

  return (
    <div className={styles.settingsContainer}>
      <Tabs defaultValue={TABS_CONFIG[0].value}>
        <TabsList className={styles.tabsList}>
          {TABS_CONFIG.map(tab => (
            <TabsTrigger className={styles.tabsTrigger} key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS_CONFIG.map(tab => (
          <TabsContent className={styles.tabsContent} key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
