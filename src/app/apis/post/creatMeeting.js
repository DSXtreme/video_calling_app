"use client"
export const createMeeting = async () => {
  try{
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        authorization: `${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    //Destructuring the roomId from the response
    const { roomId } = await res.json();
    return roomId;
  }
  catch(e){
    console.log(e)
    window.alert("Could not join meeting. Plesase try again.")
  }
   
 
}