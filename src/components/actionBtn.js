const ActionBtn = ({onNew , onView}) => {
    return ( 
        <div className="d-flex align-items-center mt-5 mb-5 justify-content-center">
            <button type="button" className="btn btn-dark border btn-lg" onClick={onView}>VIEW</button>
            <button type="button" className="btn btn-dark border btn-lg" onClick={onNew}>NEW</button>
        </div>
     );
}
 
export default ActionBtn;