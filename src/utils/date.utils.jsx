function my_date(date) {
    return date.toISOString().substring(0, 10)
}

export default my_date