export interface Option {
  value: string;
  label: string;
}

export interface SharedInputComponentProps {
  name: string;
  value: string;
  error?: string;
  onChange: ({ name, value, type }: { name: string, value: string, type?: string }) => void;
  label: string;
  placeholder?: string;
  optional?: string;
}