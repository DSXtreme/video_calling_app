"use client"

import {
  MeetingProvider
} from "@videosdk.live/react-sdk";
import { useState } from "react";
import { createMeeting } from "./apis/post/creatMeeting";
import JoinScreen from "./components/JoinScreen";
import MeetingView from "./components/MeetingView";



function App() {
  const [meetingId, setMeetingId] = useState(null);
  const [userName, setUserName] = useState("")

  //Getting the meeting id by calling the api we just wrote
  const getMeeting = async (id) => {
    const meetingId =
      id == null ? await createMeeting() : id;
    setMeetingId(meetingId);
  };

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return meetingId ? (
    
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: userName,
      }}
      token={`${process.env.NEXT_PUBLIC_AUTH_TOKEN}`}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen 
      getMeeting={getMeeting} 
      setUserName={setUserName}
      userName = {userName}
    />
  );
}

export default App;