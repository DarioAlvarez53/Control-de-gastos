import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const { state } = useBudget()

    
    const filterExpense = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    
    //Mostrar un mensaje que diga no hay gastos o muestre la lista de gastos
    const isEmpty = useMemo(() => filterExpense.length === 0, [filterExpense])

    return (
        <div className="mt-10">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold text-center">No hay gastos</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5 text-center">Listado de gastos</p>
                    {filterExpense.map( expense => (
                        <ExpenseDetail 
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </div>
    )
}
