const InputForm = ({ customClass, onChange, type, placeholder, name, id, value }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            className={customClass}
            value={value}
            onChange={onChange}
        />
    )
}

export default InputForm