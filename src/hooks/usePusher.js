import { useEffect } from "react";
import Pusher from "pusher-js";

const usePusher = (contest_id, participants, setParticipants, setScore) => {
  useEffect(() => {
    const pusher = new Pusher("022c57db694789c9f227", {
      cluster: "ap2",
    });

    const participantChannel = pusher.subscribe(
      `participant-registration${contest_id}`
    );
    participantChannel.bind(
      "App\\Events\\ParticipantRegistered",
      function (data) {
        console.log(data, "PUSHERRRRRRRRRRRRRRRRRRRRRR");
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          data.participant,
        ]);
      }
    );

    const participantId = participants[0]?.id;
    let scoreChannel;
    if (participantId) {
      scoreChannel = pusher.subscribe(`score${participantId}`);
      scoreChannel.bind("App\\Events\\ScoreUpdated", function (data) {
        console.log(data, "PUSHER DATA+++++++++++++++++++");
        setScore((prevData) => [...prevData, data]);
      });
    }

    return () => {
      participantChannel.unsubscribe(`participant-registration${contest_id}`);
      if (scoreChannel) {
        scoreChannel.unsubscribe(`score${participantId}`);
      }
    };
  }, [contest_id, participants, setParticipants, setScore]);
};

export default usePusher;
