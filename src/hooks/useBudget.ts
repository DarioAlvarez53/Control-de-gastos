import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {
    const context = useContext(BudgetContext)
    //Siempre se acostumbra a tomar un error en caso de que no este el context
    if(!context) {
        throw new Error("useBudget must be used within a BudgetProvider");
    }
    return context
}