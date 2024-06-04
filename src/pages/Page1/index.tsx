import { useUserStore } from "@/store/user"
import { Button } from "antd"
import { useEffect } from "react"

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
  return (<>
    <p>page 1</p>
    <p>name: {userName}</p>
    <p>email: {userEmail}</p>
    <Button onClick={changeUser}>
      Change
    </Button>
  </>)
}