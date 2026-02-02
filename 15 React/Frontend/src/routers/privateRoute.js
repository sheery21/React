import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const privateRoute = ({role}) => {

    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)

     const privateRoute = {
    customer: "/user-login",
    bank_officer: "/bankOfficer-login",
    sbp_admin: "/admin-login",
  };
  return user ? role : navigate( privateRoute[role])
}

export default privateRoute