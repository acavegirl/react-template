import { useUserStore } from "@/store/user"

export default () => {
  const { userName, userEmail } = useUserStore((state) => ({
    userName: state.name,
    userEmail: state.email,
  }))
  return (<>
    <p>page 2</p>
    <p>name: {userName}</p>
    <p>email: {userEmail}</p>
  </>)
}