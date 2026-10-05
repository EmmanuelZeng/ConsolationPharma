import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { useId, useState } from 'react'

type PasswordInputProps = {
  id?: string
  name: string
  placeholder?: string
  autoComplete?: string
  invalid?: boolean
  showLeadingIcon?: boolean
  className?: string
}

export default function PasswordInput({
  id: idProp,
  name,
  placeholder,
  autoComplete,
  invalid,
  showLeadingIcon = true,
  className = '',
}: PasswordInputProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const [visible, setVisible] = useState(false)

  return (
    <div className={`field-with-icon field-with-icon--password ${className}`.trim()}>
      {showLeadingIcon && (
        <LockKeyhole size={16} className="field-with-icon__icon" aria-hidden />
      )}
      <input
        id={id}
        name={name}
        type={visible ? 'text' : 'password'}
        className="field__input field-with-icon__input field-with-icon__input--password"
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={invalid ? 'true' : 'false'}
      />
      <button
        type="button"
        className="field-password-toggle"
        onClick={() => setVisible((value) => !value)}
        aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        aria-pressed={visible}
      >
        {visible ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
      </button>
    </div>
  )
}
