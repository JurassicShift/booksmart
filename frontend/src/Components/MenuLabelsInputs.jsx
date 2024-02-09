const LabelsAndInputs = ({formObj, fieldUpdater, inputState}) => {

    const revealInputContent = (ev) => {
		const inputElement = ev.currentTarget.nextSibling;
		const type = inputElement.type;
		inputElement.setAttribute("type", type === "password" ? "text" : "password");
	}

    return (
        
        formObj.inputs.map((field, idx) => {
            return (
                <label
                    htmlFor={field}
                    key={`profileLabel${idx}`}
                    className={`profile__form-pwLabel${idx}`}
                >
                    <div className='profile__form-pwSpan' onClick={revealInputContent}>{formObj.labels[idx]}<i className="bi bi-eye"></i></div>
                    <input
                        className="pwInput form-control"
                        type={field === 'username' || field === 'useremail' ? "text" : "password"}
                        name={field}
                        data-input-warning={inputState[field].error}
                        value={inputState[field].value}
                        onChange={e => fieldUpdater(e.target.value, field)}
                    
                    ></input>
                </label>
            );
        })
    )
}

export default LabelsAndInputs;