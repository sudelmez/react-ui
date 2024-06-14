import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/button/custom-button";
import "./not_found.css";
function NotFoundView() {
    const navigate = useNavigate();
    return (
        <div className="NotFound">
            <h1>The page you are trying to access is not allowed!</h1>
            <CustomButton title={"Log In"} handlePress={() => { navigate('/auth') }}></CustomButton>
        </div>
    );
}
export default NotFoundView;