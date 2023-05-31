import "../styles/components/ProfileCard.scss"
import { Avatar } from "rsuite"
import { useAppSelector } from "../app/hooks"
import {HiLocationMarker} from "react-icons/hi"
import { capitalizeNames } from "../utils/capitalizeName"

export default function ProfileCard() {

    const {userInfo}:any = useAppSelector((state) => state.auth)
    const username = capitalizeNames(userInfo?.name)

  return (
    <div className="profilecard">
        <p className="title">Profile</p>
        <div className="profilecard-image">
            <img src={userInfo?.profilepicture} />
        </div>
        <div className="profilecard-details">
            <p className="name">{username}</p>
            <p className="bio">{userInfo?.bio}</p>
            <p className="address">
                <HiLocationMarker />
                {userInfo?.address}
            </p>
        </div>
    </div>
  )
}

