import React, {Component} from 'react'

class TableHeader extends Component {
    raiseSort = path => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path)
          sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
          sortColumn.path = path;
          sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
    }
    renderSortIcon = column => {
      console.log(column);
      
      const {sortColumn} = this.props;
      if(column.value !== sortColumn.path) return null;
      if (sortColumn.order === 'asc') return <i className="fa fa-arrow-up"></i>
      return <i className="fa fa-arrow-down"></i>
    }
    render() { 
        const { columns } = this.props;
        return ( <thead>
             
            <tr>
              {columns.map((column, index) => (
                <React.Fragment key={index}>
                  {
                    column.content ? <td key={index}/> : 
                    <th
                    key={index}
                    onClick={() => {this.raiseSort(column.value)}}
                    scope="col"
                  >{column.title} {this.renderSortIcon(column)}</th>
                  }
                </React.Fragment>
              ))}

            </tr>
          </thead>  );
    }
}
 
export default TableHeader;