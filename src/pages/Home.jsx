import { useEffect, useState } from "react";
function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const x=setTimeout(()=>{
      setLoading(false);
    }, 1000);
    return()=>clearTimeout(x);
  },[]);
  if (loading){
    return <section><h2>Loading...</h2></section>;
  }
  return (
    <section>
      <h2>Welcome</h2>
      <p>Hello! I am Piyush Bansal, a CSE student at NIT Warangal.</p>
      <p>This is my portfolio.</p>
    </section>
  );
}
export default Home;