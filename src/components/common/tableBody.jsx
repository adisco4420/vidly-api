import React from "react";
import _ from "lodash";

const getBodyContent = (column, item) => {
    return column.content ? column.content(item) : _.get(item, column.value)
}

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          {columns.map((column, tdIndex) => (
            <td key={tdIndex}>{getBodyContent(column, item)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
