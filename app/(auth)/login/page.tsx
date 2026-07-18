'use client'

import { Input } from '@/components/ui/input'
import { loginService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Login = () => {
  const [invalid, setInvalid] = useState(false)
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex flex-col w-[30vw] mt-0 m-auto gap-5 h-screen justify-center items-center">
      <p className={`${!invalid ? 'invisible' : 'visible'} text-red-800`}>
        Invalid Login or Password
      </p>
      <Input
        placeholder="Username"
        value={login}
        onChange={(e) => {
          setLogin(e.target.value)
          setInvalid(false)
        }}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setInvalid(false)
        }}
      />
      <div className="bg-purple-950 border flex justify-center items-center w-[30vw] h-fit">
        <button
          className="w-full cursor-pointer"
          onClick={async () => {
            if (password.length !== 0 && login.length !== 0) {
              const user = await loginService(login, password)
              if (user) {
                setUser({
                  id: user.id,
                  username: user.username,
                  avatar: user.avatar,
                })
                router.push('/')
              } else {
                setInvalid(true)
              }
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
