import { Tabs, TabsContent, TabsList, TabsTrigger } from '@photo-fiesta/ui-lib'

import styles from './settings.module.scss'

import { useSettingsTabs } from './useSettingsTabs'

/**
 * The Settings component renders a tabbed interface for managing user profile settings.
 * It uses the `@photo-fiesta/ui-lib` Tabs component to switch between different settings pages.
 *
 */
export const Settings = () => {
  const { TABS_CONFIG, currentTab, setCurrentTab } = useSettingsTabs()

  return (
    <div className={styles.settingsContainer}>
      <Tabs onValueChange={setCurrentTab} value={currentTab}>
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
