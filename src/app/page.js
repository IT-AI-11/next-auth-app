


//import Image from "next/image";
//import styles from "./page.module.css";



const response = await fetch(`http://localhost:3000/api/users/create`,

  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'test user1',
      email: 'test@test1.com',
    })
  });
  
  const data = response.json()
  console.log(data)




export default function Home() {








  return (
    <div >
         <h1> 777 MY MY HOME page, Auth project with YT Sahand</h1>
         <h2>h2 tag added for testing</h2>
         <h3>h3 testing</h3>
         <h4>h4 testing h4</h4>

         <h4>h4 testing 22222</h4>

         <h4>h4 h4 h4 TEST</h4>
    </div>
  );
}



