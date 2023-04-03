import ActionBtn from './actionBtn';
import AddBorrower from './borrowers/addBorrower';
import AddLoan from './loans/addLoan';
import BorrowersTable from './borrowers/borrowersTbl';
import LoansTable from './loans/loansTbl';
import { useState } from 'react';
import PaymentsTable from './payments/paymentsTbl';
import AddPayment from './payments/addPayment';
import AddInvestor from './investors/addInvestor';
import InvestorsTable from './investors/investorsTbl';
import InvestmentsTable from './investments/investmentsTbl';
import AddInvestment from './investments/addInvestment';
import ExpensesTable from './expenses/expensesTbl';
import AddExpense from './expenses/addExpense';
import PayoutsTable from './payouts/payoutsTbl';
import AddPayout from './payouts/addPayout';


const MainTable = ({selected}) => {

      const [control , setControl] = useState({showView : true, showNew: false})
    
      const showNew = () => {
        setControl({
          showNew:true,
          showView : false
        })
      }

      const showView = () => {
        setControl({
          showNew:false,
          showView : true
        })
      }
      const showTable = () =>{
        if(selected==='borrowers'){
          if(control.showNew){
            return <AddBorrower />
          }else{
            return <BorrowersTable />
          }
          
        }else if(selected==='loans'){
          if(control.showNew){        
            return <AddLoan />
          }else{        
            return <LoansTable/>
          }
          
        }else if(selected==='payments'){
          if(control.showNew){        
            return <AddPayment />
          }else{        
            return <PaymentsTable />
          }        
        }else if(selected==='investors'){
          if(control.showNew){        
            return <AddInvestor />
          }else{        
            return <InvestorsTable />
          }        
        }else if(selected==='investments'){
          if(control.showNew){        
            return <AddInvestment />
          }else{        
            return <InvestmentsTable />
          }        
        }else if(selected==='expenses'){
          if(control.showNew){        
            return <AddExpense />
          }else{        
            return <ExpensesTable />
          }        
        }else if(selected==='payouts'){
          if(control.showNew){        
            return <AddPayout />
          }else{        
            return <PayoutsTable />
          }        
        }else{
          return <h1>{`No content yet for ${selected}`}</h1>
        }
      }
    
      return (
        <>
          <ActionBtn onNew={showNew} onView={showView}/>
          {showTable()}
        </>
     );
    
    
}
 
export default MainTable;