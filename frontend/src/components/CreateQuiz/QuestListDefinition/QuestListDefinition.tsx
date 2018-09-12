import * as React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider/Divider";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import OptionsListDefinition from "../OptionsListDefinition/OptionsListDefinition";
import Button from "@material-ui/core/Button/Button";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {IQuestion} from "../../../types/question";
import {IOption} from "../../../types/option";

import './QuestListDefinition.css';

interface IQuestListDefinition {
  questions: any,
  changeQuestionName(question: IQuestion): any,
  addOption(question: IQuestion): any,
  deleteQuestion(question: IQuestion): any,
  changeOptionName(option: IOption, QuestionId: number): any,
  markAsAnswer(option: IOption, questionId: number): any,
  deleteOption(option: IOption, questionId: number): any
}

const QuestListDefinition = (props: IQuestListDefinition) => {
  const { questions } = props;

  return questions.map((question: IQuestion, index: number) => (
    <ExpansionPanel key={index}>
      <ExpansionPanelSummary className="panel-head" expandIcon={<ExpandMoreIcon/>}>
        <div className="panel-head-container">
          <div>{index + 1}.</div>
          <div>
            <input type="text" value={question.title} onChange={props.changeQuestionName(question)}/>
          </div>
        </div>
      </ExpansionPanelSummary>
      <Divider />
      <ExpansionPanelDetails className="panel-body">
        <div className="options-container">
          <table className="options">
            <thead>
            <tr>
              <td>№</td>
              <td className="title">Option</td>
              <td>Answer</td>
              <td/>
            </tr>
            </thead>
            <tbody>
            <OptionsListDefinition questionId={question.id} options={question.options}
                                   changeOptionName={props.changeOptionName}
                                   markAsAnswer={props.markAsAnswer}
                                   deleteOption={props.deleteOption}/>
            </tbody>
          </table>

          <div className="panel-actions">
            <Button variant="contained" color="secondary" aria-label="Add option"
                    onClick={props.addOption(question)}>
              <AddIcon/>
              Add option
            </Button>

            <Button variant="contained" color="secondary" aria-label="Delete question"
                    onClick={props.deleteQuestion(question)}>
              <DeleteIcon/>
              Delete question
            </Button>
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));
};

export default QuestListDefinition;