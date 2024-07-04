import './alert.css'
function AlertShow({ onClickedYes, onClickedNo }) {
    return (
        <div className='Alert'>
            <h1 className='text'>Are you sure you want to delete?</h1>
            <div className='answer'>
                <button className='button' onClick={onClickedYes}>
                    <h2>Yes</h2>
                </button>
                <button className='button' onClick={onClickedNo}>
                    <h2>No</h2>
                </button>
            </div>
        </div>
    );
}

export default AlertShow;