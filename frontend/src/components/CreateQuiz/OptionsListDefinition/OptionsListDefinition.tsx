import * as React from "react";
import {IOption} from "../../../types/option";

import IconButton from "@material-ui/core/IconButton/IconButton";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import DeleteIcon from '@material-ui/icons/Delete';

interface IOptionsListDefinitionProps {
  questionId: number,
  options: any,
  changeOptionName(option: IOption, questionId: number): any,
  markAsAnswer(option: IOption, questionId: number): any,
  deleteOption(option: IOption, questionId: number): any
}

const OptionsListDefinition = (props: IOptionsListDefinitionProps) => {
  const { questionId, options } = props;
  return options.map((option: IOption, index: number) => (
    <tr key={index}>
      <td>{index + 1}.</td>
      <td className="title">
        <input type="text" value={option.title} onChange={props.changeOptionName(option, questionId)}/>
      </td>
      <td>
        <Checkbox color="primary" value={option.title} checked={option.answer}
                  onChange={props.markAsAnswer(option, questionId)}/>
      </td>
      <td>
        <IconButton aria-label="Delete option" onClick={props.deleteOption(option, questionId)}>
          <DeleteIcon />
        </IconButton>
      </td>
    </tr>
  ))
};

export default OptionsListDefinition;