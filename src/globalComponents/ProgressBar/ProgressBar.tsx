"use client"
import styles from './ProgressBar.module.css'
// import Logo1 from './icons/1.svg'

import { Check, FileText, BadgeCheck, Crown, Globe } from "lucide-react"

export default function ProgressBar({ currentStep = 2 }) {
  const steps = [
    { icon: <Check className="w-4 h-4"/>, label: "Verified" },
    { icon: <FileText className="w-4 h-4" />, label: "Documents" },
    { icon: <BadgeCheck className="w-4 h-4" />, label: "Approval" },
    { icon: <Crown className="w-4 h-4" />, label: "Premium" },
    { icon: <Globe className="w-4 h-4" />, label: "Publish" },
  ]

  return (
    <div className={`${styles.container} flex items-center justify-center`}>
      {steps.map((step, index) => {
        const isActive = index < currentStep
        const isCurrent = index === currentStep

        return (
          <div key={index} className="flex items-center w-full">
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center rounded-full w-10 h-10 border-2 transition-colors
                ${isActive || isCurrent
                  ? 'bg-[var(--icons-primary-green)] border-[var(--icons-primary-green)] text-black'
                  : 'bg-[var(--icons-very-light-gray)] border-[var(--icons-very-light-gray)] text-gray-500'}
              `}
            >
              {step.icon}
              {/* <Logo1/> */}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-full flex-1 h-[5px] ${
                  isActive ? 'bg-[var(--icons-primary-green)]' : 'bg-[var(--icons-very-light-gray)]'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
