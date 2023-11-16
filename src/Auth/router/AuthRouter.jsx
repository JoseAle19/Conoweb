import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "../Register";
import { Login } from "../Login";
export const AuthRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/*" element={<Navigate to={'login'}/>} />
    </Routes>

  )
}
