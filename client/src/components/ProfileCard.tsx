
import { Avatar } from "rsuite"
import { useAppSelector } from "../app/hooks"

export default function ProfileCard() {

    const {userInfo} = useAppSelector((state) => state.auth)

  return (
    <div className="userProfileCard">
    </div>
  )
}

