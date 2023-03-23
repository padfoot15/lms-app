import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
//import ActionBtn from './actionBtn';
import MainTable from './mainTable';

const MainTab = () => {
    
  return (
    <>
      <Tabs
        defaultActiveKey="loans"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
        style={{
          fontSize:"large"
      }}>
        <Tab eventKey="loans" title="LOANS">
          <MainTable selected={"loans"}/>
        </Tab>
        <Tab eventKey="borrowers" title="BORROWERS">
          <MainTable selected={"borrowers"}/>
        </Tab>
        <Tab eventKey="payments" title="PAYMENTS">
          <MainTable selected={"payments"}/>
        </Tab>
        <Tab eventKey="investors" title="INVESTORS">
          <MainTable selected={"investors"}/>
        </Tab>
        <Tab eventKey="investments" title="INVESTMENTS">
          <MainTable selected={"investments"}/>
        </Tab>
      </Tabs>
    </>
    
  );
}

export default MainTab;