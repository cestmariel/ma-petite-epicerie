import './Button.css'

// equivalent à const Button = () => {}
export function Button({count, action}) {


return <button onClick={action}>{count}</button>
}

//export default Button