import "../App.css"
import moment from "moment"
import { FaTrashAlt } from "react-icons/fa";
import { TbPencil } from "react-icons/tb";

const Post = (props: any) => {

    const formattedTime = moment(props?.time).fromNow()

    return (
        <div className="post">
            <p className="time">{formattedTime}</p>
            <h3 className="title">{props?.title}</h3>
            <p className="text">{props?.text}</p>
            <div className="buttons">
                <button onClick={(e) => props.edit(e, props.id)} > <TbPencil style={{
                    width: "1.2em",
                    height: "1.2em"
                }} /> Edit</button>
                <button onClick={() => props.del(props.id)} > <FaTrashAlt style={{
                    width: "0.8em",
                    height: "0.8em"
                }} /> Delete</button>
            </div>
        </div>
    )
}

export default Post