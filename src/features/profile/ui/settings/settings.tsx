import AccountManagementsPage from '@/pages/profile/settings/accountManagementsPage'
import DevicesPage from '@/pages/profile/settings/devicesPage'
import GeneralInfoPage from '@/pages/profile/settings/generalInfoPage'
import MyPaymentsPage from '@/pages/profile/settings/myPaymentsPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@photo-fiesta/ui-lib'

import styles from './settings.module.scss'
export const Settings = () => {
  return (
    <div className={styles.settingsContainer}>
      <Tabs defaultValue={'generalInformation'}>
        <TabsList className={styles.tabsList}>
          <TabsTrigger className={styles.tabsTrigger} value={'generalInformation'}>
            {' '}
            General Information{' '}
          </TabsTrigger>
          <TabsTrigger className={styles.tabsTrigger} value={'devices'}>
            {' '}
            Devices{' '}
          </TabsTrigger>
          <TabsTrigger className={styles.tabsTrigger} value={'accountManagement'}>
            {' '}
            Account Management{' '}
          </TabsTrigger>
          <TabsTrigger className={styles.tabsTrigger} value={'myPayments'}>
            {' '}
            My payments{' '}
          </TabsTrigger>
        </TabsList>
        <TabsContent className={styles.tabsContent} value={'generalInformation'}>
          <GeneralInfoPage />
        </TabsContent>
        <TabsContent className={styles.tabsContent} value={'devices'}>
          <DevicesPage />
        </TabsContent>
        <TabsContent className={styles.tabsContent} value={'accountManagement'}>
          <AccountManagementsPage />
        </TabsContent>
        <TabsContent className={styles.tabsContent} value={'myPayments'}>
          <MyPaymentsPage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
