import { ReactNode } from 'react'

import AccountManagementsPage from '@/pages/profile/settings/accountManagementsPage'
import DevicesPage from '@/pages/profile/settings/devicesPage'
import GeneralInfoPage from '@/pages/profile/settings/generalInfoPage'
import MyPaymentsPage from '@/pages/profile/settings/myPaymentsPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@photo-fiesta/ui-lib'

import styles from './settings.module.scss'

type TabConfig = {
  content: ReactNode
  label: string
  value: string
}

const TABS_CONFIG: TabConfig[] = [
  { content: <GeneralInfoPage />, label: 'General Information', value: 'generalInformation' },
  { content: <DevicesPage />, label: 'Devices', value: 'devices' },
  { content: <AccountManagementsPage />, label: 'Account Management', value: 'accountManagement' },
  { content: <MyPaymentsPage />, label: 'My Payments', value: 'myPayments' },
]

/**
 * The Settings component renders a tabbed interface for managing user profile settings.
 * It uses the `@photo-fiesta/ui-lib` Tabs component to switch between different settings pages.
 *
 */
export const Settings = () => {
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
