import React from 'react';
import { urlSmall } from './index'

class Table extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	      data: [],
	      detailsRow: []
	    };
	    this.handleRowClick = this.handleRowClick.bind(this);
	}
  
  	componentDidMount(){
  		fetch(urlSmall)
	    .then(response => response.json())
	    .then(data => this.setState({data: data}))
  	}
  
    handleRowClick(rowId){
	    const currentRow = this.state.detailsRow;
	    const isRowShowesDetails = currentRow.includes(rowId);
	    const newDetailsRow = isRowShowesDetails ? currentRow.filter(id => id !== rowId) : currentRow.concat(rowId);
	    this.setState({detailsRow: newDetailsRow});
  	}
  
  	renderRow(item){
	    const clickRow = () => this.handleRowClick(item.id);
	    const itemRows = [

	      	<tr key={"row-data-"+item.id} onClick={clickRow}>
		        <td>{item.id}</td>
		        <td>{item.firstName}</td>
		        <td>{item.lastName}</td>
		        <td>{item.email}</td>
		        <td>{item.phone}</td>                  
	      	</tr>      
	    ];

	    if(this.state.detailsRow.includes(item.id)){
	    	itemRows.push(

		        <tr key={"row-details-" + item.id}>
		          <td colSpan={5}>
		            <ul className="list-group">
		              <li className="list-group-item">Выбран пользователь: <b>{item.firstName +' '+ item.lastName}</b></li> 
		              <li className="list-group-item">Описание: <textarea className="form-control" disabled>{item.description}</textarea></li>
		            
		              <li className="list-group-item">Адрес проживания: <b>{item.address.streetAddress}</b></li>
		              <li className="list-group-item">Город: <b>{item.address.city}</b></li>
		              <li className="list-group-item">Провинция/штат: <b>{item.address.state}</b></li>
		              <li className="list-group-item">Индекс: <b>{item.address.zip}</b></li>
		            </ul>
		          </td>
		        </tr>
      		);
    	}
    	return itemRows;
  	}

	render(){
		let allRows = [];
		this.state.data.forEach(item => {
			const oneRow = this.renderRow(item);
			allRows = allRows.concat(oneRow);
    	});

    	return (

	    	<table className="table table-hover">
		        <thead>
		          <tr>
		            <th>ID</th>
		            <th>First Name</th>
		            <th>Last Name</th>
		            <th>Email</th>
		            <th>Phone</th>
		          </tr>
		        </thead>
		        <tbody>{allRows}</tbody>
	      	</table>
  
    	);
	}
}

export default Table;