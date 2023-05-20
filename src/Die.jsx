import './App.css'

export default function Die(props) {
    return (
        <div className={props.isHeld? 'die-held':'die'} onClick={props.toggleHold}>
            <h1 className='die-num'>{props.value}</h1>
            </div>
    )
}