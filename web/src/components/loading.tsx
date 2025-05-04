import type { SVGProps } from 'react'

export const Loading = (props: SVGProps<SVGSVGElement>) => (
  <svg width={60} height={60} viewBox="0 0 50 50" {...props}>
    <title>{'loading'}</title>
    <path stroke="#4D505C" strokeLinecap="round" strokeWidth={3} d="M25 10v5">
      <animate
        attributeName="opacity"
        begin="0s"
        dur="1.2s"
        repeatCount="indefinite"
        values="0.2;1;0.2"
      />
    </path>
    <path
      stroke="#4D505C"
      strokeLinecap="round"
      strokeWidth={3}
      d="M35.607 14.393 32.07 17.93"
    >
      <animate
        attributeName="opacity"
        begin="0.15s"
        dur="1.2s"
        repeatCount="indefinite"
        values="0.2;1;0.2"
      />
    </path>
    <path stroke="#4D505C" strokeLinecap="round" strokeWidth={3} d="M40 25h-5">
      <animate
        attributeName="opacity"
        begin="0.3s"
        dur="1.2s"
        repeatCount="indefinite"
        values="0.2;1;0.2"
      />
    </path>
    <path
      stroke="#4D505C"
      strokeLinecap="round"
      strokeWidth={3}
      d="M35.607 35.607 32.07 32.07"
    >
      <animate
        attributeName="opacity"
        begin="0.44999999999999996s"
        dur="1.2s"
        repeatCount="indefinite"
        values="0.2;1;0.2"
      />
    </path>
    <path stroke="#4D505C" strokeLinecap="round" strokeWidth={3} d="M25 40v-5">
      <animate
        attributeName="opacity"
        begin="0.6s"
        dur="1.2s"
        repeatCount="indefinite"
        values="0.2;1;0.2"
      />
    </path>
    <path
      stroke="#4D505C"
      strokeLinecap="round"
      strokeWidth={3}
      d="m14.393 35.607 3.536-3.536"
    >
      <animate
        attributeName="opacity"
        begin="0.75s"
        dur="1.2s"
        repeatCount="indefinite"
        values="0.2;1;0.2"
      />
    </path>
    <path stroke="#4D505C" strokeLinecap="round" strokeWidth={3} d="M10 25h5">
      <animate
        attributeName="opacity"
        begin="0.8999999999999999s"
        dur="1.2s"
        repeatCount="indefinite"
        values="0.2;1;0.2"
      />
    </path>
    <path
      stroke="#4D505C"
      strokeLinecap="round"
      strokeWidth={3}
      d="m14.393 14.393 3.536 3.536"
    >
      <animate
        attributeName="opacity"
        begin="1.05s"
        dur="1.2s"
        repeatCount="indefinite"
        values="0.2;1;0.2"
      />
    </path>
  </svg>
)
