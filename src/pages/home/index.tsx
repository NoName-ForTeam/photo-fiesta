import { getLayout } from '@/components/layout/layout'
import { Button, Checkbox, Select } from '@photo-fiesta/ui-lib'

function Home() {
  return (
    <div
      style={{
        color: 'var(--accent-100)',
        fontSize: 'var(--font-size-l)',
        fontWeight: 'var(--font-weight-bold)',
      }}
    >
      <Button variant={'primary'}>Primary</Button>
      <Checkbox />
      <Select />
    </div>
  )
}

Home.getLayout = getLayout
export default Home
