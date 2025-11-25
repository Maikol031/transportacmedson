const formattIsoToDate = (data: string) => {
    console.log(data)
    const isoDate = data
    const [year = "", month = "", day = ""] = isoDate?.split('T')[0]?.split('-') ?? ["", "", ""]
    const formatted = `${day}/${month}/${year}`

    return formatted
}

const formatMoney = (
  value: number | string | null | undefined,
  options: {
    prefix?: string;
    decimals?: number;
  } = {}
):  string => {
  if (value === null || value === undefined || value === "" || isNaN(Number(value))) {
    return "";
  }

  const {
    prefix = "R$",
    decimals = 2
  } = options;

  const number = Number(value) / (decimals === 2 ? 100 : 1);

  return `${prefix} ${number.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}



export { formattIsoToDate, formatMoney }