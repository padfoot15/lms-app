import MainTable from './mainTable';
import {Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';

const MainTab = () => {

  const [activeTab, setActiveTab] = useState('loans');

  return (
    <>
      <Tabs
        activeKey={activeTab}
        onSelect={(key => setActiveTab(key))}
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
        style={{
          fontSize:"large"
      }}>
        <Tab eventKey="dashboard" title="DASHBOARD">          
          <MainTable selected={"dashboard"}/>
        </Tab>
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
        <Tab eventKey="payouts" title="PAYOUTS">
          <MainTable selected={"payouts"}/>
        </Tab>
        <Tab eventKey="expenses" title="EXPENSES">
          <MainTable selected={"expenses"}/>
        </Tab>
        <Tab eventKey="income" title="INCOME">
          <MainTable selected={"income"}/>
        </Tab>
      </Tabs>
    </>
    
  );
}

export default MainTab;