import Head from "next/head";

export default function UnderConstruct(){
    return <main className="flex flex-col justify-center h-[100vh] w-full">
        <Head>
            <title>BatchPost - under construction</title>
            </Head> 
        <h1>BatchPost is under construction</h1>
        <h2>Schelude your posts and send them into batchs.</h2>
        <p>If you want to be the first to use our service, register now ! We will send you a mail when the service is ready</p>
        <input type="text"/>
        <button onClick={()=>{
            
        }}>Contact me when ready</button>
    </main>
}