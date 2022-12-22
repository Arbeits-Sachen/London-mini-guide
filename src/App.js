import './App.css';
import { useState, useEffect } from "react";

function App()
{
  const [cityData, setCityData] = useState({});
  const [clickedState, setClickedState] = useState(false);
  const [city, setCity] = useState("");
  const [cityInfo, setCityInfo] = useState("");


  useEffect(() =>
  {
    fetch(`https://london-mini-guide-server--arbeits-sachen.repl.co/${city}/${cityInfo}/`)
      .then(response => response.json())
      .then(data => setCityData(data))
  }, [city, cityInfo]);


  const handleSelectChange = (event) =>
  {
    setCity(event.target.value);
  }

  const handleButtonChange = (event) =>
  {
    setCityInfo(event.target.value);
    setClickedState(true);
  }



  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        <h1>City Mini Guide</h1>
        <select onClick={handleSelectChange}>
          <option>Select An Option</option>
          <option value={"harrow"}>Harrow</option>
          <option value={"heathrow"}>Heathrow</option>
          <option value={"stratford"}>Stratford</option>
        </select>

        <div>
          <button onClick={handleButtonChange} value={"pharmacies"}>Pharmacies</button>
          <button onClick={handleButtonChange} value={"colleges"}>Schools & Colleges</button>
          <button onClick={handleButtonChange} value={"doctors"}>Doctors</button>
          <button onClick={handleButtonChange} value={"hospitals"}>Hospitals</button>
        </div>

        <table>
          <thead>
            <th>Name</th>
            <th>Address</th>
            <th>Website</th>
            <th>Phone</th>
          </thead>
          <tbody>
            {<ResultRow cityData={cityData} cityInfo={cityInfo} clickedState={clickedState} />}
          </tbody>
        </table>
      </body>
    </div>
  );
}


const ResultRow = ({ cityData, clickedState, cityInfo }) =>
{
  if (clickedState === true)
  {
    return (
      cityData.map(cityData =>
        <tr>
          <td>{cityData.name}</td>
          <td>{cityData.address}</td>
          <td>{cityData.website}</td>
          <td>{cityData.phone}</td>
        </tr>)
    );
  }
}

export default App;