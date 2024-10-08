import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budegt-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}
//Lo primero que se hace es crear el provider donde vendran los datos
//NOTA: siempre es un arrow function y siempre retorna algo
//  Sintaxis
// export const BudgetProvider = () => {

//     return {

//     }
// }

//Se tiene que crear el context con create context
export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}: BudgetProviderProps) => {

    //Aqui es donde se debe instanciar el reducer, se puede utilizar useEffect o useState
    const [state, dispatch] = useReducer(budgetReducer, initialState)
    //Calculando el total gastado
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0) ,[state.expenses])
    //Calculando el saldo disponible
    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value= {{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}