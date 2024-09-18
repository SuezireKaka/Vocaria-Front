import { useContext, useState } from "react";
import ListViewer from "../../shared/util/ListViewer";
import Question from "../../widgets/question/Question";
import evaluateRequest from "../../features/mission/evaluateRequest";
import AppContext from "../../contexts/AppContextProvider";
import { useNavigate } from "react-router";

export default function QuestionManager({data = {questionList: []}}) {
    const {auth} = useContext(AppContext);

    const navigate = useNavigate();

    const questionSize = data.questionList.length;

    const [chooseList, setChooseList] = useState(data.questionList.map((_) => ""));
    const [chooseNumList, setChooseNumList] = useState(data.questionList.map((_) => 0));

    const [questNum, setQuestNum] = useState(0);

    console.log("선택지 상황 보여 줘", chooseList, chooseNumList)

    return <>
        <ListViewer
            list = {data.questionList}
            index={questNum}
            permitSymbol={"제출하기"}
            onSelect={(q, i) => <Question id={q.id}
                question={q.question}
                choiceList={q.choiceList}
                selectNum={chooseNumList[i]}
                onChoose={(choice, k) => {
                    setChooseList([...chooseList].map(
                        (origin, j) => i === j 
                        ? (chooseList[j] === choice ? "" : choice)
                        : origin));
                    setChooseNumList([...chooseNumList].map(
                        (origin, j) => i === j
                        ? (chooseNumList[j] === (k + 1) ? 0 : (k + 1))
                        : origin));
                }}
            />}
            onFirst={() => {setQuestNum(0)}}
            onPrev={() => {setQuestNum(Math.max(0, questNum - 1))}}
            onNext={() => {setQuestNum(Math.min(questNum + 1, questionSize - 1))}}
            onLast={() => {setQuestNum(Math.min(questionSize - 1))}}
            onPermit={(e) => {
                evaluateRequest(e, auth,
                    {questionIdList: data.questionList.map(q => q.id), chooseList: [...chooseList]},
                    (count) => {alert("점수 : " + count + "/" + questionSize)},
                    navigate
                )
            }}
        />
    </>
}