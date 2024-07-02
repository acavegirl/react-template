import { useUserStore } from "@/store/user"
import { Button } from "antd"
import { useEffect } from "react"
import FMStatistics from "@/components/FMStatistics"

export default () => {
  const { userName, userEmail, setUserInfo } = useUserStore((state) => ({
    userName: state.name,
    userEmail: state.email,
    setUserInfo: state.setUserInfo
  }))

  const changeUser = () => {
    setUserInfo({
      name: `name ${Math.random()}`,
      email: `${Math.random()}@aa.com`,
    })
  }
  
  useEffect(()=>{
    console.log(userName, userEmail)
  }, [userName])
  return (
    <>
      <div style={{padding: 20}}>
        <FMStatistics></FMStatistics>
      </div>
    </>
  )
}