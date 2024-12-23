import { useNavigate } from "react-router";
import { useEffect } from "react";
import CommonLayout from "../CommonLayout/CommonLayout";
import Hero from "../Hero/Hero";
function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
        }
      }, [navigate]); 
    return (
       <CommonLayout>
        <Hero/>
        </CommonLayout>
    );
}

export default Home;