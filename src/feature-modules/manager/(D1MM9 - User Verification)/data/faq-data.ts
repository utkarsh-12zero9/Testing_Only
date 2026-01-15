export type FaqItem = {
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: "What is KYC verification?",
    answer:
      "KYC (Know Your Customer) verification is a process to authenticate your identity and bank details to ensure secure and legitimate transactions.",
  },
  {
    question: "Why is KYC verification necessary?",
    answer:
      "KYC verification is essential for: Ensuring secure payment processing. Validating the identity and legitimacy of gym managers. Complying with legal and financial regulations.",
  },
  {
    question: "What documents are required for KYC verification?",
    answer: "Personal Verification: Aadhar or Driving License. Bank Verification: Bank account details.",
  },
  {
    question: "How do I complete my KYC verification?",
    answer: "Make the required payment for KYC processing. Click the Start Verification button for both Personal and Bank Verification. Follow the instructions to complete verification via the secure vendor platform."
  },
  {
    question: "What happens after I complete the KYC verification process?",
    answer: 'Once verified:Your verification status will update to "Verified" on the summary page.You can securely handle payment transactions.'
  },
  {
    question: "What if my verification fails?",
    answer: 'If a step fails:The status will show "Failed." You can retry the verification process using the provided options.'
  }
]