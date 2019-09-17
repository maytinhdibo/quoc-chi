const inputStyle = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'green' : 'green',
        background: state.isSelected ? '#e8ffe8' : '#fff',
        '&:hover': {
            transition:"0",
            color:'white',
            background: 'green'
        }
    }),
    control: (base, state) => ({
        ...base,
        borderColor: state.isFocused ? "green" : 'gray',
        '&:hover': { borderColor: 'green' },
        boxShadow: 'none',// no box-shadow
        color:'#777',
    })
}
export default inputStyle;