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
    >
      <Tab eventKey="loans" title="Loans">
        <MainTable selected={"loans"}/>
      </Tab>
      <Tab eventKey="borrowers" title="Borrowers">
        <MainTable selected={"borrowers"}/>
      </Tab>
      <Tab eventKey="payments" title="Payments">
        <MainTable selected={"payments"}/>
      </Tab>
      <Tab eventKey="investors" title="Investors">
        <MainTable selected={"investors"}/>
      </Tab>
    </Tabs>
    </>
    
  );
}

export default MainTab;