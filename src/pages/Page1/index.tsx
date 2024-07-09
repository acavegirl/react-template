import { useUserStore } from "@/store/user"
import { userStateValtio, setUserInfoValtio, incAgeValtio } from "@/store/ValtioUser"
import { Button, Flex } from "antd"
import { useEffect } from "react"
import { useSnapshot } from "valtio"

export default () => {
  const { userName, userEmail, setUserInfo, incAge, userAge: {value: ageValue} } = useUserStore((state) => ({
    userName: state.name,
    userEmail: state.email,
    userAge: state.age,
    setUserInfo: state.setUserInfo,
    incAge: state.incAge,
  }))

  const stateValtio = useSnapshot(userStateValtio)

  const changeUser = () => {
    setUserInfo({
      name: `name ${Math.random()}`,
      email: `${Math.random()}@aa.com`,
    })
    incAge()

    setUserInfoValtio({
      name: `name ${Math.random()}`,
      email: `${Math.random()}@aa.com`,
    })
    incAgeValtio()
  }
  
  // useEffect(()=>{
  //   console.log(userName, userEmail)
  // }, [userName])
  return (<>
    <p>page 1</p>
    <Flex>
      <div>
        <p>zustand</p>
        <p>name: {userName}</p>
        <p>email: {userEmail}</p>
        <p>年龄: {ageValue}</p>
      </div>

      <div>
        <p>valtio</p>
        <p>name: {stateValtio.name}</p>
        <p>email: {stateValtio.email}</p>
        <p>年龄: {stateValtio.age.value}</p>
      </div>
    </Flex>
    
    
    <Button onClick={changeUser}>
      Change
    </Button>
  </>)
}