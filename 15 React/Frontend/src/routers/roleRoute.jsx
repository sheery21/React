// import { useSelector } from "react-redux";

// const RoleRoute = ({ children, role }) => {
//   const { user } = useSelector((state) => state.auth);

//   if (!user) return <Navigate to="/login" />;
//   if (user.role !== role) return <Navigate to="/unauthorized" />;

//   return children;
// };

// export default RoleRoute