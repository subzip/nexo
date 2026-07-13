'use client'

import { useAuthStore } from '@/store/auth.store'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-purple-950 border flex justify-center items-center w-[30vw] h-fit">
        <button
          onClick={() => {
            setUser({
              id: 'dc46cf3f-5a80-465d-965f-a5ebdbd995b3',
              username: 'subzip',
              avatar: '/avatar.svg',
            })
            document.cookie = 'user=subzip'
            router.push('/')
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
