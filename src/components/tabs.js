const MainTab = () => {
    console.log("Main tab component")
    return ( 
        <div className="btn-group d-flex align-items-center" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-primary border">LOANS</button>
            <button type="button" className="btn btn-primary border">PAYMENTS</button>
            <button type="button" className="btn btn-primary border">BORROWERS</button>
            <button type="button" className="btn btn-primary border">INVESTORS</button>
        </div>
     );
}
 
export default MainTab;