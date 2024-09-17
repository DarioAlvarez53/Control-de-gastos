//Este componente va a mostar cuanto presupuesto definimos, cuanto llevamos gastado y cuanto nos queda
import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {

    const {state} = useBudget()
    //Calculando el total gastado
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0) ,[state.expenses])
    //Calculando el saldo disponible
    const remainingBudget = state.budget - totalExpenses

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <img src="/public/grafico.jpg" alt="grafica de gastos" />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-red-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                >
                    Resetar App
                </button>

                <AmountDisplay 
                    label="Presupuesto"
                    amount={state.budget}
                />

                <AmountDisplay 
                    label="Disponible"
                    amount={remainingBudget}
                />

                <AmountDisplay 
                    label="Gastado"
                    amount={totalExpenses}
                />
            </div>
        </div>
    )
}
