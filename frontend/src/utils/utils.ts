const formattIsoToDate = (data: string) => {
    console.log(data)
    const isoDate = data
    const [year = "", month = "", day = ""] = isoDate?.split('T')[0]?.split('-') ?? ["", "", ""]
    const formatted = `${day}/${month}/${year}`

    return formatted
}


export { formattIsoToDate }