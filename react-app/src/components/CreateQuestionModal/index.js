import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
// import { deleteFolderThunk } from "../../store/folders";
import { useHistory } from "react-router-dom";
import { createQuestionThunk, createSetThunk, getAllSetsThunk } from "../../store/sets";
// import { getAllFoldersThunk } from "../../store/folders";
// import { deleteSetThunk, getAllSetsThunk } from "../../store/sets";

export default function CreateQuestionModal({ setId, folderId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    // const folder = useSelector((state)=>state.folders.folder);
    const [description, setDescription] = useState("");
    const [answer, setAnswer] = useState("");
    const [favorite, setFavorite] = useState("no");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errObj = {};
        if (!description.length || description.length < 3) errObj.description = "Description length of 3 or more is required"
        if (description.length > 2000) errObj.description = "Description length of 2000 or less is required"
        if (!answer.length || answer.length < 1) errObj.answer = "Answer length of 1 or more is required"
        if (answer.length > 2000) errObj.answer = "Answer length of 2000 or less is required"

        if (!Object.values(errObj).length) {
            const question = {
                set_id: setId,
                description,
                answer,
                favorite,

            }

            // console.log("This is the created folder", folder)
            await dispatch(createQuestionThunk(question))
            .then(dispatch(getAllSetsThunk()))
            .then(closeModal())

            // history.push(`/folders/${folderId}/set/${setId}`)
        } else setErrors(errObj)
    };

    return (
        <div>
            <h1>Type your question and answer</h1>
            {/* <p>Are you sure you want to delete this folder?</p> */}
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.description && <p>{errors.description}</p>}
                    {errors.answer && <p>{errors.answer}</p>}
                </ul>
                <label>
                    Question
                    <input
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Answer
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                </label>
                <div>
                    <button type="submit">Yes (Create Question)</button>
                    <button onClick={closeModal}>No (Back to Set)</button>

                </div>
            </form>
        </div>
    )
}