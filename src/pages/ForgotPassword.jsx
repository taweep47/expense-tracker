import { useState } from "react"
import useAuth from "../auth/useAuth"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [done, setDone] = useState(false)
  const { forgotPassword } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    await forgotPassword(email, password)
    setDone(true)
  }

  return (
    <AuthLayout title="Reset password">
      {done ? (
        <p className="text-sm text-green-600">
          Password updated. You can login now.
        </p>
      ) : (
        <form onSubmit={submit}>
          <Input placeholder="Email" onChange={setEmail} />
          <Input
            type="password"
            placeholder="New password"
            onChange={setPassword}
          />
          <button className="btn-primary">Reset</button>
        </form>
      )}
    </AuthLayout>
  )
}

export default ForgotPassword
