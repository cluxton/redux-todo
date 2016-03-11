const withoutIndex = (array, index) => {
	return  array.slice(0, index).concat(array.slice(index + 1))
}

export default withoutIndex