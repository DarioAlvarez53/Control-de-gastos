import { useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"

function App() {  

  const { state } = useBudget()
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  return (
    <>
      <header className="bg-green-600 py-4 max-h-72 m-4 rounded-lg">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de gastos
        </h1>
      </header>

      {/* Vista de los gastos y presupuesto */}
      <div className="max-w-2xl mx-auto shadow-xl rounded-lg mt-8 p-10">
        { isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {/* Ventana modal para escribir gastos */}
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseList />
          <ExpenseModal />
        </main>

      )}
    </>
  )
}

export default App