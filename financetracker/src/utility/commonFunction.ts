const  formatDate = (date: Date | string): string => {
    const d = new Date(date)
    const year = d.getUTCFullYear()
    const month = String(d.getUTCMonth() + 1).padStart(2, '0')
    const day = String(d.getUTCDate()).padStart(2, '0')
    return  `${day}-${month}-${year}`
}
export default formatDate;