import { createStandaloneToast, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";


export const getInfo = async () => {

    const info = await axios.get("/");
    const data = info.data;
    return data;
}

export const calculateBalance = (arr) => {
    let result = {
        balance: 0,
        incomes: 0,
        expenses: 0,
    }
    if (!arr.length) {
        return result;
    }


    const sumAmounts = (array) => {

        let result = array.reduce((a, b) => {
            return a + b.amount;
        }, 0)

        return result
    }

    let incomes = sumAmounts(arr.filter(element => element.type === "income"))
    let expenses = sumAmounts(arr.filter(element => element.type === "expense"))

    result = {
        incomes: incomes,
        expenses: expenses,
        balance: incomes - expenses,
    }
    return result;
}

export const filterInfo = (arr, str) => {
    if (str === '') {
        return arr;
    }
    let result = arr.filter(element => {
        return element.type === str;
    })
    return result
}



export const customizeDate = (str) => {
    console.log('initial', str)
    let customDate = str.replaceAll('/', '-').split('-').reverse()
    if (customDate[1].length === 1) {
        customDate[1] = `0${customDate[1]}`
    }
    if (customDate[2].length === 1) {
        customDate[2] = `0${customDate[2]}`
    }
    customDate = customDate.join('-')
    console.log('custom func', customDate)
    return customDate
}


export const postMovement = async (state, chakraTool) => {

    try {
        let result = await axios.post('/', state)
        chakraTool({
            title: "Listo!",
            description: `El movimiento "${result.data.concept}" se cargó correctamente.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
        return result.data
    }
    catch (error) {
        chakraTool({
            title: "Error",
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }
}

export const updateMovement = async (state, chakraTool) => {

    try {
        let result = await axios.put('/', state)

        chakraTool({
            title: "Listo!",
            description: result.data,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }
    catch (error) {
        chakraTool({
            title: "Error",
            // description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }
}


export const deleteMovement = async (state, chakraTool) => {

    try {
        let result = await axios.delete('/', { data: state })
        chakraTool({
            title: "Listo!",
            description: result.data,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }
    catch (error) {
        chakraTool({
            title: "Error",
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        })
    }
}

