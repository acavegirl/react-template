import { useUserStore } from "@/store/user"
import { userStateValtio, setUserInfoValtio } from "@/store/ValtioUser"
import { Flex } from "antd"
import { useEffect } from "react"
import { useSnapshot } from "valtio"

export default () => {
  const { userName, userEmail, setUserInfo, userAge: {value: ageValue} } = useUserStore((state) => ({
    userName: state.name,
    userEmail: state.email,
    userAge: state.age,
    setUserInfo: state.setUserInfo
  }))

  const stateValtio = useSnapshot(userStateValtio)

  const changeUser = () => {
    setUserInfo({
      name: `name ${Math.random()}`,
      email: `${Math.random()}@aa.com`,
    })

    setUserInfoValtio({
      name: `name ${Math.random()}`,
      email: `${Math.random()}@aa.com`,
    })
  }


  return (<>
    <p>page 2</p>
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
  </>)
}