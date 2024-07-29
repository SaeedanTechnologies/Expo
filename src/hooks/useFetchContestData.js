import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getBehindScreen,
  getStartContest,
} from "../store/actions/contestStartActions";

const useFetchContestData = (
  id,
  setJudges,
  setScore,
  setParticipants,
  setAllJudges,
  setLoading,
  setAllScoresGiven,
  setFieldScores
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const startResult = await dispatch(getStartContest(id));
        const behindScreenResult = await dispatch(getBehindScreen(id));

        setJudges(startResult.data.data.judges);
        setScore(startResult.data.data.total_scores);
        setFieldScores(behindScreenResult?.data?.data?.total_scores);

        const filteredParticipants = startResult.data.data.participants.filter(
          (participant) => participant.is_judged === 0
        );

        setParticipants(
          filteredParticipants.map((participant) => {
            const fieldsValuesString = participant.fields_values.slice(1, -1);
            const fieldsValues = JSON.parse(
              fieldsValuesString.replace(/\\/g, "")
            );
            return { ...participant, ...fieldsValues }; 
          })
        );

        setAllJudges(startResult.data.data.participants);
        setLoading(false);

        const currentParticipantId = startResult.data.data.participants[0]?.id;
        const currentScores = startResult.data.data.total_scores.filter(
          (score) => score.participant_id === currentParticipantId
        );
        setAllScoresGiven(
          currentScores.length === startResult.data.data.judges.length
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchContestData();
  }, [dispatch, id]);
};

export default useFetchContestData;
