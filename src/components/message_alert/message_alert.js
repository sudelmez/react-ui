import './message_alert.css'
function MesAlert({ message, onClicked }) {
    return (<div className='Alert'>
        <h1 className='text'>{message}</h1>
        <button className='button' onClick={onClicked}>
            <h2>Ok</h2>
        </button>
    </div>);
}
export default MesAlert;