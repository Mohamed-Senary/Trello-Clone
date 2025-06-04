export default function FAB (props){
    return (
        <button
            className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow-lg"
            style={{ width: '60px', height: '60px' }}
            onClick={props.add}
        >
            <i className="fas fa-plus fa-lg"></i>
        </button>

    )
}