import { getLayout } from '@/components/layout/layout'

function Home() {
  return (
    <div
      style={{
        color: 'var(--accent-100)',
        fontSize: 'var(--font-size-l)',
        fontWeight: 'var(--font-weight-bold)',
      }}
    >
      home
    </div>
  )
}

Home.getLayout = getLayout
export default Home
