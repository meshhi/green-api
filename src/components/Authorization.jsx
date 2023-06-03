import { useRef } from "react";
import { useNavigate } from "react-router";

const Authorization = () => {
    const navigate = useNavigate();

    const tokenRef = useRef();
    const instanceRef = useRef();

    const setTokens = () => {
        localStorage.setItem("token", tokenRef.current.value);
        localStorage.setItem("instance", instanceRef.current.value);
        navigate('/chats');
    };

    return(
        <div>
            <input type="text" name="" id="" placeholder="token" ref={tokenRef}/>
            <input type="text" name="" id="" placeholder="instance" ref={instanceRef}/>
            <button onClick={setTokens}>Authorize</button>
            <button onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("instance");
            }}>Clear tokens</button>
        </div>
    )
};

export default Authorization;