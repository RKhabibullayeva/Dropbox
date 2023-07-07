import React, { useState, useEffect } from "react";
import { MultiSelect } from "@mantine/core";

function Test() {
    var data = [{name:"ALmaz"}, {name:"Kambarov"}]
    var [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const handleApplyFilter = ()=>{
    const filter = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filter)
  }


  return (
    <div>
      <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
      <ul>
        {filteredData.map(item => <li key={item.name}>{item.name}</li>)}
      </ul>
      <button onClick={handleApplyFilter}>Apply</button>
    </div>
  );
}
export default Test