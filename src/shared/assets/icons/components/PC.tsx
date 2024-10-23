import { SVGProps } from 'react'

const PC = (props: SVGProps<SVGSVGElement>) => (
  <svg fill={'none'} height={36} width={36} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path
      d={
        'M31.5 3h-27c-1.65 0-3 1.35-3 3v18c0 1.65 1.35 3 3 3H15l-3 4.5V33h12v-1.5L21 27h10.5c1.65 0 3-1.35 3-3V6c0-1.65-1.35-3-3-3Zm0 18h-27V6h27v15Z'
      }
      fill={'#fff'}
    />
  </svg>
)

export default PC
